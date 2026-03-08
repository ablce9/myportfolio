#!/bin/bash
# Flickr URL Converter
# Converts Flickr photo URLs to the format used in this app
#
# Usage:
#   ./scripts/flickr-url.sh <flickr-url>
#   ./scripts/flickr-url.sh "https://www.flickr.com/photos/user/55133484743/"
#   ./scripts/flickr-url.sh "https://live.staticflickr.com/65535/55133484743_02a8e17961_b.jpg"
#
# Supported input formats:
#   - Flickr photo page: https://www.flickr.com/photos/USERNAME/PHOTO_ID/
#   - Static CDN URL: https://live.staticflickr.com/SERVER/PHOTO_ID_SECRET_SIZE.jpg
#   - Embed code: <img src="...">

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

URL="$1"

if [ -z "$URL" ]; then
  echo "Usage: $0 <flickr-url-or-embed-code>"
  echo ""
  echo "Examples:"
  echo "  $0 'https://live.staticflickr.com/65535/55133484743_02a8e17961_b.jpg'"
  echo "  $0 '<img src=\"https://live.staticflickr.com/65535/55133484743_9e9b3a4ec1_o.jpg\">'"
  exit 1
fi

# Extract URL from embed code if needed
if [[ "$URL" == *"<img"* ]] || [[ "$URL" == *"<a"* ]]; then
  # Extract img src from embed code (handle both <img> and full <a> embed)
  URL=$(echo "$URL" | grep -oE '<img[^>]+src="[^"]+"' | grep -oE 'src="[^"]+"' | head -1 | sed 's/src="//;s/"$//')

  if [ -z "$URL" ]; then
    echo "Could not extract image URL from embed code"
    exit 1
  fi
fi

# Parse the static Flickr URL
# Format: https://live.staticflickr.com/SERVER/PHOTOID_SECRET_SIZE.jpg
if [[ "$URL" =~ live\.staticflickr\.com/([0-9]+)/([0-9]+)_([a-z0-9]+)_([a-z0-9]+)\.(jpg|png|gif) ]]; then
  SERVER="${BASH_REMATCH[1]}"
  PHOTO_ID="${BASH_REMATCH[2]}"
  SECRET="${BASH_REMATCH[3]}"
  SIZE="${BASH_REMATCH[4]}"
  EXT="${BASH_REMATCH[5]}"

  BASE="https://live.staticflickr.com/${SERVER}/${PHOTO_ID}_${SECRET}"

  echo -e "${CYAN}Parsed Flickr URL:${NC}"
  echo -e "  Photo ID: ${GREEN}${PHOTO_ID}${NC}"
  echo -e "  Secret:   ${GREEN}${SECRET}${NC}"
  echo -e "  Size:     ${GREEN}${SIZE}${NC}"
  echo ""
  echo -e "${YELLOW}Generated URLs for content markdown:${NC}"
  echo ""
  echo -e "image: \"${BASE}_b.${EXT}\""
  echo -e "thumbnail: \"${BASE}_q.${EXT}\""

  # If original size was provided, show it
  if [[ "$SIZE" == "o" || "$SIZE" == "3k" || "$SIZE" == "6k" ]]; then
    echo -e "originalImage: \"${BASE}_${SIZE}.${EXT}\""
  else
    echo ""
    echo -e "${CYAN}Note: To get originalImage URL, use Flickr embed code with 'Original' size selected.${NC}"
    echo -e "${CYAN}The original size uses a different secret.${NC}"
  fi

  echo ""
  echo -e "${YELLOW}Size reference:${NC}"
  echo "  _q = 150x150 (thumbnail)"
  echo "  _b = 1024px (large)"
  echo "  _3k = 3072px"
  echo "  _o = original"

else
  echo "Could not parse URL: $URL"
  echo ""
  echo "Expected format: https://live.staticflickr.com/SERVER/PHOTOID_SECRET_SIZE.jpg"
  exit 1
fi
