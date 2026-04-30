import json
import urllib.request
import os

url = "https://stitch.googleapis.com/mcp"
headers = {
    "X-Goog-Api-Key": "REDACTED",
    "Content-Type": "application/json"
}

# 1. Get project details to get screen instances
data = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "get_project",
        "arguments": {
            "name": "projects/8034958847350267372"
        }
    }
}
req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
with urllib.request.urlopen(req) as response:
    proj_resp = json.loads(response.read().decode("utf-8"))
    project_text = proj_resp.get("result", {}).get("content", [{}])[0].get("text", "{}")
    if isinstance(project_text, str):
        project_data = json.loads(project_text)
    else:
        project_data = project_text

screens = project_data.get("screenInstances", [])

if not os.path.exists("stitch_screens"):
    os.makedirs("stitch_screens")

# 2. Get each screen's HTML
for screen in screens:
    screen_id = screen.get("sourceScreen")
    if not screen_id:
        continue
    
    print(f"Fetching {screen_id}...")
    req_data = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/call",
        "params": {
            "name": "get_screen",
            "arguments": {
                "name": screen_id
            }
        }
    }
    
    req = urllib.request.Request(url, data=json.dumps(req_data).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            screen_resp = json.loads(response.read().decode("utf-8"))
            screen_text = screen_resp.get("result", {}).get("content", [{}])[0].get("text", "{}")
            if isinstance(screen_text, str):
                screen_data = json.loads(screen_text)
            else:
                screen_data = screen_text
            
            html_code = screen_data.get("htmlCode", {})
            download_url = html_code.get("downloadUrl")
            title = screen_data.get("title", screen_id.replace("/", "_"))
            if download_url:
                with urllib.request.urlopen(download_url) as html_resp:
                    html_content = html_resp.read()
                    
                safe_title = "".join([c for c in title if c.isalpha() or c.isdigit() or c==' ']).rstrip().replace(" ", "_")
                filename = safe_title + ".html"
                with open(os.path.join("stitch_screens", filename), "wb") as f:
                    f.write(html_content)
                print(f"Saved {filename}")
    except Exception as e:
        print(f"Error fetching {screen_id}: {e}")

print("Done")
