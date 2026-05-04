#!/bin/bash
# Build script for Render
set -o errexit

echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt

echo "Building frontend..."
cd ../backend/admin-dashboard
npm install
npm run build

echo "Build complete!"
