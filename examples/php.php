<?php
// Remove the background of photo.jpg with the LassoCut API (compatible with the remove.bg API).
$ch = curl_init("https://api.lassocut.com/v1.0/removebg");
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => ["X-Api-Key: " . getenv("LASSOCUT_API_KEY")],
    CURLOPT_POSTFIELDS => ["image_file" => new CURLFile("photo.jpg"), "size" => "preview"],
    CURLOPT_RETURNTRANSFER => true,
]);
$png = curl_exec($ch);
file_put_contents("no-bg.png", $png);
echo curl_getinfo($ch, CURLINFO_HTTP_CODE), "\n";
