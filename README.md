# 🎓 MultiDB Academy - Frontend

Sistema de gestión de bases de datos académicas con soporte para MySQL, PostgreSQL, MongoDB y SQL Server.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Arquitectura](#arquitectura)
- [Endpoints Consumidos](#endpoints-consumidos)
- [Credenciales de Demo](#credenciales-de-demo)
- [Troubleshooting](#troubleshooting)

## ✨ Características

- 🔐 **Autenticación JWT** - Login y registro seguro
- 👥 **Multi-Rol** - Admin, Teacher y Student
- 💾 **Multi-Base de Datos** - MySQL, PostgreSQL, MongoDB, SQL Server
- ⚡ **Ejecución en Tiempo Real** - Ejecuta queries SQL instantáneamente
- 📊 **Dashboard Interactivo** - Visualización de datos y métricas
- 🎨 **UI Moderna** - Diseño con Tailwind CSS y Framer Motion
- 📱 **Responsive** - Funciona en todos los dispositivos

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **npm** o **yarn** o **pnpm**
- **Backend API** corriendo en `http://localhost:5245` (o tu URL personalizada)

### Verificar Instalación

```bash
node --version  # Debe ser v18 o superior
npm --version   # Debe ser v8 o superior
```

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd front-api-pablo
```

### 2. Instalar Dependencias

Elige uno de los siguientes comandos según tu gestor de paquetes:

```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tu configuración:

```env
# URL del Backend API
NEXT_PUBLIC_API_URL=http://localhost:5245/api

# Opcional: Puerto del frontend (por defecto 3000)
PORT=3000
```

## ⚙️ Configuración

### Estructura de `.env.local`

```env
# ===========================================
# CONFIGURACIÓN DE LA API BACKEND
# ===========================================

# URL base de tu API backend
# Desarrollo local:
NEXT_PUBLIC_API_URL=http://localhost:5245/api

# Producción (ejemplo):
# NEXT_PUBLIC_API_URL=https://api.tudominio.com/api

# ===========================================
# CONFIGURACIÓN DEL SERVIDOR NEXT.JS
# ===========================================

# Puerto donde correrá el frontend (opcional)
# Por defecto Next.js usa el puerto 3000
PORT=3000
```

### Verificar Backend

Asegúrate de que tu backend esté corriendo antes de iniciar el frontend:

```bash
# Prueba que el backend responda
curl http://localhost:5245/api/health
# o visita en el navegador: http://localhost:5245/api/health
```

## 🏃‍♂️ Ejecución

### Modo Desarrollo

```bash
# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Modo Producción

```bash
# 1. Construir la aplicación
npm run build

# 2. Iniciar el servidor de producción
npm start
```

### Docker (Opcional)

Si prefieres usar Docker:

```bash
# Construir la imagen
docker build -t multidb-frontend .

# Ejecutar el contenedor
docker run -p 3000:3000 --env-file .env.local multidb-frontend
```

## 🏗️ Arquitectura

```
front-api-pablo/
├── app/
│   ├── (auth)/              # Páginas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Páginas del dashboard
│   │   ├── admin/           # Panel de administración
│   │   │   ├── instances/   # Gestión de instancias
│   │   │   └── assign/      # Asignación de instancias
│   │   └── student/         # Panel de estudiante
│   │       ├── execute/     # Ejecutar queries
│   │       └── queries/     # Historial de queries
│   ├── components/          # Componentes React
│   │   ├── forms/          # Formularios
│   │   ├── ui/             # Componentes de UI
│   │   └── landing/        # Componentes del landing
│   ├── services/           # Servicios API
│   │   ├── api.ts          # Configuración de Axios
│   │   ├── auth.service.ts # Servicio de autenticación
│   │   ├── instance.service.ts # Servicio de instancias
│   │   └── query.service.ts    # Servicio de queries
│   ├── store/              # Estado global (Zustand)
│   │   └── authStore.ts
│   ├── types/              # Tipos TypeScript
│   ├── utils/              # Utilidades
│   └── globals.css         # Estilos globales
└── public/                 # Archivos estáticos
```

## 🔌 Endpoints Consumidos

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión |

**Ejemplo de Request - Register:**
```json
{
  "userName": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456",
  "roleId": 3
}
```

**Ejemplo de Request - Login:**
```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

### Instancias de Base de Datos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/instances` | Obtener todas las instancias |
| GET | `/instances/{id}` | Obtener instancia por ID |
| GET | `/instances/student/{userId}` | Instancias del estudiante |
| POST | `/instances` | Crear nueva instancia |
| POST | `/instances/assign` | Asignar instancia a estudiante |
| DELETE | `/instances/{id}` | Eliminar instancia |

**Ejemplo de Request - Create Instance:**
```json
{
  "name": "MySQL Desarrollo",
  "type": "MySQL",
  "host": "localhost",
  "port": 3306,
  "database": "testdb",
  "username": "root",
  "password": "password123",
  "description": "Base de datos de prueba"
}
```

**Ejemplo de Request - Assign Instance:**
```json
{
  "studentId": "usuario-id-uuid",
  "instanceId": "instancia-id-uuid"
}
```

### Queries

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/queries/execute` | Ejecutar query SQL |
| GET | `/queries/student` | Historial del estudiante |
| GET | `/queries` | Todas las queries (admin) |

**Ejemplo de Request - Execute Query:**
```json
{
  "instanceId": "instancia-id-uuid",
  "query": "SELECT * FROM users LIMIT 10;"
}
```

## 🔑 Credenciales de Demo

El sistema incluye credenciales de demo para pruebas:

### Administrador
- **Email:** `admin@test.com`
- **Password:** `123456`
- **Permisos:** Gestión completa del sistema

### Profesor
- **Email:** `teacher@test.com`
- **Password:** `123456`
- **Permisos:** Gestión de instancias y estudiantes

### Estudiante
- **Email:** `estudiante@test.com`
- **Password:** `123456`
- **Permisos:** Ejecutar queries en instancias asignadas

## 🐛 Troubleshooting

### Error: "Cannot connect to backend"

**Problema:** El frontend no puede conectarse al backend.

**Solución:**
1. Verifica que el backend esté corriendo
2. Revisa la URL en `.env.local`
3. Comprueba que no haya firewalls bloqueando el puerto

```bash
# Verificar conexión
curl http://localhost:5245/api/health
```

### Error: "401 Unauthorized"

**Problema:** Token expirado o inválido.

**Solución:**
1. Cierra sesión y vuelve a iniciar
2. Limpia las cookies del navegador
3. Verifica que el backend acepte el token

```bash
# Limpiar cookies en DevTools
# Application > Cookies > Clear All
```

### Error: "CORS policy"

**Problema:** El backend no permite peticiones desde tu frontend.

**Solución:**
Asegúrate de que el backend tenga CORS configurado:

```csharp
// En el backend (Program.cs o Startup.cs)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});
```

### Error: "Module not found"

**Problema:** Dependencias no instaladas correctamente.

**Solución:**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"

**Problema:** El puerto 3000 está ocupado.

**Solución:**
```bash
# Opción 1: Matar el proceso en el puerto 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Opción 2: Usar otro puerto
PORT=3001 npm run dev
```

### Páginas en blanco o errores de renderizado

**Problema:** Error en componentes de React.

**Solución:**
```bash
# Limpiar cache de Next.js
rm -rf .next
npm run dev
```

### Estilos no se aplican correctamente

**Problema:** Tailwind CSS no funciona.

**Solución:**
```bash
# Verificar configuración de Tailwind
# Asegúrate de que tailwind.config.ts esté correcto
# Reinicia el servidor
npm run dev
```

## 📚 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run build           # Construir para producción
npm start              # Iniciar servidor de producción
npm run lint           # Ejecutar linter

# Limpieza
rm -rf .next           # Limpiar cache de Next.js
rm -rf node_modules    # Eliminar dependencias
npm install            # Reinstalar dependencias

# Pruebas de API
curl -X POST http://localhost:5245/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'
```

## 🤝 Contribución

Si encuentras bugs o quieres agregar features:

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Add nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📝 Notas Importantes

- **Seguridad:** Nunca subas `.env.local` al repositorio
- **Tokens:** Los tokens JWT expiran después de 7 días
- **CORS:** Asegúrate de configurar CORS correctamente en el backend
- **Puertos:** Por defecto, frontend usa 3000 y backend 5245

## 📞 Soporte

Si tienes problemas:

1. Revisa la sección de [Troubleshooting](#troubleshooting)
2. Verifica los logs en la consola del navegador (F12)
3. Revisa los logs del servidor backend
4. Asegúrate de que todas las dependencias estén instaladas

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Listo para empezar! 🚀**

Una vez configurado todo, visita http://localhost:3000 y comienza a usar MultiDB Academy.