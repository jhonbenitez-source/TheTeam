#!/bin/bash

# 🚀 SCRIPT DE INICIO RÁPIDO - TheTeam

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        🎉 THETEAM - GESTOR POLIDEPORTIVO v1.0.0              ║"
echo "║              Script de Inicio Rápido                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio base
BASE_DIR="/workspaces/TheTeam"

echo -e "${BLUE}📍 Directorio base: $BASE_DIR${NC}"
echo ""

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar requisitos
echo -e "${YELLOW}🔍 Verificando requisitos...${NC}"
echo ""

if command_exists node; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js instalado: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "   Descárgalo de: https://nodejs.org/"
    exit 1
fi

if command_exists npm; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm instalado: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

if command_exists docker; then
    DOCKER_VERSION=$(docker -v)
    echo -e "${GREEN}✅ Docker instalado${NC}"
else
    echo -e "${YELLOW}⚠️  Docker no está instalado (opcional)${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 OPCIONES DE INICIO${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "1️⃣  Backend + MongoDB + Frontend Completo (Docker)"
echo "2️⃣  Solo Frontend React (npm)"
echo "3️⃣  Solo Backend Node.js"
echo "4️⃣  Ver documentación"
echo "5️⃣  Salir"
echo ""

read -p "Selecciona una opción (1-5): " OPTION

case $OPTION in
    1)
        echo ""
        echo -e "${BLUE}🐳 Iniciando con Docker Compose...${NC}"
        echo ""
        cd "$BASE_DIR"
        
        if command_exists docker-compose; then
            echo -e "${YELLOW}📦 Construyendo contenedores...${NC}"
            docker-compose up --build
        else
            echo -e "${RED}❌ Docker Compose no está instalado${NC}"
            exit 1
        fi
        ;;
        
    2)
        echo ""
        echo -e "${BLUE}⚛️  Iniciando Frontend React...${NC}"
        echo ""
        cd "$BASE_DIR/frontend"
        
        echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
        npm install
        
        echo ""
        echo -e "${GREEN}✅ Dependencias instaladas${NC}"
        echo ""
        echo -e "${YELLOW}🚀 Iniciando servidor de desarrollo...${NC}"
        echo ""
        echo -e "${GREEN}Frontend estará disponible en:${NC}"
        echo -e "   ${BLUE}http://localhost:3000${NC}"
        echo ""
        npm start
        ;;
        
    3)
        echo ""
        echo -e "${BLUE}🔧 Iniciando Backend Node.js...${NC}"
        echo ""
        cd "$BASE_DIR/backend"
        
        echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
        npm install
        
        echo ""
        echo -e "${YELLOW}🏗️  Compilando TypeScript...${NC}"
        npm run build
        
        echo ""
        echo -e "${GREEN}✅ Backend compilado${NC}"
        echo ""
        echo -e "${YELLOW}🚀 Iniciando servidor...${NC}"
        echo ""
        echo -e "${GREEN}Backend estará disponible en:${NC}"
        echo -e "   ${BLUE}http://localhost:5000${NC}"
        echo ""
        npm start
        ;;
        
    4)
        echo ""
        echo -e "${BLUE}📚 Documentación disponible:${NC}"
        echo ""
        echo "1. README.md - Documentación principal"
        echo "2. INSTALLATION.md - Instalación detallada"
        echo "3. QUICK_START.md - Inicio rápido"
        echo "4. PROYECTO_COMPLETADO.md - Resumen del proyecto"
        echo "5. frontend/README.md - Documentación del frontend"
        echo "6. frontend/QUICK_START_FRONTEND.md - Guía rápida frontend"
        echo ""
        read -p "¿Ver qué archivo? (ingresa el nombre o número): " DOC
        
        if [ -f "$BASE_DIR/$DOC" ]; then
            cat "$BASE_DIR/$DOC" | less
        elif [ -f "$BASE_DIR/$DOC.md" ]; then
            cat "$BASE_DIR/$DOC.md" | less
        else
            echo -e "${RED}Archivo no encontrado${NC}"
        fi
        ;;
        
    5)
        echo -e "${YELLOW}👋 ¡Hasta luego!${NC}"
        exit 0
        ;;
        
    *)
        echo -e "${RED}❌ Opción no válida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ ¡TheTeam está en ejecución!                             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
