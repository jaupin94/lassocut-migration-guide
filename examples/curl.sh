#!/bin/sh
# Remove the background of photo.jpg with the LassoCut API (compatible with the remove.bg API).
curl -H "X-Api-Key: $LASSOCUT_API_KEY" \
     -F "image_file=@photo.jpg" \
     -F "size=preview" \
     -o no-bg.png \
     https://api.lassocut.com/v1.0/removebg
