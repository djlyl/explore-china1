#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Cleaning previous build..."
rm -rf .next

echo "Building the project..."
npx next build

echo "Creating .nojekyll file..."
mkdir -p out
echo "" > out/.nojekyll

echo "Build completed successfully!"