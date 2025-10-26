# 🎯 Talento Local - Plataforma de Gestión de Talento

Plataforma integral que conecta ciudadanos, empresas e instituciones educativas para impulsar el desarrollo profesional y cerrar la brecha de talento.

## 📋 Características Principales

- ✅ **Sistema de Autenticación**: NextAuth v5 con roles diferenciados
- ✅ **Perfiles Completos**: Ciudadanos, Empresas, Instituciones
- ✅ **Gestión de Habilidades**: Catálogo estandarizado con niveles
- ✅ **Educación**: Historial académico completo
- ✅ **Experiencia Laboral**: Trayectoria profesional
- ✅ **API REST**: Documentación Swagger automática
- ✅ **UI/UX Moderna**: Diseño responsivo con Tailwind CSS

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: NextAuth v5
- **Validación**: Zod + React Hook Form
- **Documentación**: Swagger UI

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm/yarn/pnpm
- Cuenta gratuita en [Neon.tech](https://neon.tech) (o PostgreSQL local)

### Configuración

1. **Clonar el repositorio**
git clone https://github.com/C-Ford17/talento-local.git
cd talento-local

2. **Instalar dependencias**
npm install

3. **Configurar variables de entorno**
Copia `.env.example` a `.env`:
cp .env.example .env
Edita `.env` con tus credenciales:
- **DATABASE_URL**: Tu conexión PostgreSQL de [Neon.tech](https://neon.tech)
- **AUTH_SECRET**: Genera con `openssl rand -base64 32`

4. **Configurar base de datos**
Crear tablas
npx prisma db push
Cargar habilidades iniciales
npm run prisma:seed

5. **Iniciar servidor de desarrollo**
Visita [http://localhost:3000](http://localhost:3000)
## 📚 Documentación API
Una vez iniciado el servidor, visita:
- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Endpoints disponibles**:
  - `GET /api/users` - Listar usuarios
  - `GET /api/profiles/[userId]` - Perfil completo
  - `GET /api/skills` - Catálogo de habilidades
  - `GET /api/profiles/search` - Búsqueda de perfiles
## 🗂️ Estructura del Proyecto
talent-platform/
├── prisma/ # Schema y migraciones
├── src/
│ ├── app/ # Pages y API routes
│ ├── components/ # Componentes reutilizables
│ ├── features/ # Módulos por funcionalidad
│ │ ├── auth/ # Autenticación
│ │ ├── profile/ # Perfiles
│ │ └── skills/ # Habilidades
│ └── lib/ # Utilidades y configuración
└── public/ # Assets estáticos

## 🌿 Ramas del Proyecto

- `main` - Versión estable de producción
- `develop` - Desarrollo activo
- `feature/auth` - Sistema de autenticación
- `feature/profiles` - Gestión de perfiles
- `feature/skills` - Sistema de habilidades
- `feature/education` - Educación académica
- `feature/experience` - Experiencia laboral
- `feature/api` - API REST y documentación
- `feature/ui` - Mejoras de interfaz

## 📝 Scripts Disponibles
npm run dev # Servidor de desarrollo
npm run build # Build de producción
npm run start # Servidor de producción
npm run lint # Linter
npx prisma studio # Interfaz visual de base de datos
npm run prisma:seed # Cargar datos iniciales


## 🎓 Proyecto Académico

Desarrollado como parte del módulo **"Registro de Usuarios, Perfiles y Habilidades"** del curso de Devops.

### Funcionalidades Implementadas

- ✅ Registro diferenciado por roles
- ✅ Gestión completa de perfiles
- ✅ Sistema de habilidades estandarizado
- ✅ Historial educativo y laboral
- ✅ API REST para integración
- ✅ Documentación técnica

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

## 🔗 Links Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://authjs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!





