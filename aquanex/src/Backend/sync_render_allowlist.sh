#!/bin/zsh
set -euo pipefail

if [ -z "${RENDER_API_KEY:-}" ]; then
  echo "RENDER_API_KEY is not set; skipping Render allowlist sync."
  exit 0
fi

if [ -z "${RENDER_KEYVALUE_ID:-}" ]; then
  echo "RENDER_KEYVALUE_ID is not set; skipping Render allowlist sync."
  exit 0
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required."
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required."
  exit 1
fi

CURRENT_IP="$(curl -4fsS https://ifconfig.me || true)"
if [ -z "$CURRENT_IP" ]; then
  CURRENT_IP="$(curl -4fsS https://api.ipify.org || true)"
fi
if [ -z "$CURRENT_IP" ]; then
  echo "Unable to determine public IPv4."
  exit 1
fi

CIDR="${CURRENT_IP}/32"
API_BASE="https://api.render.com/v1"
AUTH_HEADER="Authorization: Bearer ${RENDER_API_KEY}"

KV_JSON="$(curl -fsS -H "$AUTH_HEADER" "${API_BASE}/key-value/${RENDER_KEYVALUE_ID}")"

PATCH_BODY="$(
  python3 - "$KV_JSON" "$CIDR" <<'PY'
import json
import sys

doc = json.loads(sys.argv[1])
cidr = sys.argv[2]

ip_allow = doc.get("ipAllowList")
if not isinstance(ip_allow, list):
    ip_allow = []

normalized = []
seen = set()
for item in ip_allow:
    if not isinstance(item, dict):
        continue
    cidr_block = str(item.get("cidrBlock") or item.get("source") or "").strip()
    if not cidr_block or cidr_block in seen:
        continue
    seen.add(cidr_block)
    normalized.append(
        {
            "cidrBlock": cidr_block,
            "description": str(item.get("description") or "").strip() or "manual",
        }
    )

if cidr not in seen:
    normalized.append(
        {
            "cidrBlock": cidr,
            "description": "auto-local-worker",
        }
    )
    changed = True
else:
    changed = False

print(json.dumps({"changed": changed, "ipAllowList": normalized}, separators=(",", ":")))
PY
)"

CHANGED="$(python3 - "$PATCH_BODY" <<'PY'
import json
import sys
print("1" if json.loads(sys.argv[1]).get("changed") else "0")
PY
)"

if [ "$CHANGED" = "0" ]; then
  echo "Render allowlist already contains ${CIDR}."
  exit 0
fi

UPDATE_PAYLOAD="$(
  python3 - "$PATCH_BODY" <<'PY'
import json
import sys
doc = json.loads(sys.argv[1])
print(json.dumps({"ipAllowList": doc.get("ipAllowList", [])}, separators=(",", ":")))
PY
)"

curl -fsS -X PATCH \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  "${API_BASE}/key-value/${RENDER_KEYVALUE_ID}" \
  -d "$UPDATE_PAYLOAD" >/dev/null

echo "Render allowlist updated with ${CIDR}."
