-- DEPRECATED: Postgres helper moved to postgres_deprecated for archival purposes
-- This script was originally used to load CSVs into Postgres using client-side \copy
-- and upsert into aggregated tables. The repository now prefers CSV-first workflows
-- and the Python loader with --dry-run for validation.

BEGIN;

-- Enrollment
CREATE TEMP TABLE temp_enrollment (
  date DATE,
  state TEXT,
  district TEXT,
  pincode TEXT,
  age_0_5 INT,
  age_5_17 INT,
  age_18_greater INT
) ON COMMIT DROP;

\copy temp_enrollment (date, state, district, pincode, age_0_5, age_5_17, age_18_greater) FROM :'enroll_file' CSV HEADER;

INSERT INTO enrollment_aggregated (date, state, district, pincode, age_0_5, age_5_17, age_18_greater)
SELECT date, state, district, pincode, SUM(age_0_5), SUM(age_5_17), SUM(age_18_greater)
FROM temp_enrollment
GROUP BY date, state, district, pincode
ON CONFLICT (date, state, district, pincode) DO UPDATE
SET age_0_5 = enrollment_aggregated.age_0_5 + EXCLUDED.age_0_5,
    age_5_17 = enrollment_aggregated.age_5_17 + EXCLUDED.age_5_17,
    age_18_greater = enrollment_aggregated.age_18_greater + EXCLUDED.age_18_greater;

-- Demographic
CREATE TEMP TABLE temp_demographic (
  date DATE,
  state TEXT,
  district TEXT,
  pincode TEXT,
  demo_age_5_17 INT,
  demo_age_17_plus INT
) ON COMMIT DROP;

\copy temp_demographic (date, state, district, pincode, demo_age_5_17, demo_age_17_plus) FROM :'demo_file' CSV HEADER;

INSERT INTO demographic_aggregated (date, state, district, pincode, demo_age_5_17, demo_age_17_plus)
SELECT date, state, district, pincode, SUM(demo_age_5_17), SUM(demo_age_17_plus)
FROM temp_demographic
GROUP BY date, state, district, pincode
ON CONFLICT (date, state, district, pincode) DO UPDATE
SET demo_age_5_17 = demographic_aggregated.demo_age_5_17 + EXCLUDED.demo_age_5_17,
    demo_age_17_plus = demographic_aggregated.demo_age_17_plus + EXCLUDED.demo_age_17_plus;

-- Biometric
CREATE TEMP TABLE temp_biometric (
  date DATE,
  state TEXT,
  district TEXT,
  pincode TEXT,
  bio_age_5_17 INT,
  bio_age_17_plus INT
) ON COMMIT DROP;

\copy temp_biometric (date, state, district, pincode, bio_age_5_17, bio_age_17_plus) FROM :'bio_file' CSV HEADER;

INSERT INTO biometric_aggregated (date, state, district, pincode, bio_age_5_17, bio_age_17_plus)
SELECT date, state, district, pincode, SUM(bio_age_5_17), SUM(bio_age_17_plus)
FROM temp_biometric
GROUP BY date, state, district, pincode
ON CONFLICT (date, state, district, pincode) DO UPDATE
SET bio_age_5_17 = biometric_aggregated.bio_age_5_17 + EXCLUDED.bio_age_5_17,
    bio_age_17_plus = biometric_aggregated.bio_age_17_plus + EXCLUDED.bio_age_17_plus;

COMMIT;

-- End of archived Postgres script