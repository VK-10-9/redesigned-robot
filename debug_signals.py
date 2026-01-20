from fastapi.testclient import TestClient

from backend.main import app

c = TestClient(app)
r = c.get("/api/signals/duplicates?threshold=0.8&max_rows=200")
print("STATUS", r.status_code)
print("BODY", r.text)
