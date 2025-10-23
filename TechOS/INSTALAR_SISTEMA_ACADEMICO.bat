@echo off
echo ============================================
echo  INSTALACION SISTEMA ACADEMICO TECHOS
echo ============================================
echo.

echo [1/4] Instalando dependencias del BACKEND...
cd server
call npm install
echo.

echo [2/4] Generando cliente de Prisma...
call npm run prisma:generate
echo.

echo [3/4] Instalando dependencias del FRONTEND...
cd ..
call npm install
echo.

echo [4/4] Instalacion completada!
echo.
echo ============================================
echo  PROXIMOS PASOS:
echo ============================================
echo.
echo 1. Configurar archivo .env en server/
echo    DATABASE_URL="postgresql://user:password@localhost:5432/techos"
echo    PORT=4000
echo.
echo 2. Configurar archivo .env en raiz de TechOS/
echo    VITE_API_URL=http://localhost:4000
echo.
echo 3. Ejecutar migraciones de base de datos:
echo    cd server
echo    npm run prisma:migrate
echo.
echo 4. Iniciar el backend:
echo    cd server
echo    npm run start:dev
echo.
echo 5. Iniciar el frontend (en otra terminal):
echo    cd TechOS
echo    npm run dev
echo.
echo ============================================
echo  RUTAS DISPONIBLES:
echo ============================================
echo.
echo   /calendar   - Calendario unificado
echo   /materials  - Repositorio de materiales
echo   /gradebook  - Libro de calificaciones
echo   /grades     - Vista de estudiante
echo.
echo ============================================
pause

