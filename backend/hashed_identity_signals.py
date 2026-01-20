"""
Privacy-Preserving Analytics Framework (PPAF) - Component 3: Hashed Identity Signals
Uses cryptographic hashing for privacy-safe duplicate detection and deduplication.
"""

import hashlib
from datetime import datetime
from typing import Dict, List


def create_hashed_signal(aadhaar: str, salt: str = "ppaf_v1") -> str:
    """
    Create irreversible hashed identity signal from Aadhaar.

    Args:
        aadhaar: Aadhaar number (will be hashed)
        salt: Salt for hashing (prevents rainbow table attacks)

    Returns:
        SHA256 hash of (aadhaar + salt)
    """
    # Combine aadhaar with salt
    combined = f"{aadhaar}:{salt}".encode("utf-8")

    # Create SHA256 hash
    hash_obj = hashlib.sha256(combined)

    return hash_obj.hexdigest()


def create_identity_fingerprint(
    aadhaar: str, additional_fields: Dict[str, str] = None
) -> str:
    """
    Create multi-field identity fingerprint for deduplication.

    Args:
        aadhaar: Aadhaar number
        additional_fields: Optional fields (dob, phone, email) to strengthen fingerprint

    Returns:
        Hashed fingerprint combining multiple attributes
    """
    # Start with Aadhaar hash
    aadhaar_hash = create_hashed_signal(aadhaar, salt="fingerprint")

    # Add optional fields
    if additional_fields:
        field_str = "|".join(
            f"{k}:{v}" for k, v in sorted(additional_fields.items()) if v
        )
        combined = f"{aadhaar_hash}:{field_str}"
    else:
        combined = aadhaar_hash

    # Create fingerprint hash
    fingerprint = hashlib.sha256(combined.encode("utf-8")).hexdigest()

    return fingerprint


def compute_signal_similarity(
    signal1: str, signal2: str, threshold: float = 0.9
) -> Dict:
    """
    Compute similarity between two hashed signals (Hamming distance based).

    Args:
        signal1: First hashed signal
        signal2: Second hashed signal
        threshold: Similarity threshold for flagging matches (0.0-1.0)

    Returns:
        Dictionary with similarity score and match indication
    """
    if len(signal1) != len(signal2):
        return {"similarity": 0.0, "is_match": False, "distance": 999}

    # Calculate Hamming distance
    hamming_distance = sum(c1 != c2 for c1, c2 in zip(signal1, signal2))

    # Normalize to similarity score (1.0 = identical, 0.0 = completely different)
    max_distance = len(signal1)
    similarity = 1.0 - (hamming_distance / max_distance)

    is_match = similarity >= threshold

    return {
        "similarity": similarity,
        "is_match": is_match,
        "hamming_distance": hamming_distance,
        "threshold": threshold,
    }


class DeduplicationIndex:
    """Privacy-safe index for detecting potential duplicates."""

    def __init__(self):
        """Initialize deduplication index with hashed signals only."""
        self.signals = {}  # Maps hashed_signal -> metadata (no Aadhaar)
        self.created_at = datetime.now().isoformat()

    def add_record(self, aadhaar: str, record_metadata: Dict) -> Dict:
        """
        Add record to index using hashed signal (actual Aadhaar never stored).

        Args:
            aadhaar: Aadhaar number (will be hashed immediately)
            record_metadata: Non-sensitive metadata about record

        Returns:
            Dictionary with signal and index status
        """
        # Create hashed signal immediately
        signal = create_hashed_signal(aadhaar)

        # Store only metadata with signal, never the Aadhaar itself
        self.signals[signal] = {
            "metadata": record_metadata,
            "added_at": datetime.now().isoformat(),
            "confidence": 1.0,
        }

        return {
            "signal": signal,
            "added": True,
            "indexed_records": len(self.signals),
        }

    def find_potential_duplicates(
        self, aadhaar: str, similarity_threshold: float = 0.9
    ) -> List[Dict]:
        """
        Find potential duplicates for Aadhaar (without revealing which signal is which).

        Args:
            aadhaar: Aadhaar to check
            similarity_threshold: Threshold for similarity match

        Returns:
            List of potential duplicate indicators (no sensitive data revealed)
        """
        test_signal = create_hashed_signal(aadhaar)

        potential_matches = []
        for existing_signal, data in self.signals.items():
            similarity_result = compute_signal_similarity(
                test_signal, existing_signal, threshold=similarity_threshold
            )

            if similarity_result["is_match"]:
                potential_matches.append(
                    {
                        "confidence": similarity_result["similarity"],
                        "hamming_distance": similarity_result["hamming_distance"],
                        "metadata": data["metadata"],  # Safe metadata only
                    }
                )

        return potential_matches

    def get_deduplication_report(self) -> Dict:
        """
        Generate privacy-safe deduplication report.

        Returns:
            Report with aggregate statistics, no individual Aadhaar data
        """
        return {
            "total_unique_signals": len(self.signals),
            "created_at": self.created_at,
            "note": (
                "All Aadhaar data is hashed and irreversible. "
                "Report contains only signal statistics."
            ),
        }
