"""
Feedback Loop for PROF.
Tracks outcomes from government resource deployments.
Evaluates whether actions worked (queues reduced, completion rates improved).
Recommends system adjustments for continuous improvement.
"""

from typing import Dict, List


class OutcomeData:
    """Record of deployment outcome and impact metrics."""

    def __init__(
        self,
        deployment_id: str,
        district: str,
        resource_type: str,  # 'mobile_van', 'staff', 'center'
        deployed_date: str,
        queue_reduction_percent: float = 0.0,
        completion_rate_improvement: float = 0.0,
        complaint_reduction_percent: float = 0.0,
        cost: float = 0.0,
        outcome_notes: str = "",
    ):
        self.deployment_id = deployment_id
        self.district = district
        self.resource_type = resource_type
        self.deployed_date = deployed_date
        self.queue_reduction = queue_reduction_percent
        self.completion_rate_improvement = completion_rate_improvement
        self.complaint_reduction = complaint_reduction_percent
        self.cost = cost
        self.notes = outcome_notes

    def to_dict(self):
        return {
            "deployment_id": self.deployment_id,
            "district": self.district,
            "resource_type": self.resource_type,
            "deployed_date": self.deployed_date,
            "queue_reduction_percent": self.queue_reduction,
            "completion_rate_improvement": self.completion_rate_improvement,
            "complaint_reduction_percent": self.complaint_reduction,
            "cost": self.cost,
            "notes": self.notes,
        }


def evaluate_outcome(outcome_data: OutcomeData) -> Dict:
    """Evaluate success of a deployment based on outcome metrics.

    Returns assessment dict with success score (0-1) and insights.
    """
    # Simple weighted scoring
    queue_score = outcome_data.queue_reduction / 100.0  # 0-1, clamped to 0-100%
    completion_score = outcome_data.completion_rate_improvement / 100.0
    complaint_score = outcome_data.complaint_reduction / 100.0

    # Weighted average: 50% queue reduction, 30% completion, 20% complaints
    success_score = queue_score * 0.5 + completion_score * 0.3 + complaint_score * 0.2
    success_score = max(0.0, min(success_score, 1.0))  # Clamp to 0-1

    # Efficiency: impact per cost
    efficiency_score = 0.0
    if outcome_data.cost > 0:
        total_impact = (queue_score + completion_score + complaint_score) / 3
        efficiency_score = total_impact / (outcome_data.cost / 10000 + 1)
        efficiency_score = max(0.0, min(efficiency_score, 1.0))

    # Classification
    if success_score > 0.75:
        status = "highly_successful"
    elif success_score > 0.5:
        status = "successful"
    elif success_score > 0.25:
        status = "partially_successful"
    else:
        status = "unsuccessful"

    return {
        "deployment_id": outcome_data.deployment_id,
        "status": status,
        "success_score": round(success_score, 2),
        "efficiency_score": round(efficiency_score, 2),
        "queue_reduction_percent": outcome_data.queue_reduction,
        "completion_rate_improvement": outcome_data.completion_rate_improvement,
        "complaint_reduction_percent": outcome_data.complaint_reduction,
        "analysis": _generate_analysis(outcome_data, success_score),
    }


def _generate_analysis(outcome_data: OutcomeData, success_score: float) -> str:
    """Generate textual analysis of outcome."""
    insights = []

    if outcome_data.queue_reduction > 30:
        insights.append("Queue reduction exceeded 30%; deployment effective.")
    elif outcome_data.queue_reduction < 10:
        insights.append("Queue reduction below 10%; consider alternative strategy.")

    if outcome_data.completion_rate_improvement > 20:
        insights.append(
            "Completion rates improved significantly; good resource allocation."
        )

    if outcome_data.complaint_reduction > 25:
        insights.append("Complaints reduced; citizen satisfaction improved.")

    if not insights:
        insights.append("Mixed results; review deployment strategy.")

    return " ".join(insights)


def recommend_adjustment(feedback_list: List[Dict], district: str) -> Dict:
    """Recommend system adjustments based on feedback pattern.

    Analyzes past deployment outcomes and suggests adjustments.
    """
    if not feedback_list:
        return {
            "district": district,
            "recommendation": "Insufficient data; deploy pilot and gather feedback.",
            "priority": "medium",
        }

    # Aggregate feedback
    success_rates = [
        fb.get("success_score", 0.5)
        for fb in feedback_list
        if fb.get("district") == district
    ]

    if not success_rates:
        return {
            "district": district,
            "recommendation": (
                "No feedback for this district yet; monitor and evaluate."
            ),
            "priority": "low",
        }

    avg_success = sum(success_rates) / len(success_rates)
    consistency = 1 - (max(success_rates) - min(success_rates))

    # Generate recommendation
    if avg_success > 0.75:
        recommendation = "Scale successful strategy; expand resource deployment."
        priority = "low"  # Working well, lower priority
    elif avg_success >= 0.4:
        if consistency < 0.3:
            recommendation = "Inconsistent results; standardize deployment process."
            priority = "high"
        else:
            recommendation = "Moderately successful; maintain current approach."
            priority = "medium"
    else:
        recommendation = "Low success rate; pivot to alternative resource strategy."
        priority = "critical"

    return {
        "district": district,
        "avg_success_score": round(avg_success, 2),
        "consistency": round(consistency, 2),
        "recommendation": recommendation,
        "priority": priority,
        "past_evaluations": len(success_rates),
    }


# Global feedback storage (in production: use database)
_global_feedback_log: List[Dict] = []


def log_feedback(outcome_data: OutcomeData) -> Dict:
    """Log outcome feedback for future analysis."""
    evaluation = evaluate_outcome(outcome_data)
    _global_feedback_log.append(evaluation)
    return evaluation


def get_feedback_log() -> List[Dict]:
    """Retrieve all logged feedback."""
    return _global_feedback_log.copy()


def get_district_recommendations(district: str) -> Dict:
    """Get recommendations for a specific district."""
    district_feedback = [
        fb for fb in _global_feedback_log if fb.get("district") == district
    ]
    return recommend_adjustment(district_feedback, district)
