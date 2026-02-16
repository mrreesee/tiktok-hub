@echo off
echo AI AGENT TAKIMI - KURULUM BASLATILIYOR...
echo.
echo 1/2: Proxy bağımlılıkları yükleniyor...
cd proxy
call npm install
echo.
echo 2/2: Web arayüzü bağımlılıkları yükleniyor...
cd ../src
call npm install
echo.
echo KURULUM TAMAMLANDI! 
echo.
echo Simdi SISTEMI_BASLAT.bat dosyasina tiklayabilirsin.
pause
