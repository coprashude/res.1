@echo off
title ProResume Local Host Server
echo ========================================================
echo        Starting ProResume Local Host Server
echo ========================================================
set PATH=C:\Users\Sahyadri\AppData\Local\Programs\nodejs;%PATH%

cd /d D:\res.1\resume-builder\server
start cmd /k "node src/index.js"

echo.
echo ========================================================
echo   ProResume is hosted locally!
echo   Local URL:    http://localhost:5000
echo   Network URL:  http://192.168.8.134:5000
echo ========================================================
echo.
start chrome http://localhost:5000
