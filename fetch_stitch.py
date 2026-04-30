import json
import urllib.request

url = "https://stitch.googleapis.com/mcp"
headers = {
    "X-Goog-Api-Key": "REDACTED",
    "Content-Type": "application/json"
}
data = {
    "jsonrpc": "2.0",
    "id": 5,
    "method": "tools/call",
    "params": {
        "name": "get_project",
        "arguments": {
            "name": "projects/8034958847350267372"
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
try:
    with urllib.request.urlopen(req) as response:
        with open("project_details.json", "w") as f:
            f.write(response.read().decode("utf-8"))
except Exception as e:
    print(e)
