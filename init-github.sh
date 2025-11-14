#!/bin/bash

echo "🚀 Setting up Git and GitHub..."
echo ""

# Check if git is initialized
if [ -d ".git" ]; then
    echo "✅ Git already initialized"
else
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create first commit if no commits exist
if ! git rev-parse HEAD > /dev/null 2>&1; then
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: Stock Trading Strategy Analyzer Web App"
else
    echo "✅ Repository already has commits"
fi

echo ""
echo "✅ Git setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   👉 https://github.com/new"
echo ""
echo "2. Run these commands (replace YOUR_USERNAME with your GitHub username):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/stock-trading-analyzer.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy online (see GITHUB_SETUP.md for detailed instructions)"
echo ""
echo "📖 Full deployment guide: GITHUB_SETUP.md"
echo "📖 Deployment options: DEPLOYMENT.md"
echo ""

