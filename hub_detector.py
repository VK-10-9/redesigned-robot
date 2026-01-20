"""
Registration hub detection for AFIF.
Monitors enrollment and update activity to identify suspicious spikes
from single centers, devices, or IP addresses.
"""

from collections import defaultdict
from typing import Dict, List


def analyze_hub_activity(
    records: List[Dict[str, str]], time_window_hours: int = 24
) -> List[Dict]:
    """Analyze enrollment/update activity by hub (center, device, IP).

    Returns list of suspicious hubs with anomaly scores.
    """
    hub_counts = defaultdict(int)
    hub_activity = defaultdict(list)

    for record in records:
        center_id = (record.get("center_id") or "unknown").strip()
        device_id = (record.get("device_id") or "unknown").strip()
        ip_address = (record.get("ip_address") or "unknown").strip()

        # Track activity by each dimension
        for hub_key in [
            f"center:{center_id}",
            f"device:{device_id}",
            f"ip:{ip_address}",
        ]:
            hub_counts[hub_key] += 1
            hub_activity[hub_key].append(record.get("timestamp") or "")

    # Identify anomalies: hubs with activity > 3 standard deviations above mean
    counts_list = list(hub_counts.values())
    if not counts_list:
        return []

    mean_count = sum(counts_list) / len(counts_list)
    variance = (
        sum((c - mean_count) ** 2 for c in counts_list) / len(counts_list)
        if counts_list
        else 0
    )
    std_dev = variance**0.5

    anomalies = []
    for hub_key, count in hub_counts.items():
        z_score = (count - mean_count) / std_dev if std_dev > 0 else 0
        if z_score > 3:  # More than 3 std devs above mean = anomaly
            anomalies.append(
                {
                    "hub": hub_key,
                    "activity_count": count,
                    "z_score": round(z_score, 2),
                    "severity": "high" if z_score > 5 else "medium",
                }
            )

    return sorted(anomalies, key=lambda x: x["z_score"], reverse=True)
