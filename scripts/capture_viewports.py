import asyncio
import json
import urllib.request
import subprocess
import time
import base64
import os
import websockets

async def capture_site(url, prefix, num_scrolls=12, scroll_step=750):
    os.makedirs("screenshots", exist_ok=True)
    # Start Chrome with remote debugging
    port = 9223
    proc = subprocess.Popen([
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--disable-gpu",
        "--window-size=1440,900"
    ])
    
    await asyncio.sleep(2)
    try:
        # Get websocket URL
        tabs_json = urllib.request.urlopen(f"http://127.0.0.1:{port}/json").read()
        tabs = json.loads(tabs_json)
        # Find page tab
        target = [t for t in tabs if t.get("type") == "page"][0]
        ws_url = target["webSocketDebuggerUrl"]
        
        async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
            msg_id = 1
            
            async def send(method, params=None):
                nonlocal msg_id
                cid = msg_id
                msg_id += 1
                payload = {"id": cid, "method": method, "params": params or {}}
                await ws.send(json.dumps(payload))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("id") == cid:
                        return resp.get("result", {})
            
            await send("Page.enable")
            await send("Page.navigate", {"url": url})
            # Wait for page load
            print(f"Navigating to {url}...")
            await asyncio.sleep(4)
            
            for i in range(num_scrolls):
                y = i * scroll_step
                await send("Runtime.evaluate", {"expression": f"window.scrollTo(0, {y})"})
                await asyncio.sleep(0.8)
                
                shot_data = await send("Page.captureScreenshot", {"format": "png"})
                if "data" in shot_data:
                    img_bytes = base64.b64decode(shot_data["data"])
                    filepath = f"screenshots/{prefix}_v_{i+1:02d}.png"
                    with open(filepath, "wb") as f:
                        f.write(img_bytes)
                    print(f"Captured {filepath} at y={y}")
    finally:
        proc.terminate()
        proc.wait()

async def main():
    print("Capturing live site viewports...")
    await capture_site("https://interio.com", "live_vp", num_scrolls=12, scroll_step=750)
    print("Capturing local site viewports...")
    await capture_site("http://localhost:3000", "local_vp", num_scrolls=12, scroll_step=750)
    print("Finished all viewports!")

if __name__ == "__main__":
    asyncio.run(main())
