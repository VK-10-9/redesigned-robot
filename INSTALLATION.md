# Installation & Setup Guide

## Prerequisites

- Python 3.13.7+
- pip or conda
- Git
- ~200MB disk space

## Quick Start (2 minutes)

```bash
# 1. Clone repository
git clone https://github.com/VK-10-9/effective-computing-machine.git
cd effective-computing-machine

# 2. Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate      # Windows

# 3. Install dependencies
pip install -r backend/requirements.txt

# 4. Run the API
cd backend
python main.py

# 5. Visit the API
# Open http://localhost:8000/docs in your browser
```

---

## Detailed Setup

### 1. Create Virtual Environment

#### Using venv (Recommended)
```bash
python -m venv .venv
```

#### Using conda
```bash
conda create -n vidyut python=3.13
conda activate vidyut
```

### 2. Activate Environment

**Linux/macOS**:
```bash
source .venv/bin/activate
```

**Windows PowerShell**:
```powershell
.venv\Scripts\Activate.ps1
```

**Windows CMD**:
```cmd
.venv\Scripts\activate.bat
```

### 3. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Dependencies Installed**:
- fastapi==0.104.1 - Web framework
- uvicorn==0.24.0 - ASGI server
- python-dotenv==1.0.0 - Environment variables
- pydantic==2.5.0 - Data validation
- pandas==2.2.3 - Data processing
- rapidfuzz==2.16.0 - String matching

---

## Configuration

### 1. Set Dataset Path

Create a `.env` file in the `backend/` directory:

```bash
# backend/.env
DATASET_DIR=/path/to/dataset/clean
USE_CSV_DB=1
```

Or set environment variables:

**Linux/macOS**:
```bash
export DATASET_DIR=./dataset/clean
export USE_CSV_DB=1
```

**Windows PowerShell**:
```powershell
$env:DATASET_DIR=".\dataset\clean"
$env:USE_CSV_DB="1"
```

### 2. Prepare Data

Expected CSV folder structure:
```
dataset/clean/
├── api_data_aadhar_enrolment/
│   ├── 2024_01.csv
│   ├── 2024_02.csv
│   └── ...
├── api_data_aadhar_demographic/
│   └── demographics.csv
└── api_data_aadhar_biometric/
    └── biometric_data.csv
```

Expected CSV columns:

**Enrollment CSV**:
```
date,state,district,pincode,age_0_5,age_5_17,age_18_greater
2024-01-01,Karnataka,Bangalore,560001,100,200,300
...
```

**Demographic CSV**:
```
state,demo_age_5_17,demo_age_17_plus
Karnataka,500000,2000000
...
```

---

## Running the Server

### Start Development Server

```bash
cd backend
python main.py
```

**Expected Output**:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started server process [12345]
INFO:     Application startup complete
```

### Run with Custom Host/Port

```bash
# Python
python -m uvicorn main:app --host 0.0.0.0 --port 8080

# Or in code
uvicorn.run(app, host="0.0.0.0", port=8080)
```

### Run with Auto-reload (Development)

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## API Access

### Interactive Documentation (Swagger)
```
http://localhost:8000/docs
```

### Alternative Documentation (ReDoc)
```
http://localhost:8000/redoc
```

### OpenAPI Schema
```
http://localhost:8000/openapi.json
```

### Health Check
```bash
curl http://localhost:8000/health
```

---

## Code Quality Tools

### Formatting with Black

```bash
# Format all code
black backend/

# Check without modifying
black --check backend/
```

### Linting with Ruff

```bash
# Check for issues
ruff check backend/

# Fix automatically
ruff check --fix backend/
```

### Type Checking with Mypy

```bash
# Type check all modules
mypy backend/

# Type check specific file
mypy backend/csv_db.py
```

### Run All Tools

```bash
black backend/ && ruff check --fix backend/ && mypy backend/
```

---

## Project Structure

```
.
├── README.md                     # Main documentation
├── FRAMEWORKS.md                 # Framework details
├── CSV_OPTIMIZATION.md           # CSV layer optimization
├── INSTALLATION.md               # This file
├── backend/
│   ├── main.py                  # FastAPI application
│   ├── csv_db.py                # CSV datastore with caching
│   ├── requirements.txt          # Python dependencies
│   ├── frameworks/              # 6 Intelligence Frameworks
│   ├── utils/                   # Utility modules
│   ├── analytics/               # Analytics layer
│   └── security/                # Security & audit
├── app/                         # Next.js frontend
├── components/                  # React components
├── scripts/                     # Utility scripts
└── public/                      # Static assets
```

---

## Troubleshooting

### Port 8000 Already in Use

```bash
# Find what's using port 8000
lsof -i :8000  # Linux/macOS
netstat -ano | findstr :8000  # Windows

# Kill the process
kill -9 <PID>  # Linux/macOS
taskkill /PID <PID> /F  # Windows

# Or use different port
python main.py --port 8080
```

### Import Errors

```bash
# Verify virtual environment is activated
which python  # Should show .venv path

# Reinstall dependencies
pip install --upgrade -r backend/requirements.txt

# Check Python version
python --version  # Should be 3.13+
```

### CSV Data Not Loading

```bash
# Verify dataset path
export DATASET_DIR=./dataset/clean

# Check if files exist
ls -la ./dataset/clean/api_data_aadhar_enrolment/

# Test CSV reading
python -c "from backend.csv_db import get_state_distribution; print(get_state_distribution())"
```

### Cache Issues

```bash
# Clear cache via API
curl -X POST http://localhost:8000/api/cache/clear

# Check cache stats
curl http://localhost:8000/api/cache/stats
```

---

## Docker Setup (Optional)

### Create Dockerfile

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV DATASET_DIR=/data/clean
ENV USE_CSV_DB=1

EXPOSE 8000

CMD ["python", "main.py"]
```

### Build and Run

```bash
# Build image
docker build -t vidyut:latest .

# Run container
docker run -p 8000:8000 \
  -v $(pwd)/dataset:/data \
  -e DATASET_DIR=/data/clean \
  vidyut:latest
```

---

## Production Deployment

### Using Gunicorn

```bash
# Install gunicorn
pip install gunicorn

# Run with multiple workers
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Using systemd

Create `/etc/systemd/system/vidyut.service`:

```ini
[Unit]
Description=Vidyut API Server
After=network.target

[Service]
Type=simple
User=vidyut
WorkingDirectory=/opt/vidyut/backend
Environment="DATASET_DIR=/data/dataset/clean"
ExecStart=/opt/vidyut/.venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable vidyut
sudo systemctl start vidyut
sudo systemctl status vidyut
```

### Using Nginx (Reverse Proxy)

```nginx
upstream vidyut {
    server localhost:8000;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://vidyut;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## Performance Tuning

### Memory Optimization
```python
# In main.py
CACHE_TTL_SHORT = 300   # 5 minutes
CACHE_TTL_LONG = 1800   # 30 minutes
```

### Connection Pooling
```bash
# Adjust in gunicorn
gunicorn -w 8 --worker-class uvicorn.workers.UvicornWorker \
  --max-requests 1000 --max-requests-jitter 100 \
  main:app
```

### Database Indexing
Already optimized with state/district/date indices.

---

## Monitoring

### Health Check Endpoint
```bash
curl http://localhost:8000/health
```

### Cache Statistics
```bash
curl http://localhost:8000/api/cache/stats
```

### Check Active Connections
```bash
# Linux
netstat -an | grep 8000

# macOS
lsof -i :8000
```

---

## Development Workflow

### Modify Code

1. Edit files in `backend/`
2. With `--reload`, changes take effect automatically
3. Check API docs at `/docs`

### Test Changes

```bash
# Quick test
curl http://localhost:8000/health

# Test specific endpoint
curl http://localhost:8000/api/cache/stats

# Format and lint
black backend/ && ruff check --fix backend/
```

### Commit Changes

```bash
git add -A
git commit -m "Descriptive message"
git push origin main
```

---

## Getting Help

### API Documentation
- Interactive: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Framework Documentation
- See [FRAMEWORKS.md](./FRAMEWORKS.md)

### CSV Optimization
- See [CSV_OPTIMIZATION.md](./CSV_OPTIMIZATION.md)

### Logs
Check standard output/error where API is running

---

**Last Updated**: January 16, 2026
