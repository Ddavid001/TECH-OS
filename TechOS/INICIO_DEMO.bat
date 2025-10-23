@echo off
echo ========================================
echo    TechOS - Sistema de Gestion Educativa
echo    Demo del Colegio El Alba
echo ========================================
echo.
echo Iniciando sistema de demos...
echo.

cd /d "%~dp0"

echo [1/2] Instalando dependencias del frontend...
call npm install

echo.
echo [2/2] Iniciando servidor de desarrollo...
echo.
echo ========================================
echo   Demo disponible en: http://localhost:5173
echo ========================================
echo.
echo Credenciales de demo:
echo   Director:   director@elalba.edu.ve / demo123
echo   Profesora:  prof.laura@elalba.edu.ve / demo123
echo   Estudiante: maria.gonzalez@estudiante.elalba.edu.ve / demo123
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

npm run dev

pause

