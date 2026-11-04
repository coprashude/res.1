@echo off
echo ========================================================
echo        Starting ProResume Web Application
echo ========================================================
set PATH=C:\Users\Sahyadri\AppData\Local\Programs\nodejs;%PATH%

start cmd /k "cd /d D:\res.1\resume-builder\server && npm start"
start cmd /k "cd /d D:\res.1\resume-builder\client && npm run dev"

echo Servers starting...
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000

