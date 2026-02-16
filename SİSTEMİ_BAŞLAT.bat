@echo off
echo AI AGENT TAKIMI - SISTEM CALISTIRILIYOR...
echo.
echo [1] Proxy Sunucusu baslatiliyor (TikTok Baglantisi)...
start cmd /k "cd proxy && node index.js"
echo.
echo [2] Web Arayüzü baslatiliyor...
cd src
start cmd /k "npm run dev"
echo.
echo SISTEM HAZIR! 
echo.
echo Internet tarayicin otomatik acilmadiysa http://localhost:5173 adresine gidebilirsin.
echo.
pause
