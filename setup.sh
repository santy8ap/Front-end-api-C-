#!/bin/bash

# ===========================================
# MULTIDB ACADEMY - SETUP SCRIPT
# ===========================================

echo "🚀 MultiDB Academy - Setup Script"
echo "=================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ===========================================
# 1. VERIFICAR NODE.JS
# ===========================================

echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "Por favor instala Node.js desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js instalado: $NODE_VERSION${NC}"

# ===========================================
# 2. VERIFICAR NPM
# ===========================================

echo ""
echo "📦 Verificando npm..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm instalado: $NPM_VERSION${NC}"

# ===========================================
# 3. CREAR ARCHIVO .env.local
# ===========================================

echo ""
echo "⚙️ Configurando variables de entorno..."
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✅ Archivo .env.local creado${NC}"
        echo -e "${YELLOW}⚠️ Edita .env.local con tu configuración${NC}"
    else
        echo -e "${YELLOW}⚠️ No se encontró .env.example${NC}"
        echo "Creando .env.local con configuración por defecto..."
        cat > .env.local << EOF
# MULTIDB ACADEMY - FRONTEND CONFIGURATION
NEXT_PUBLIC_API_URL=http://localhost:5245/api
PORT=3000
EOF
        echo -e "${GREEN}✅ Archivo .env.local creado con valores por defecto${NC}"
    fi
else
    echo -e "${BLUE}ℹ️ .env.local ya existe${NC}"
fi

# ===========================================
# 4. INSTALAR DEPENDENCIAS
# ===========================================

echo ""
echo "📚 Instalando dependencias..."
echo "Esto puede tomar unos minutos..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"
else
    echo ""
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi

# ===========================================
# 5. VERIFICAR BACKEND
# ===========================================

echo ""
echo "🔍 Verificando conexión con el backend..."

# Leer URL del backend desde .env.local
BACKEND_URL=$(grep NEXT_PUBLIC_API_URL .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'")
if [ -z "$BACKEND_URL" ]; then
    BACKEND_URL="http://localhost:5245/api"
fi

# Remover /api del final para hacer la prueba
BASE_URL=$(echo $BACKEND_URL | sed 's/\/api$//')

echo "Probando conexión a: $BASE_URL"

if command -v curl &> /dev/null; then
    if curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" | grep -q "200\|404\|401"; then
        echo -e "${GREEN}✅ Backend responde en $BASE_URL${NC}"
    else
        echo -e "${YELLOW}⚠️ No se puede conectar al backend en $BASE_URL${NC}"
        echo "Asegúrate de que el backend esté corriendo antes de continuar"
    fi
else
    echo -e "${YELLOW}⚠️ curl no disponible, saltando verificación del backend${NC}"
fi

# ===========================================
# 6. CREAR SCRIPT DE INICIO
# ===========================================

echo ""
echo "📝 Creando scripts auxiliares..."

# Script para verificar backend
cat > check-backend.sh << 'EOF'
#!/bin/bash
BACKEND_URL=$(grep NEXT_PUBLIC_API_URL .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'")
BASE_URL=$(echo $BACKEND_URL | sed 's/\/api$//')
echo "Verificando backend en: $BASE_URL"
curl -s $BASE_URL && echo "✅ Backend OK" || echo "❌ Backend no responde"
EOF

chmod +x check-backend.sh
echo -e "${GREEN}✅ Script check-backend.sh creado${NC}"

# ===========================================
# 7. RESUMEN FINAL
# ===========================================

echo ""
echo "=================================="
echo "🎉 SETUP COMPLETADO"
echo "=================================="
echo ""
echo "📋 Resumen:"
echo -e "   ✅ Node.js: $NODE_VERSION"
echo -e "   ✅ npm: $NPM_VERSION"
echo -e "   ✅ Dependencias instaladas"
echo -e "   ✅ Archivo .env.local configurado"
echo ""
echo "🚀 Próximos pasos:"
echo ""
echo "1. Verifica que el backend esté corriendo:"
echo -e "   ${BLUE}./check-backend.sh${NC}"
echo ""
echo "2. Edita .env.local si es necesario:"
echo -e "   ${BLUE}nano .env.local${NC}"
echo ""
echo "3. Inicia el servidor de desarrollo:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo "4. Abre tu navegador en:"
echo -e "   ${BLUE}http://localhost:3000${NC}"
echo ""
echo "📚 Credenciales de demo:"
echo "   Admin:      admin@test.com / 123456"
echo "   Profesor:   teacher@test.com / 123456"
echo "   Estudiante: estudiante@test.com / 123456"
echo ""
echo "=================================="
echo ""