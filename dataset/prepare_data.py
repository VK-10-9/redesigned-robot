#!/usr/bin/env python3
"""
Dataset Preparation Script
Organizes raw CSV data into the clean/ directory structure expected by the API.
"""

import os
import shutil
import pandas as pd
from pathlib import Path

# Base paths
DATASET_ROOT = Path(__file__).parent
RAW_DIR = DATASET_ROOT / "raw"
CLEAN_DIR = DATASET_ROOT / "clean"

# Output directories
ENROL_OUT = CLEAN_DIR / "api_data_aadhar_enrolment"
DEMO_OUT = CLEAN_DIR / "api_data_aadhar_demographic"
BIO_OUT = CLEAN_DIR / "api_data_aadhar_biometric"


def ensure_dir(path: Path):
    """Create directory if it doesn't exist"""
    path.mkdir(parents=True, exist_ok=True)


def copy_csvs(source_pattern: str, dest_dir: Path):
    """Copy CSV files matching pattern to destination"""
    ensure_dir(dest_dir)
    
    source_root = RAW_DIR / source_pattern.split("/")[0]
    count = 0
    
    for root, dirs, files in os.walk(source_root):
        for file in files:
            if file.endswith(".csv"):
                src_path = Path(root) / file
                dst_path = dest_dir / file
                print(f"  Copying: {file}")
                shutil.copy2(src_path, dst_path)
                count += 1
    
    return count


def main():
    print("🔄 Dataset Preparation Script")
    print("=" * 60)
    
    # Create clean directory
    print("\n📁 Creating clean directory structure...")
    ensure_dir(CLEAN_DIR)
    
    # Copy enrollment data
    print("\n📊 Processing Enrollment Data...")
    enrol_count = copy_csvs("api_data_aadhar_enrolment", ENROL_OUT)
    print(f"   ✅ Copied {enrol_count} enrollment files")
    
    # Copy demographic data
    print("\n👥 Processing Demographic Data...")
    demo_count = copy_csvs("api_data_aadhar_demographic", DEMO_OUT)
    print(f"   ✅ Copied {demo_count} demographic files")
    
    # Copy biometric data
    print("\n🔐 Processing Biometric Data...")
    bio_count = copy_csvs("api_data_aadhar_biometric", BIO_OUT)
    print(f"   ✅ Copied {bio_count} biometric files")
    
    # Print summary
    print("\n" + "=" * 60)
    print("📈 Summary:")
    print(f"   Enrollment files:   {enrol_count}")
    print(f"   Demographic files:  {demo_count}")
    print(f"   Biometric files:    {bio_count}")
    print(f"   Total:              {enrol_count + demo_count + bio_count}")
    print("\n✨ Dataset preparation complete!")
    print(f"   Output: {CLEAN_DIR}")
    print("\n💡 Set environment variable:")
    print(f"   export DATASET_DIR={CLEAN_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
