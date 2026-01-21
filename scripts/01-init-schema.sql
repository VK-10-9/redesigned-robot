-- DEPRECATED: Postgres schema is deprecated. Use CSV-only mode instead.
-- Original schema preserved in scripts/postgres_deprecated/01-init-schema.sql

-- SAMVIDHAN Aadhaar Intelligence Platform Schema (DEPRECATED)

-- States table
CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(2) NOT NULL UNIQUE,
  region VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Districts table
CREATE TABLE IF NOT EXISTS districts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state_id INT NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  code VARCHAR(5) NOT NULL,
  population INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(state_id, name)
);

-- Aadhaar enrollment records (main dataset)
CREATE TABLE IF NOT EXISTS aadhaar_enrollments (
  id SERIAL PRIMARY KEY,
  aadhaar_id VARCHAR(12) NOT NULL UNIQUE,
  state_id INT NOT NULL REFERENCES states(id),
  district_id INT NOT NULL REFERENCES districts(id),
  enrollment_date DATE NOT NULL,
  age_group VARCHAR(20), -- 0-5, 5-18, 18-35, 35-60, 60+
  gender VARCHAR(10), -- M, F, O
  urban_rural VARCHAR(10), -- Urban, Rural
  enrollment_status VARCHAR(20), -- Active, Inactive, Suspended
  last_updated DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

-- Demographics aggregation (for faster queries)
CREATE TABLE IF NOT EXISTS demographics_summary (
  id SERIAL PRIMARY KEY,
  state_id INT NOT NULL REFERENCES states(id),
  district_id INT REFERENCES districts(id),
  age_group VARCHAR(20),
  gender VARCHAR(10),
  urban_rural VARCHAR(10),
  enrollment_count INT DEFAULT 0,
  active_count INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

-- Mobility patterns (enrollment flow between states/districts)
CREATE TABLE IF NOT EXISTS mobility_patterns (
  id SERIAL PRIMARY KEY,
  from_state_id INT REFERENCES states(id),
  to_state_id INT REFERENCES states(id),
  from_district_id INT REFERENCES districts(id),
  to_district_id INT REFERENCES districts(id),
  movement_count INT DEFAULT 0,
  movement_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Anomalies detected
CREATE TABLE IF NOT EXISTS anomalies (
  id SERIAL PRIMARY KEY,
  anomaly_type VARCHAR(50), -- duplicate_aadhaar, unusual_concentration, rapid_enrollment, etc
  state_id INT REFERENCES states(id),
  district_id INT REFERENCES districts(id),
  severity VARCHAR(20), -- low, medium, high, critical
  description TEXT,
  records_affected INT,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed BOOLEAN DEFAULT FALSE,
  reviewed_by VARCHAR(100),
  review_notes TEXT
);

-- Policy recommendations
CREATE TABLE IF NOT EXISTS policy_recommendations (
  id SERIAL PRIMARY KEY,
  state_id INT REFERENCES states(id),
  district_id INT REFERENCES districts(id),
  recommendation_type VARCHAR(100),
  description TEXT,
  priority VARCHAR(20), -- Low, Medium, High
  estimated_impact VARCHAR(255),
  status VARCHAR(20), -- Draft, Reviewed, Implemented
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_aadhaar_state ON aadhaar_enrollments(state_id);
CREATE INDEX IF NOT EXISTS idx_aadhaar_district ON aadhaar_enrollments(district_id);
CREATE INDEX IF NOT EXISTS idx_aadhaar_enrollment_date ON aadhaar_enrollments(enrollment_date);
CREATE INDEX IF NOT EXISTS idx_aadhaar_status ON aadhaar_enrollments(enrollment_status);
CREATE INDEX IF NOT EXISTS idx_demographics_state ON demographics_summary(state_id);
CREATE INDEX IF NOT EXISTS idx_demographics_district ON demographics_summary(district_id);
CREATE INDEX IF NOT EXISTS idx_anomalies_state ON anomalies(state_id);
CREATE INDEX IF NOT EXISTS idx_anomalies_severity ON anomalies(severity);

-- Aggregated dataset tables (for ETL / reporting)
CREATE TABLE IF NOT EXISTS enrollment_aggregated (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  pincode TEXT,
  age_0_5 INT DEFAULT 0,
  age_5_17 INT DEFAULT 0,
  age_18_greater INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, state, district, pincode)
);

CREATE TABLE IF NOT EXISTS demographic_aggregated (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  pincode TEXT,
  demo_age_5_17 INT DEFAULT 0,
  demo_age_17_plus INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, state, district, pincode)
);

CREATE TABLE IF NOT EXISTS biometric_aggregated (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  pincode TEXT,
  bio_age_5_17 INT DEFAULT 0,
  bio_age_17_plus INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, state, district, pincode)
);

CREATE INDEX IF NOT EXISTS idx_enrollment_date ON enrollment_aggregated(date);
CREATE INDEX IF NOT EXISTS idx_enrollment_state ON enrollment_aggregated(state);
CREATE INDEX IF NOT EXISTS idx_enrollment_district ON enrollment_aggregated(district);

CREATE INDEX IF NOT EXISTS idx_demographic_date ON demographic_aggregated(date);
CREATE INDEX IF NOT EXISTS idx_demographic_state ON demographic_aggregated(state);

CREATE INDEX IF NOT EXISTS idx_biometric_date ON biometric_aggregated(date);
CREATE INDEX IF NOT EXISTS idx_biometric_state ON biometric_aggregated(state);

-- Track processed CSV files to ensure idempotent loads
CREATE TABLE IF NOT EXISTS processed_files (
  id SERIAL PRIMARY KEY,
  file_path TEXT NOT NULL,
  md5 CHAR(32) NOT NULL,
  file_size BIGINT NOT NULL,
  loaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(md5)
);

CREATE INDEX IF NOT EXISTS idx_processed_files_md5 ON processed_files(md5);
