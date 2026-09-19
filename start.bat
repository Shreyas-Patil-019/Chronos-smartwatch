@echo off
title CHRONOS 3D Smartwatch Launcher
echo ===================================================
echo         CHRONOS 3D Smartwatch Launcher
echo ===================================================
echo.

:: 1. Verify Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in your PATH.
    echo Please install Node.js (LTS version 18 or higher) from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 2. Check and auto-install dependencies if missing
if not exist "node_modules\" (
    echo [SETUP] First time launch detected: node_modules folder missing.
    echo [SETUP] Installing required dependencies (Vite, React, Three.js, Tailwind)...
    echo This may take 30 to 60 seconds. Please wait...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        echo Please check your internet connection and try running 'npm install' manually.
        pause
        exit /b 1
    )
    echo.
    echo [SETUP] Dependencies installed successfully!
    echo.
)

:: 3. Launch the development server
echo [LAUNCH] Starting CHRONOS local server...
echo The application will automatically open in your default browser.
echo Press Ctrl+C in this terminal window whenever you wish to stop the server.
echo.
call npm run dev
