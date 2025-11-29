# 🚀 Guía Rápida - Frontend TheTeam

## ⚡ Inicio Rápido (5 minutos)

### Opción 1: Con Firebase (Recomendado)

```bash
cd /workspaces/TheTeam/frontend

# 1. Instalar dependencias
npm install

# 2. Configurar Firebase
# Crear archivo .env.local y agregar credenciales:
# REACT_APP_FIREBASE_API_KEY=AIza...
# REACT_APP_FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com
# REACT_APP_FIREBASE_PROJECT_ID=proyecto-id
# etc...

# 3. Ejecutar en desarrollo
npm start

# El frontend abrirá en http://localhost:3000
```

### Opción 2: Sin Firebase (Modo Demo)

```bash
cd /workspaces/TheTeam/frontend

# Ejecutar sin .env.local (usa valores por defecto)
npm start

# Nota: Los datos no se guardarán, es solo para demostración
```

## 🎯 URL y Acceso

- **Frontend React**: http://localhost:3000
- **Backend API**: http://localhost:5000/api (si está en ejecución)
- **Landing Page**: http://localhost:3000/landing.html

## 📦 Instalación de Dependencias

Si necesitas reinstalar dependencias:

```bash
# Limpiar cache
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Instalar Firebase específicamente
npm install firebase
```

## 🔧 Resolver Errores Comunes

### Error: "npm command not found"
```bash
# Verificar Node.js
node --version

# Reinstalar npm si es necesario
npm install -g npm@latest
```

### Error: "Module not found: firebase"
```bash
npm install firebase --save
```

### Error: "Port 3000 already in use"
```bash
# Usar otro puerto
PORT=3001 npm start
```

## 📂 Estructura del Proyecto

```
frontend/
├── src/
│   ├── App.tsx           # Aplicación principal (TODO en uno)
│   ├── index.tsx         # Entry point
│   ├── index.css         # Estilos
│   ├── App.css           # Estilos de componentes
│   └── ...
├── public/
│   └── index.html
├── package.json          # Dependencias
├── .env.example          # Template de variables
└── README.md             # Documentación completa
```

## 🎨 Interfaz Disponible

Una vez que el frontend esté corriendo, tendrás acceso a:

- **Sidebar Izquierdo**: Navegación entre módulos
- **Dashboard**: Vista general
- **Torneos**: Crear/editar torneos
- **Equipos**: Gestionar equipos
- **Jugadores**: Registrar jugadores
- **Partidos**: Gestionar partidos (en desarrollo)
- **Carnets**: Generar ID cards profesionales

## 🔐 Configuración Firebase (Paso a Paso)

### 1. Crear Proyecto
- Ir a https://console.firebase.google.com/
- Crear nuevo proyecto
- Nombre: "TheTeam"

### 2. Habilitar Servicios
- Firestore Database → Crear
- Authentication → Habilitar "Anónimo"

### 3. Obtener Credenciales
```
Project Settings → 
Config → 
Copiar el objeto firebaseConfig
```

### 4. Crear .env.local
```bash
cp .env.example .env.local

# Editar y agregar credenciales
nano .env.local
```

### 5. Guardar y Ejecutar
```bash
npm start
```

## 📊 Categorías de Edad Automáticas

El sistema calcula automáticamente:
- Sub-5, Sub-6, ..., Sub-20
- Sénior (21 años o más)

Cada categoría tiene un color diferente para fácil identificación.

## 💾 Almacenamiento de Datos

Con Firebase, los datos se guardan en:
```
Firestore → artifacts → {appId} → public → data
```

Colecciones:
- `players` - Jugadores
- `teams` - Equipos
- `tournaments` - Torneos
- `matches` - Partidos

## 🎫 Generar Carnets

1. Ir a "Carnets"
2. Seleccionar equipo (opcional)
3. Buscar jugador (opcional)
4. Hacer clic en "Imprimir"
5. Los carnets se abren en vista previa de impresión

## 📱 Responsive Design

La interfaz es completamente responsive:
- ✅ Desktop (1920px)
- ✅ Tablet (768px)
- ✅ Mobile (320px)

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que Node.js esté instalado
2. Verifica que las dependencias estén instaladas
3. Limpia el cache: `rm -rf node_modules && npm install`
4. Verifica que el puerto 3000 esté libre
5. Revisa la consola del navegador (F12) para errores

## 🚀 Próximos Pasos

1. Instalar dependencias: `npm install`
2. Configurar Firebase en `.env.local`
3. Ejecutar: `npm start`
4. Acceder a http://localhost:3000
5. ¡Comenzar a usar TheTeam!

---

**¿Necesitas ayuda?** Revisa el README.md completo en `/frontend/README.md`
