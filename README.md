# 🛍️ Ecommerce Monorepo

Monorepo que contiene una aplicación de comercio electrónico y sus dependencias compartidas, construido con Turborepo.

## 📦 Estructura del Monorepo

```bash
ecommerce-monorepo/
├── apps/
│   └── ecommerce/          # Aplicación principal de ecommerce
├── packages/
│   ├── ui-ecommerce/       # Biblioteca de componentes UI compartidos
│   └── utils-ecommerce/    # Utilidades y funciones compartidas
```

## 🛠️ Stack Tecnológico

- **Gestor de Monorepo:** Turborepo
- **Package Manager:** pnpm
- **Core:**
  - TypeScript
  - React
  - Vite
- **Calidad de Código:**
  - ESLint
  - Prettier
  - TypeScript strict mode

## 🚀 Comenzando

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8
- Git

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
pnpm install

# Iniciar desarrollo
pnpm dev
```

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia todos los proyectos en modo desarrollo |
| `pnpm build` | Construye todos los proyectos |
| `pnpm lint` | Ejecuta el linter en todos los proyectos |
| `pnpm test` | Ejecuta los tests en todos los proyectos |

### Comandos Específicos

```bash
# Ejecutar solo el proyecto de ecommerce
pnpm --filter ecommerce dev

# Construir solo los componentes UI
pnpm --filter ui-ecommerce build

# Ejecutar tests en utils
pnpm --filter utils-ecommerce test
```

## 📚 Workspace Packages

### 🎯 Ecommerce (`apps/ecommerce`)
Aplicación principal de comercio electrónico.
- **Tech Stack:** React + Vite + TypeScript
- **Puerto de desarrollo:** 5173
- [Ver documentación específica](./apps/ecommerce/README.md)

### 🎨 UI Library (`packages/ui-ecommerce`)
Biblioteca de componentes UI reutilizables.
- Componentes base
- Sistema de diseño
- Temas y estilos compartidos
- [Ver documentación específica](./packages/ui-ecommerce/README.md)

## 🔄 Flujo de Trabajo

### Desarrollo Local

```bash
# Crear nueva feature
git checkout -b feature/nombre-feature

# Commit con conventional commits
git commit -m "feat(scope): descripción"
```

### Cache Remoto

Este proyecto utiliza el cache remoto de Turborepo para optimizar los builds:

```bash
# Configurar cache remoto
npx turbo login
npx turbo link
```

## 📈 Scripts de Análisis

- `pnpm analyze`: Análisis de bundles
- `pnpm dep-graph`: Visualización de dependencias entre paquetes

## 🤝 Contribución

1. Fork del repositorio
2. Crea tu rama de feature
3. Commit de tus cambios
4. Push a la rama
5. Abre un Pull Request
