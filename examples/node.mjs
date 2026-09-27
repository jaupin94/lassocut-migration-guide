// Remove the background of photo.jpg with the LassoCut API (compatible with the remove.bg API). Node.js 18+.
import { readFile, writeFile } from "node:fs/promises";

const form = new FormData();
form.append("image_file", new Blob([await readFile("photo.jpg")]), "photo.jpg");
form.append("size", "preview");

const res = await fetch("https://api.lassocut.com/v1.0/removebg", {
  method: "POST",
  headers: { "X-Api-Key": process.env.LASSOCUT_API_KEY },
  body: form,
});
if (!res.ok) throw new Error(JSON.stringify(await res.json()));
console.log("credits charged:", res.headers.get("x-credits-charged"));
await writeFile("no-bg.png", Buffer.from(await res.arrayBuffer()));
