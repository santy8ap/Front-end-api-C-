# ===========================================
# MULTIDB ACADEMY - SETUP SCRIPT (Windows)
# ===========================================

Write-Host "🚀 MultiDB Academy - Setup Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# ===========================================
# 1. VERIFICAR NODE.JS
# ===========================================

Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow

try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# ===========================================
# 2. VERIFICAR NPM
# ===========================================

Write-Host ""
Write-Host "📦 Verificando npm..." -ForegroundColor Yellow

try {
    $npmVersion = npm --version
    Write-Host "✅ npm instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no está instalado" -ForegroundColor Red
    exit 1
}

# ===========================================
# 3. CREAR ARCHIVO .env.local
# ===========================================

Write-Host ""
Write-Host "⚙️ Configurando variables de entorno..." -ForegroundColor Yellow

if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✅ Archivo .env.local creado" -ForegroundColor Green
        Write-Host "⚠️ Edita .env.local con tu configuración" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️ No se encontró .env.example" -ForegroundColor Yellow
        Write-Host "Creando .env.local con configuración por defecto..." -ForegroundColor Yellow
        
        $envContent = @"
# MULTIDB ACADEMY - FRONTEND CONFIGURATION
NEXT_PUBLIC_API_URL=http://localhost:5245/api
PORT=3000
"@
        $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host "✅ Archivo .env.local creado con valores por defecto" -ForegroundColor Green
    }
} else {
    Write-Host "ℹ️ .env.local ya existe" -ForegroundColor Blue
}

# ===========================================
# 4. INSTALAR DEPENDENCIAS
# ===========================================

Write-Host ""
Write-Host "📚 Instalando dependencias..." -ForegroundColor Yellow
Write-Host "Esto puede tomar unos minutos..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
    exit 1
}

# ===========================================
# 5. VERIFICAR BACKEND
# ===========================================

Write-Host ""
Write-Host "🔍 Verificando conexión con el backend..." -ForegroundColor Yellow

# Leer URL del backend desde .env.local
$envContent = Get-Content ".env.local" -Raw
if ($envContent -match 'NEXT_PUBLIC_API_URL=(.+)') {
    $backendUrl = $matches[1].Trim().Trim('"').Trim("'")
    $baseUrl = $backendUrl -replace '/api$', ''
    
    Write-Host "Probando conexión a: $baseUrl" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $baseUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction SilentlyContinue
        Write-Host "✅ Backend responde en $baseUrl" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ No se puede conectar al backend en $baseUrl" -ForegroundColor Yellow
        Write-Host "Asegúrate de que el backend esté corriendo antes de continuar" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ No se pudo leer NEXT_PUBLIC_API_URL de .env.local" -ForegroundColor Yellow
}

# ===========================================
# 6. CREAR SCRIPT DE VERIFICACIÓN
# ===========================================

Write-Host ""
Write-Host "📝 Creando scripts auxiliares..." -ForegroundColor Yellow

$checkBackendScript = @"
# Script para verificar backend
`$envContent = Get-Content ".env.local" -Raw
if (`$envContent -match 'NEXT_PUBLIC_API_URL=(.+)') {
    `$backendUrl = `$matches[1].Trim().Trim('"').Trim("'")
    `$baseUrl = `$backendUrl -replace '/api$', ''
    
    Write-Host "Verificando backend en: `$baseUrl" -ForegroundColor Yellow
    
    try {
        `$response = Invoke-WebRequest -Uri `$baseUrl -UseBasicParsing -TimeoutSec 5
        Write-Host "✅ Backend OK" -ForegroundColor Green
    } catch {
        Write-Host "❌ Backend no responde" -ForegroundColor Red
    }
}
"@

$checkBackendScript | Out-File -FilePath "check-backend.ps1" -Encoding UTF8
Write-Host "✅ Script check-backend.ps1 creado" -ForegroundColor Green

# ===========================================
# 7. RESUMEN FINAL
# ===========================================

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🎉 SETUP COMPLETADO" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Resumen:" -ForegroundColor Yellow
Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "   ✅ npm: $npmVersion" -ForegroundColor Green
Write-Host "   ✅ Dependencias instaladas" -ForegroundColor Green
Write-Host "   ✅ Archivo .env.local configurado" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verifica que el backend esté corriendo:" -ForegroundColor White
Write-Host "   .\check-backend.ps1" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Edita .env.local si es necesario:" -ForegroundColor White
Write-Host "   notepad .env.local" -ForegroundColor Blue
Write-Host ""
Write-Host "3. Inicia el servidor de desarrollo:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Blue
Write-Host ""
Write-Host "4. Abre tu navegador en:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Blue
Write-Host ""
Write-Host "📚 Credenciales de demo:" -ForegroundColor Yellow
Write-Host "   Admin:      admin@test.com / 123456" -ForegroundColor White
Write-Host "   Profesor:   teacher@test.com / 123456" -ForegroundColor White
Write-Host "   Estudiante: estudiante@test.com / 123456" -ForegroundColor White
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""