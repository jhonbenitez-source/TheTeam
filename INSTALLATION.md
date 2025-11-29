# Guía de Instalación y Desarrollo

## Estructura del Proyecto

```
TheTeam/
├── backend/                 # API REST (Node.js + Express)
│   ├── src/
│   │   ├── models/         # Modelos MongoDB
│   │   ├── controllers/    # Controladores de lógica
│   │   ├── routes/         # Rutas de la API
│   │   ├── utils/          # Funciones utilitarias
│   │   └── server.ts       # Servidor principal
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/                # Interfaz de Usuario (React)
│   ├── src/
│   │   ├── pages/          # Páginas principales
│   │   ├── components/     # Componentes reutilizables
│   │   ├── services/       # Llamadas API
│   │   ├── types/          # Tipos TypeScript
│   │   └── App.tsx         # Aplicación principal
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
└── README.md
```

## Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone https://github.com/jhonbenitez-source/TheTeam.git
cd TheTeam
```

### 2. Instalar dependencias del Backend
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno (Backend)
```bash
cp .env.example .env
```

Editar `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/theteam
NODE_ENV=development
```

### 4. Instalar dependencias del Frontend
```bash
cd ../frontend
npm install
```

### 5. Crear archivo .env del Frontend
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## Ejecución del Proyecto

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Salida esperada:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
📍 API Documentation: http://localhost:5000/api
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## Compilación para Producción

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Los archivos compilados estarán en `frontend/build/`

## Configuración de MongoDB

### Opción 1: MongoDB Local
```bash
# Instalar MongoDB (Linux/Mac)
brew install mongodb-community

# Iniciar servicio
brew services start mongodb-community

# Verificar conexión
mongosh
```

### Opción 2: MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/theteam
```

## Estructura de Base de Datos

### Colecciones MongoDB

#### Teams
```javascript
{
  _id: ObjectId,
  name: String,           // Nombre único
  sport: String,          // Fútbol, Voleibol, Patinaje
  logo: String,           // URL del logo
  address: String,        // Dirección
  coaches: [{
    name: String,
    phone: String,
    category: String
  }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Players
```javascript
{
  _id: ObjectId,
  name: String,
  documentId: String,     // Único
  dateOfBirth: Date,
  category: String,       // Sub-8, Sub-10, etc.
  age: Number,            // Calculado automáticamente
  eps: String,
  phone: String,
  address: String,
  photo: String,          // URL o base64
  teamId: ObjectId,       // Referencia a Team
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Tournaments
```javascript
{
  _id: ObjectId,
  name: String,
  sport: String,          // Fútbol, Voleibol, Patinaje
  type: String,           // Liga, Copa, Relámpago, Otro
  categories: [String],   // [Sub-8, Sub-10]
  participatingTeams: [ObjectId],  // Referencias a Teams
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Matches
```javascript
{
  _id: ObjectId,
  tournamentId: ObjectId,
  category: String,
  homeTeamId: ObjectId,
  awayTeamId: ObjectId,
  homeScore: Number,
  awayScore: Number,
  status: String,         // Programado, En Progreso, Finalizado
  scheduledDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Standings
```javascript
{
  _id: ObjectId,
  tournamentId: ObjectId,
  category: String,
  teamId: ObjectId,
  played: Number,
  won: Number,
  drawn: Number,
  lost: Number,
  pointsFor: Number,
  pointsAgainst: Number,
  points: Number,         // 3*won + drawn
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints Principales

### Dashboard
```
GET /api/dashboard
Retorna: { players, teams, matches, tournaments }
```

### Jugadores
```
POST /api/players
Body: { name, documentId, dateOfBirth, eps, phone, address, photo?, teamId? }

GET /api/players?teamId=id&category=Sub-12&includeInactive=false

PATCH /api/players/:id/transfer
Body: { newTeamId }

PATCH /api/players/:id/deactivate
```

### Partidos
```
POST /api/matches
Body: { tournamentId, category, homeTeamId, awayTeamId, scheduledDate }

PUT /api/matches/:id/score
Body: { homeScore, awayScore }

PATCH /api/matches/:id/finalize
Calcula automáticamente puntos y actualiza standings
```

### Carnets
```
GET /api/cards/generate?tournamentId=id
GET /api/cards/generate?teamId=id
GET /api/cards/search?name=Juan
```

## Scripts disponibles

### Backend
```bash
npm run dev       # Desarrollo con ts-node
npm run build     # Compilar a JavaScript
npm start         # Ejecutar versión compilada
npm test          # Ejecutar tests
```

### Frontend
```bash
npm start         # Desarrollo (puerto 3000)
npm run build     # Compilar para producción
npm test          # Ejecutar tests
npm run eject     # Ejetar configuración (no reversible)
```

## Solución de Problemas

### Error: Cannot find module 'mongoose'
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Error: Port 5000 already in use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB connection refused
```bash
# Verificar que MongoDB está ejecutándose
# Linux/Mac
brew services list

# Iniciar MongoDB
mongod
```

### CORS errors
Asegurate de que el backend tiene CORS habilitado:
```typescript
app.use(cors());
```

## Variables de Entorno

### Backend (.env)
```
PORT=5000                                    # Puerto del servidor
MONGODB_URI=mongodb://localhost:27017/theteam
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Notas de Desarrollo

- Los cambios en el backend requieren reiniciar `npm run dev`
- Los cambios en el frontend se actualizan automáticamente
- Los tipos TypeScript se sincronizan entre frontend y backend
- Las contraseñas y tokens sensibles deben estar en `.env`

## Performance

- MongoDB usa índices en `documentId` y `tournamentId+category+teamId`
- Las tablas se calculan durante la finalización del partido
- Los carnets se generan bajo demanda

## Próximas Mejoras

- [ ] Autenticación y autorización
- [ ] Cargas masivas de jugadores (CSV/Excel)
- [ ] Gráficos y estadísticas avanzadas
- [ ] Notificaciones en tiempo real
- [ ] Aplicación móvil
- [ ] Integración con redes sociales

---

Para más información, contacta a PortoSoft
