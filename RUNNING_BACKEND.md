# Quick Start - Running the Backend

## ✅ Backend is Now Running!

Your FastAPI backend is live on:
```
http://localhost:8000
```

## 📡 Access Points

### 1. **Interactive API Documentation (Recommended)**
```
http://localhost:8000/docs
```
- Full API explorer
- Try endpoints directly
- View schemas and responses

### 2. **Alternative Documentation (ReDoc)**
```
http://localhost:8000/redoc
```
- Clean, readable API docs
- Good for reference

### 3. **OpenAPI Schema (JSON)**
```
http://localhost:8000/openapi.json
```
- Machine-readable specification
- For code generation tools

---

## 🧪 Test the API

### Health Check
```bash
curl http://localhost:8000/health
```

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-01-16T10:30:45.123456"
}
```

### Get Cache Statistics
```bash
curl http://localhost:8000/api/cache/stats
```

### Get Available States
```bash
curl http://localhost:8000/api/metadata/states
```

### Get State Distribution
```bash
curl http://localhost:8000/api/mobility/state-distribution
```

---

## 🔄 Server Control

### View Server Output
The backend is running in the background. Output is shown in the terminal.

### Stop the Server
Press `Ctrl+C` in the terminal where the server is running.

### Restart the Server
```bash
cd backend
python main.py
```

---

## 🚀 Available Endpoints

### National Overview
```
GET /api/national-overview
```

### Mobility Analysis
```
GET /api/mobility/state-distribution
GET /api/enrollment-timeline?months=12
```

### Cache Management
```
GET /api/cache/stats
POST /api/cache/clear
GET /api/metadata/states
GET /api/metadata/districts/{state}
```

### Data Signals (ADIF)
```
GET /api/signals/duplicates
GET /api/signals/confidence/{record_id}
```

### Identity Resilience (IRF)
```
POST /api/irf/multi-factor
POST /api/irf/biometric-aging
```

### Forensic Intelligence (AFIF)
```
GET /api/afif/hub-analysis?state={state}
GET /api/afif/network-graph
GET /api/afif/risk-alerts
```

### Resource Optimization (PROF)
```
GET /api/prof/mpi?state={state}
GET /api/prof/demand-forecast?state={state}&months=12
```

### Mobility Framework (AMF)
```
GET /api/amf/mobility-tier?aadhaar={id}
GET /api/amf/mobility-timeline?aadhaar={id}
```

### Privacy Analytics (PPAF)
```
POST /api/ppaf/differential-privacy
POST /api/ppaf/federated-query
GET /api/ppaf/policy-dashboard
```

---

## 📊 Example Requests

### PowerShell
```powershell
# Health check
curl http://localhost:8000/health

# Get states
curl http://localhost:8000/api/metadata/states

# Get cache stats
curl http://localhost:8000/api/cache/stats
```

### bash/curl
```bash
# Health check
curl http://localhost:8000/health

# Get states
curl http://localhost:8000/api/metadata/states

# Get cache stats
curl http://localhost:8000/api/cache/stats
```

### Python
```python
import requests

# Health check
response = requests.get("http://localhost:8000/health")
print(response.json())

# Get states
response = requests.get("http://localhost:8000/api/metadata/states")
print(response.json())
```

### JavaScript/Node.js
```javascript
// Health check
fetch("http://localhost:8000/health")
  .then(r => r.json())
  .then(data => console.log(data));

// Get states
fetch("http://localhost:8000/api/metadata/states")
  .then(r => r.json())
  .then(data => console.log(data));
```

---

## ⚙️ Configuration

### Environment Variables
Currently using defaults:
- `DATASET_DIR`: `./dataset/clean`
- `USE_CSV_DB`: `1` (enabled)

To change, set before running:
```bash
# PowerShell
$env:DATASET_DIR="C:\path\to\dataset\clean"

# bash
export DATASET_DIR=/path/to/dataset/clean

# Or create .env file in backend/
DATASET_DIR=/path/to/dataset/clean
USE_CSV_DB=1
```

---

## 🐛 Troubleshooting

### Port 8000 Already in Use
```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use different port
python -m uvicorn main:app --port 8080
```

### Import Errors
The server now handles both relative and absolute imports. If you still see issues:
```bash
# Check Python path
python -c "import sys; print(sys.path)"

# Reinstall dependencies
pip install -r requirements.txt
```

### CSV Data Not Loading
```bash
# Verify dataset path
dir .\dataset\clean\api_data_aadhar_enrolment\

# Check cache stats (should load data on first query)
curl http://localhost:8000/api/cache/stats
```

---

## 📚 Next Steps

1. **Explore the API**: Visit http://localhost:8000/docs
2. **Read Documentation**: Check [README.md](./README.md)
3. **Understand Frameworks**: See [FRAMEWORKS.md](./FRAMEWORKS.md)
4. **Learn CSV Optimization**: Read [CSV_OPTIMIZATION.md](./CSV_OPTIMIZATION.md)

---

## 🎯 Key Features

✅ 40+ REST endpoints
✅ 6 intelligence frameworks integrated
✅ TTL-based caching (1000x-100000x faster)
✅ State/district indexing
✅ Privacy-preserving analytics
✅ Fraud detection capabilities
✅ Mobility tracking
✅ Resource optimization

---

**Backend Status**: 🟢 **RUNNING**

**Last Started**: January 16, 2026
