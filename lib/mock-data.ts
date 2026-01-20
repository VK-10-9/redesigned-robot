export const mockNationalOverview = {
  total_enrollments: 14583000,
  active_users: 12395550,
  states_covered: 28,
  anomalies_detected: 14583,
  timestamp: new Date().toISOString(),
}

export const mockTimeline = {
  timeline: [{ month: "2025-03-01", enrollments: 14583000, active: 12395550 }],
  period_months: 1,
}

export const mockStateDistribution = {
  states: [
    {
      state: "Haryana",
      total_enrollments: 980000,
      active_users: 833000,
      urban_count: 588000,
      rural_count: 392000,
    },
    {
      state: "Bihar",
      total_enrollments: 875000,
      active_users: 743750,
      urban_count: 525000,
      rural_count: 350000,
    },
    {
      state: "Jammu and Kashmir",
      total_enrollments: 765000,
      active_users: 649750,
      urban_count: 459000,
      rural_count: 306000,
    },
    {
      state: "Tamil Nadu",
      total_enrollments: 745000,
      active_users: 632750,
      urban_count: 447000,
      rural_count: 298000,
    },
    {
      state: "Maharashtra",
      total_enrollments: 695000,
      active_users: 590750,
      urban_count: 417000,
      rural_count: 278000,
    },
    {
      state: "Gujarat",
      total_enrollments: 614000,
      active_users: 521900,
      urban_count: 368400,
      rural_count: 245600,
    },
  ],
  total_states: 28,
}

export const mockDemographics = {
  by_age_group: [
    { age_group: "5-17", count: 4250000, male: 2167500, female: 2082500 },
    { age_group: "17+", count: 10333000, male: 5166500, female: 5166500 },
  ],
  by_location: [
    { urban_rural: "Urban", count: 8749800 },
    { urban_rural: "Rural", count: 5833200 },
  ],
}

export const mockAnomalies = {
  anomalies: [
    {
      id: 1,
      anomaly_type: "Duplicate Aadhaar",
      severity: "high",
      description: "Multiple enrollments detected with same Aadhaar ID",
      state_name: "Maharashtra",
      records_affected: 1247,
      detected_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      anomaly_type: "Unusual Concentration",
      severity: "high",
      description: "Abnormally high enrollment concentration in specific district",
      state_name: "Karnataka",
      records_affected: 892,
      detected_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      anomaly_type: "Rapid Enrollment Spike",
      severity: "high",
      description: "Sudden spike in enrollment rate exceeds normal patterns",
      state_name: "Uttar Pradesh",
      records_affected: 456,
      detected_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      anomaly_type: "Data Quality Issue",
      severity: "medium",
      description: "Missing or invalid demographic data in records",
      state_name: "Tamil Nadu",
      records_affected: 234,
      detected_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      anomaly_type: "Geographic Anomaly",
      severity: "medium",
      description: "Enrollment pattern inconsistent with population distribution",
      state_name: "West Bengal",
      records_affected: 178,
      detected_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  count: 5,
}

export const mockRecommendations = {
  recommendations: [
    {
      id: 1,
      recommendation_type: "Enhance Verification in High-Anomaly Zones",
      description:
        "Implement stricter verification protocols in Maharashtra and Karnataka to reduce duplicate enrollments by 40%",
      state_name: "Maharashtra",
      priority: "High",
      estimated_impact: "Reduce duplicates by 40%, improve data quality to 96%",
      status: "Draft",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      recommendation_type: "Expand Rural Enrollment Programs",
      description: "Launch targeted rural enrollment drives to increase coverage from 39% to 50% in rural areas",
      state_name: "Bihar",
      priority: "High",
      estimated_impact: "Increase rural coverage by 25%, add 150M+ new enrollments",
      status: "Reviewed",
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      recommendation_type: "Optimize Age Group Targeting",
      description: "Focus resources on 5-18 and 18-35 age groups which show highest engagement potential",
      state_name: "National",
      priority: "High",
      estimated_impact: "Improve youth enrollment efficiency by 35%",
      status: "Draft",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      recommendation_type: "Implement Automated Data Validation",
      description: "Deploy ML-based validation system to catch data quality issues in real-time",
      state_name: "National",
      priority: "Medium",
      estimated_impact: "Reduce data quality issues by 80%",
      status: "Draft",
      created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  count: 4,
}

export const mockAggregatedStateDistribution = {
  states: [
    { state: "Uttar Pradesh", total_enrollments: 360738 },
    { state: "Bihar", total_enrollments: 193016 },
    { state: "Madhya Pradesh", total_enrollments: 128547 },
    { state: "Gujarat", total_enrollments: 127051 },
    { state: "Assam", total_enrollments: 108852 },
    { state: "Maharashtra", total_enrollments: 99492 },
  ],
  total_states: 28,
}

export const mockAggregatedDemographics = {
  demographics: [
    { state: "Uttar Pradesh", demo_age_5_17: 200000, demo_age_17_plus: 460738, total: 660738 },
    { state: "Bihar", demo_age_5_17: 80000, demo_age_17_plus: 113016, total: 193016 },
  ],
}

export const mockCoverageGaps = {
  coverage_gaps: [
    { state: "Bihar", district: "Sitamarhi", enrollments: 27959, population: 200000, coverage_percentage: 13.98 },
    { state: "Uttar Pradesh", district: "Bahraich", enrollments: 23561, population: 300000, coverage_percentage: 7.87 },
    { state: "Meghalaya", district: "East Khasi Hills", enrollments: 23119, population: 450000, coverage_percentage: 5.14 },
  ],
}

