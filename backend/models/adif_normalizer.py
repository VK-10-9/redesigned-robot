"""ADIF Normalizer & Dedup utilities

Provides:
- normalize_row(row): canonicalize keys, date formats, state names, pincodes, numeric fields
- row_hash(row, keys=None): deterministic md5 of row or selected keys
- dedupe_iter(rows, mode='hash'|'composite'|'id', composite_keys=None): yields unique rows
"""

import hashlib
from datetime import datetime
from typing import Dict, Iterable, Iterator, List, Optional

# Minimal state canonicalization map; can be extended
_STATE_MAP = {
    "uttar pradesh": "Uttar Pradesh",
    "up": "Uttar Pradesh",
    "bihar": "Bihar",
    "gujarat": "Gujarat",
}


def _canonical_state(s: Optional[str]) -> str:
    if not s:
        return ""
    s0 = s.strip().lower()
    return _STATE_MAP.get(s0, s.strip())


def _normalize_pincode(p: Optional[str]) -> str:
    if not p:
        return ""
    s = "".join(c for c in str(p) if c.isdigit())
    # ensure typical 6-digit pincode formatting if possible
    if len(s) == 6:
        return s
    return s


def _normalize_date(d: Optional[str]) -> Optional[str]:
    if not d:
        return None
    d = d.strip()
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%Y/%m/%d", "%d/%m/%Y"):
        try:
            dt = datetime.strptime(d, fmt)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            continue
    # try ISO parsing fallback
    try:
        dt = datetime.fromisoformat(d)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return None


def _safe_int(val: Optional[str]) -> int:
    if val is None:
        return 0
    s = "".join(c for c in str(val) if c.isdigit())
    try:
        return int(s) if s else 0
    except Exception:
        return 0


def normalize_row(row: Dict[str, str]) -> Dict[str, str]:
    """Return a new dict with normalized keys and cleaned values."""
    out: Dict[str, str] = {}
    # normalize keys: strip, lowercase, replace spaces/hyphens with underscores
    for k, v in row.items():
        nk = k.strip().lower().replace(" ", "_").replace("-", "_")
        nv = v.strip() if isinstance(v, str) else ("" if v is None else str(v))
        out[nk] = nv

    # date normalization
    date_val = out.get("date") or out.get("Date")
    norm_date = _normalize_date(date_val)
    if norm_date:
        out["date"] = norm_date

    # state canonicalization
    out["state"] = _canonical_state(out.get("state"))

    # pincode
    out["pincode"] = _normalize_pincode(out.get("pincode"))

    # numeric fields cleaned
    for fld in [
        "age_0_5",
        "age_5_17",
        "age_18_greater",
        "demo_age_5_17",
        "demo_age_17_plus",
        "bio_age_5_17",
        "bio_age_17_plus",
    ]:
        if fld in out:
            out[fld] = str(_safe_int(out.get(fld)))

    return out


def row_hash(row: Dict[str, str], keys: Optional[List[str]] = None) -> str:
    """Deterministic md5 hash of either a set of keys or the entire row (sorted keys)."""
    if keys:
        vals = [str(row.get(k, "")) for k in keys]
        payload = "||".join(vals)
    else:
        items = sorted((k, str(v)) for k, v in row.items())
        payload = "||".join(f"{k}={v}" for k, v in items)
    return hashlib.md5(payload.encode("utf-8")).hexdigest()


def dedupe_iter(
    rows: Iterable[Dict[str, str]],
    mode: str = "hash",
    composite_keys: Optional[List[str]] = None,
) -> Iterator[Dict[str, str]]:
    """Yield unique rows according to the selected strategy.

    Strategies:
    - none: no dedup
    - id: uses id/uid/aadhar_id when present; falls back to full-row hash
    - composite: hash of selected keys
    - hash: full-row hash
    """

    def key_for_row(r: Dict[str, str]) -> str:
        if mode == "id":
            rid = r.get("id") or r.get("uid") or r.get("aadhar_id")
            return str(rid) if rid else row_hash(r)
        if mode == "composite":
            return row_hash(r, keys=composite_keys) if composite_keys else row_hash(r)
        # default 'hash' behaviour
        return row_hash(r)

    if mode == "none" or not mode:
        # Fast path: no dedup
        for r in rows:
            yield r
        return

    seen = set()
    for r in rows:
        k = key_for_row(r)
        if k in seen:
            continue
        seen.add(k)
        yield r
