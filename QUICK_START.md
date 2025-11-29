# 🚀 GUÍA DE INICIO RÁPIDO - TheTeam

## ⚡ Inicio en 5 minutos

### Opción 1: Docker (RECOMENDADO - Lo más fácil)

```bash
# Solo 2 comandos!
cd /workspaces/TheTeam
docker-compose up
```

**Listo!** Abre tu navegador:
- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:5000/api
- 📊 Base de Datos: localhost:27017

### Opción 2: Manual (Requiere Node.js + MongoDB)

**Terminal 1 - Backend:**
```bash
cd /workspaces/TheTeam/backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /workspaces/TheTeam/frontend
npm install
npm start
```

---

## 📋 Flujo de Uso Típico

### 1️⃣ Crear Equipos
1. Ir a **"Equipos"** en el menú lateral
2. Clic en **"+ Nuevo Equipo"**
3. Llenar: Nombre, Deporte, Dirección
4. **Guardar**
5. (Opcional) Agregar entrenadores

### 2️⃣ Registrar Jugadores
1. Ir a **"Jugadores"**
2. Clic en **"+ Nuevo Jugador"**
3. Llenar datos (IMPORTANTE: Documento único)
4. Seleccionar equipo
5. **Guardar** - La categoría se calcula automáticamente

### 3️⃣ Crear Torneo
1. Ir a **"Torneos"**
2. Clic en **"+ Nuevo Torneo"**
3. Nombre, Deporte, Tipo
4. Seleccionar categorías (ej: Sub-10, Sub-12)
5. Seleccionar equipos que participan
6. **Guardar**

### 4️⃣ Programar Partidos
1. Ir a **"Partidos"**
2. Seleccionar torneo
3. Clic en **"+ Programar Partido"**
4. Seleccionar categoría, equipos y fecha
5. **Guardar**

### 5️⃣ Registrar Resultados
1. Ir a **"Partidos"**
2. Clic en **"Editar"** en el partido
3. Ingresar marcador
4. Clic en **"Finalizar"** - Se actualiza automáticamente la tabla
5. ✅ Puntos calculados automáticamente

### 6️⃣ Generar Carnets
1. Ir a **"Carnets"**
2. Elegir filtro: Por Torneo, Por Equipo o Búsqueda
3. Seleccionar opción
4. Clic en **"Generar Carnets"**
5. Vista previa y **"Imprimir"**

---

## 🔍 Consejos Prácticos

### ✅ DO's (Recomendado)
- ✅ Registra el documento completo del jugador (previene fraudes)
- ✅ Usa la búsqueda de jugadores para encontrar rápido
- ✅ Genera carnets antes de grandes eventos
- ✅ Revisa la tabla después de finalizar partidos
- ✅ Agrupa jugadores por equipos

### ❌ DON'Ts (Evitar)
- ❌ No dejes documentos en blanco
- ❌ No borres equipos importantes (usa desactivar)
- ❌ No finalices partidos sin ingresar marcador
- ❌ No registres jugadores sin equipo (si es necesario)

---

## 🎨 Navegación Rápida

```
TheTeam
├── 🏠 Panel General (Dashboard)
│   └── Ver estadísticas y tabla general
├── 🏆 Equipos (Teams)
│   ├── Crear/Editar equipos
│   ├── Agregar entrenadores
│   └── Ver jugadores por categoría
├── 👥 Jugadores (Players)
│   ├── Registrar jugadores
│   ├── Transferencias
│   ├── Buscar/Filtrar
│   └── Gestionar bajas
├── 🎯 Torneos (Tournaments)
│   ├── Crear torneos
│   ├── Seleccionar categorías
│   └── Elegir participantes
├── ⚽ Partidos (Matches)
│   ├── Programar partidos
│   ├── Ingresar resultados
│   ├── Ver tabla de posiciones
│   └── Finalizar partidos
└── 🎫 Carnets (Cards)
    ├── Filtro por torneo
    ├── Filtro por equipo
    ├── Búsqueda individual
    └── Imprimir
```

---

## 🆘 Solución Rápida de Problemas

### ❌ "No puedo conectar a MongoDB"
**Solución:**
```bash
# Opción A: Usar Docker (recomendado)
docker-compose up

# Opción B: Instalar MongoDB localmente
brew install mongodb-community
brew services start mongodb-community
```

### ❌ "Puerto 3000 en uso"
**Solución:**
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ "Error al crear jugador - Documento duplicado"
**Solución:** Este documento ya existe. Es una medida de seguridad.

### ❌ "No aparecen jugadores en equipo"
**Solución:** Asigna jugadores a un equipo al registrarlos o edítalos después.

---

## 📊 Datos de Prueba Sugeridos

### Equipos
- Real Madrid CF - Fútbol - Madrid
- Barcelona FC - Fútbol - Barcelona
- Voleibol Colombia - Voleibol - Bogotá

### Categorías Automáticas
Basadas en fecha de nacimiento:
- Sub-8: Nacidos 2016-2017
- Sub-10: Nacidos 2014-2015
- Sub-12: Nacidos 2012-2013

### Torneos Típicos
- Copa Nacional - Liga - Fútbol (Sub-10, Sub-12)
- Campeonato Regional - Liga - Voleibol (Sub-14, Sub-16)
- Torneo Relámpago - Relámpago - Fútbol (Sub-12)

---

## 🎯 Próximos Pasos

1. **Familiarízate** con la interfaz explorando cada módulo
2. **Registra** algunos jugadores y equipos
3. **Crea** un torneo de prueba
4. **Programa** algunos partidos
5. **Ingresa** resultados y observa la tabla actualizar automáticamente
6. **Genera** carnets para impresión

---

## 📞 Soporte

**Documentación Completa:** Ver `README.md`  
**Instalación Detallada:** Ver `INSTALLATION.md`  
**Proyecto:** Ver `PROYECTO_COMPLETADO.md`

---

**¡Disfruta usando TheTeam!** 🎉

*Desarrollado por PortoSoft - Noviembre 2025*
