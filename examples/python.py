# Remove the background of photo.jpg with the LassoCut API (compatible with the remove.bg API).
import os, requests

r = requests.post(
    "https://api.lassocut.com/v1.0/removebg",
    headers={"X-Api-Key": os.environ["LASSOCUT_API_KEY"]},
    files={"image_file": open("photo.jpg", "rb")},
    data={"size": "preview"},
)
r.raise_for_status()
open("no-bg.png", "wb").write(r.content)
print("credits charged:", r.headers["X-Credits-Charged"])
