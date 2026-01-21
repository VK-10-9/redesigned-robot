#!/usr/bin/env python
"""
Startup script for SAMVIDHAN API backend.
Runs with proper environment configuration.
"""
import sys
import os

# Ensure we're in the backend directory
backend_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(backend_dir)

# Add backend to path first
sys.path.insert(0, backend_dir)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8003,
        reload=False,
        log_level="info"
    )
