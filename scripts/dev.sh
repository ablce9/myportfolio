#!/bin/bash
# Local development server for Shun's World
# Usage: ./scripts/dev.sh

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting local development server...${NC}"

# Load nvm and start dev server
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo -e "${GREEN}✓ Node version: $(node --version)${NC}"
echo -e "${GREEN}✓ npm version: $(npm --version)${NC}"
echo ""

npm run dev -- -H 0.0.0.0
