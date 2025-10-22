@echo off
cd /d "%~dp0"
echo VITE_SUPABASE_URL=https://jpqltnyuexzkzkdksifp.supabase.co > .env
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcWx0bnl1ZXh6a3prZGtzaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzE1NjEsImV4cCI6MjA3NjU0NzU2MX0.C4Dn2fiYGypNTT_Y13fPbIT7nUP_zwOwpQ30LS1UcCM >> .env
echo.
echo ✅ Archivo .env creado exitosamente!
echo.
echo Ahora ejecuta: npm run dev
echo.
pause


