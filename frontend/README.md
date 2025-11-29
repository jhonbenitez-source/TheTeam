# TheTeam Frontend - React + Firebase + TypeScript

Frontend moderno y profesional para el Gestor Polideportivo TheTeam, construido con React 18, TypeScript, Tailwind CSS y Firebase/Firestore.

## 🎯 Características Principales

### 📊 Dashboard
- Panel general con tabla de posiciones
- Selector de torneos
- Estadísticas en tiempo real

### 🏆 Gestión de Torneos
- Crear/editar/eliminar torneos
- Seleccionar deportes (Fútbol, Voleibol, Patinaje)
- Seleccionar categorías de edad
- Asignar equipos participantes
- Tipos de torneo (Liga, Copa, Torneo Relámpago, Cuadrangular, Amistoso)

### 🛡️ Gestión de Equipos
- CRUD completo de equipos
- Upload de escudos/logos
- Cuerpo técnico (múltiples entrenadores)
- Gestión dinámica de categorías por entrenador
- Vista detallada de jugadores por categoría

### 👥 Gestión de Jugadores
- Registro de jugadores con datos personales
- Categorización automática por edad (Sub-5 hasta Sénior)
- Cálculo automático de edad
- Validación de documento único (evita fraudes)
- Transferencias entre equipos
- Búsqueda y filtros avanzados
- Estado: Activo/Inactivo (baja lógica)

### ⚽ Gestión de Partidos
- Programación de partidos
- Registro de marcadores
- Estados: Programado, En Progreso, Finalizado
- Cálculo automático de puntos (3-1-0)
- Actualización automática de tabla de posiciones

### 🎫 Carnets Profesionales
- Generación de carnets de jugador
- Foto + datos del jugador
- Escudo del equipo
- Filtros por equipo y torneo
- Búsqueda individual
- Impresión optimizada

## 🚀 Instalación

### Requisitos Previos
- Node.js 16+ 
- npm o yarn
- Firebase (proyecto configurado)

### Pasos de Instalación

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Agregar credenciales de Firebase en .env.local
# REACT_APP_FIREBASE_API_KEY=...
# REACT_APP_FIREBASE_AUTH_DOMAIN=...
# etc.

# Ejecutar en desarrollo
npm start

# Build para producción
npm run build
```

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "firebase": "^10.7.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.1.3"
}
```

## 🔧 Configuración Firebase

### 1. Crear Proyecto en Firebase Console
```
https://console.firebase.google.com/
```

### 2. Habilitar Firestore
- Ir a Firestore Database
- Crear base de datos en modo desarrollo (o producción con reglas)

### 3. Configurar Autenticación
- Habilitar "Anónimo" en Authentication

### 4. Obtener Credenciales
- Ir a Project Settings
- Copiar Firebase Config

### 5. Configurar .env.local
```
REACT_APP_FIREBASE_API_KEY=AIza...
REACT_APP_FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=proyecto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123...
REACT_APP_FIREBASE_APP_ID=1:123:web:abc...
```

## 🎨 Estructura de Carpetas

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx              # Componente principal (todo en uno)
│   ├── index.tsx            # Entry point
│   ├── index.css            # Estilos globales
│   ├── App.css              # Estilos de App
│   ├── pages/               # Páginas (para modularización futura)
│   ├── components/          # Componentes reutilizables
│   ├── services/            # Servicios API
│   └── types/               # Tipos TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## 💾 Estructura de Datos Firebase

```
artifacts/
└── {appId}/
    └── public/
        └── data/
            ├── players/       # Jugadores
            ├── teams/         # Equipos
            ├── tournaments/   # Torneos
            └── matches/       # Partidos
```

## 🎮 Guía de Uso

### Crear un Torneo
1. Ir a "Torneos"
2. Llenar formulario (nombre, tipo, deporte)
3. Seleccionar categorías
4. Seleccionar equipos participantes
5. Crear

### Registrar Jugador
1. Ir a "Jugadores"
2. Llenar datos personales
3. Seleccionar equipo (opcional)
4. Guardar

### Generar Carnets
1. Ir a "Carnets"
2. Seleccionar equipo (opcional)
3. Buscar jugador (opcional)
4. Imprimir

## 🔐 Seguridad

- ✅ Validación de documento único
- ✅ Baja lógica (datos nunca se pierden)
- ✅ Autenticación anónima de Firebase
- ✅ Reglas de Firestore (configurar según necesidad)

## 🎯 Características Destacadas

- 🎨 Diseño responsive y moderno con Tailwind CSS
- 📱 Interfaz mobile-friendly
- 🔄 Actualizaciones en tiempo real con Firestore
- 📊 Cálculos automáticos (edad, puntos, tabla)
- 🎫 Generación de carnets profesionales
- 🖨️ Impresión optimizada
- 🌈 Colores por categoría de edad
- ⚡ Rendimiento optimizado

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
```bash
npm run build
# Subir carpeta 'build' a Netlify
```

## 📝 Variables de Entorno

```
REACT_APP_FIREBASE_API_KEY       # API Key de Firebase
REACT_APP_FIREBASE_AUTH_DOMAIN   # Auth Domain
REACT_APP_FIREBASE_PROJECT_ID    # Project ID
REACT_APP_FIREBASE_STORAGE_BUCKET # Storage Bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID # Sender ID
REACT_APP_FIREBASE_APP_ID        # App ID
```

## 🐛 Troubleshooting

### Error: "Could not find a declaration file for module 'firebase'"
```bash
npm install --save-dev @types/firebase
```

### Error: "Firestore not configured"
- Verificar que Firebase esté iniciado en App.tsx
- Verificar credenciales en .env.local

### Error: "No permission to read/write"
- Ir a Firestore Rules
- Configurar según necesidad (desarrollo: allow read, write)

## 📚 Documentación Adicional

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 👨‍💻 Desarrollo

### Scripts Disponibles
```bash
npm start       # Iniciar en desarrollo
npm run build   # Build para producción
npm test        # Ejecutar tests
npm run eject   # Eject de create-react-app
```

## 📄 Licencia

MIT © PortoSoft 2025

## 🤝 Soporte

Para soporte, contacta a: soporte@portosoft.com
