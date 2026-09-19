#!/usr/bin/env bash
echo "==================================================="
echo "        CHRONOS 3D Smartwatch Launcher"
echo "==================================================="
echo ""

# 1. Verify Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in your PATH."
    echo "Please install Node.js (LTS version 18 or higher) from https://nodejs.org/"
    exit 1
fi

# 2. Check and auto-install dependencies if missing
if [ ! -d "node_modules" ]; then
    echo "[SETUP] First time launch detected: node_modules folder missing."
    echo "[SETUP] Installing required dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed. Please check your internet connection."
        exit 1
    fi
    echo "[SETUP] Dependencies installed successfully!"
    echo ""
fi

# 3. Launch development server
echo "[LAUNCH] Starting CHRONOS development server..."
echo "The application will open automatically in your browser."
npm run dev
