"""
Privacy-Preserving Analytics Framework (PPAF) - Component 1: Differential Privacy
Adds controlled statistical noise to aggregated outputs to prevent re-identification.
"""

import math
import random
from typing import Dict, List, Tuple


class DifferentialPrivacyConfig:
    """Configuration for differential privacy mechanisms."""

    def __init__(self, epsilon: float = 1.0, delta: float = 1e-6):
        """
        Initialize DP configuration.

        Args:
            epsilon: Privacy loss parameter (lower = more private, less accurate)
            delta: Failure probability (typically 1e-6 to 1e-5)
        """
        self.epsilon = epsilon
        self.delta = delta


def add_laplace_noise(value: float, epsilon: float) -> float:
    """
    Add Laplace noise to a numeric value for differential privacy.

    Args:
        value: The true aggregated value
        epsilon: Privacy budget parameter

    Returns:
        Noisy value that preserves privacy while maintaining accuracy
    """
    # Laplace scale parameter
    scale = 1.0 / epsilon

    # Sample from Laplace distribution (double exponential)
    noise = -scale * math.log(random.random()) * (1 if random.random() > 0.5 else -1)

    return value + noise


def add_gaussian_noise(value: float, epsilon: float, delta: float) -> float:
    """
    Add Gaussian noise to a value (Gaussian DP mechanism).

    Args:
        value: The true aggregated value
        epsilon: Privacy loss parameter
        delta: Failure probability

    Returns:
        Noisy value with Gaussian privacy guarantees
    """
    # Standard deviation for Gaussian mechanism
    sigma = math.sqrt(2 * math.log(1.25 / delta)) / epsilon

    # Sample from Gaussian
    noise = random.gauss(0, sigma)

    return value + noise


def compute_noisy_count(true_count: int, epsilon: float) -> int:
    """
    Compute differentially private count with Laplace noise.

    Args:
        true_count: The true count value
        epsilon: Privacy budget

    Returns:
        Noisy count that preserves privacy
    """
    noisy = add_laplace_noise(float(true_count), epsilon)
    return max(0, int(round(noisy)))  # Ensure non-negative integer


def compute_noisy_aggregate(
    values: List[float], epsilon: float, delta: float = 1e-6
) -> Tuple[float, str]:
    """
    Compute differentially private aggregate (mean) of values.

    Args:
        values: List of aggregated values
        epsilon: Privacy loss parameter
        delta: Failure probability

    Returns:
        Tuple of (noisy_mean, mechanism_used)
    """
    if not values:
        return 0.0, "gaussian"

    true_mean = sum(values) / len(values)

    # Use Gaussian mechanism for continuous aggregates
    noisy_mean = add_gaussian_noise(true_mean, epsilon, delta)

    return noisy_mean, "gaussian"


def estimate_privacy_loss(epsilon: float, delta: float) -> Dict[str, str]:
    """
    Estimate privacy guarantees from epsilon-delta parameters.

    Args:
        epsilon: Privacy loss parameter
        delta: Failure probability

    Returns:
        Dictionary with privacy interpretation
    """
    privacy_levels = {
        (0, 0.5): "Very Strong (Highly Protected)",
        (0.5, 1.0): "Strong (Protected)",
        (1.0, 2.0): "Moderate (Reasonable Protection)",
        (2.0, float("inf")): "Weak (Limited Protection)",
    }

    level = "Unknown"
    for (low, high), desc in privacy_levels.items():
        if low <= epsilon < high:
            level = desc
            break

    return {
        "epsilon": epsilon,
        "delta": delta,
        "privacy_level": level,
        "interpretation": (
            f"Epsilon={epsilon} means adversary success probability difference "
            "is bounded by exp(epsilon)"
        ),
    }
