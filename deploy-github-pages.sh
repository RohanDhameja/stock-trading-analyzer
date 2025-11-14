#!/bin/bash

echo "🚀 Deploying Frontend to GitHub Pages..."

# Build the React app
cd frontend
npm run build

# Create gh-pages branch if it doesn't exist
cd ..
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy build files to root
cp -r frontend/build/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# Go back to master
git checkout master

echo "✅ Deployed! Enable GitHub Pages in repository settings."
echo "👉 Go to: https://github.com/RohanDhameja/stock-trading-analyzer/settings/pages"
echo "👉 Select branch: gh-pages"
echo "👉 Select folder: / (root)"
echo "👉 Click Save"

