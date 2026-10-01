# Moving off the remove.bg API: a migration guide to LassoCut

The remove.bg website, its self-service API (`api.remove.bg`) and its plugins stop on **1 December 2026, 09:00 CET** ([remove.bg FAQ](https://www.remove.bg/faq)). This repository shows how to point existing code at [LassoCut](https://www.lassocut.com/), a background removal API compatible with the remove.bg API: same request shape, same `X-Api-Key` header, same JSON error format. In most code you change two things: **the base URL and the key**.

```diff
- https://api.remove.bg/v1.0/removebg
+ https://api.lassocut.com/v1.0/removebg
```

Full guide with a parameter-by-parameter table: <https://www.lassocut.com/migrate/>

## Examples

Each file in [`examples/`](examples/) is a minimal, complete call. All four were run against the production API on 27 September 2026 and returned a PNG.

| Language | File | Walkthrough |
|---|---|---|
| curl | [`examples/curl.sh`](examples/curl.sh) | <https://www.lassocut.com/guides/curl/> |
| Python (requests) | [`examples/python.py`](examples/python.py) | <https://www.lassocut.com/guides/python/> |
| Node.js 18+ (built-in fetch) | [`examples/node.mjs`](examples/node.mjs) | <https://www.lassocut.com/guides/node/> |
| PHP (curl extension) | [`examples/php.php`](examples/php.php) | <https://www.lassocut.com/guides/php/> |

Set your key first: `export LASSOCUT_API_KEY=...` (get one free at <https://www.lassocut.com/account/>). `size=preview` costs 0.25 credit, and every account gets 50 free previews a month (up to 10 a day).

## Existing client libraries

Some community libraries hard-code `api.remove.bg`. Two of them expose the address so you can change it without forking (both are third-party packages, not produced by LassoCut and not affiliated with remove.bg):

**Python — [brilam/remove-bg](https://github.com/brilam/remove-bg)**

```python
import os
import removebg.removebg
removebg.removebg.API_ENDPOINT = "https://api.lassocut.com/v1.0/removebg"

from removebg import RemoveBg
RemoveBg(os.environ["LASSOCUT_API_KEY"], "errors.log").remove_background_from_img_file("photo.jpg")
```

**PHP — [mtownsend5512/remove-bg](https://github.com/mtownsend5512/remove-bg)**

```php
$removebg = new \Mtownsend\RemoveBg\RemoveBg(getenv("LASSOCUT_API_KEY"));
$removebg->endpoint = 'https://api.lassocut.com/v1.0/removebg';
$removebg->file('photo.jpg')->save('no-bg.png');
```

For any other HTTP client, replace the base URL `https://api.remove.bg/v1.0` with `https://api.lassocut.com/v1.0`.

## What is the same, what differs

| Part of the remove.bg API v1.0 | LassoCut |
|---|---|
| `POST /v1.0/removebg` | Same path |
| `X-Api-Key` header | Same header |
| `image_file` (multipart), `image_url`, `image_file_b64` | Yes |
| `size`, `type`, `bg_color`, `bg_image_url`, `bg_image_file`, `crop`, `crop_margin`, `scale`, `position`, `channels` | Yes |
| `format`: `auto`, `png`, `jpg`, `webp`, `zip` | All five |
| Raw image bytes (or JSON with `Accept: application/json`) | Yes |
| `X-Credits-Charged`, `X-Type`, `X-Width`, `X-Height` | Yes, plus `X-Foreground-*` |
| `GET /v1.0/account` | Yes, same response shape |
| `POST /v1.0/improve` | Yes |

Results are produced by LassoCut's own models, so edges can differ slightly from the results you had before. Reference: <https://www.lassocut.com/docs/>

## Plugins

LassoCut also has plugins for Photoshop, Figma, GIMP 3, WordPress/WooCommerce, n8n, Zapier and Make, plus a command-line tool: <https://www.lassocut.com/platforms/>

## Pricing

Credit packs, no subscription, credits never expire: $9 / 100, $39 / 1,000, $249 / 10,000, $1,500 / 100,000. <https://www.lassocut.com/pricing/>

---

remove.bg is a trademark of Canva Austria GmbH. LassoCut is an independent product of JAUPIN Design LLC and is not affiliated with, endorsed by, or sponsored by Canva or remove.bg. The code in this repository is released under the MIT licence.
