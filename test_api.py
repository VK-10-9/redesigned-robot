import urllib.request
import json
import time

print("Waiting for server...")
time.sleep(3)

try:
    req = urllib.request.Request('http://localhost:8000/api/metadata/states')
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(f"✅ API Working!")
        print(f"States found: {data.get('count', 0)}")
        states = data.get('states', [])
        if states:
            print(f"Sample states: {states[:3]}")
except Exception as e:
    print(f"❌ Error: {type(e).__name__}")
    print(f"   {str(e)[:300]}")
