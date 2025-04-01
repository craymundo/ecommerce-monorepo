# Ecommerce App

Aplicación de comercio electrónico construida con tecnologías modernas como parte de una arquitectura monorepo.

## 🛠 Stack Tecnológico

- **Framework:** React + Vite
- **Lenguaje:** TypeScript
- **Estilos:** css
- **Estado:** zustand
- **Testing:** vitest
- **CI/CD:** github actions

## 📁 Estructura del Proyecto

```bash
ecommerce/
├── src/                    # Código fuente principal
├── dist/                   # Archivos compilados
├── public/                 # Archivos estáticos
├── docs/                   # Documentación
├── infrastructure/         # Configuraciones de infraestructura
├── scripts/               # Scripts de utilidad
└── tests/                 # Tests de la aplicación
```

## 🚀 Comenzando

### Prerrequisitos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- [Otros prerrequisitos específicos]

### Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar entorno de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar tests
pnpm test
```

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Construye la aplicación para producción |
| `pnpm preview` | Vista previa de la build de producción |
| `pnpm lint` | Ejecuta el linter |
| `pnpm test` | Ejecuta los tests |


## 📦 Despliegue

[Instrucciones específicas para el despliegue en tu entorno]

## 🤝 Contribución

1. Fork del repositorio
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🏗️ Patrones de Diseño

### LocalStorage Utility (Singleton + Facade)

Implementamos una utilidad para el manejo del localStorage utilizando una combinación de los patrones Singleton y Facade.

```typescript
class LocalStorageUtils {
  private static instance: LocalStorageUtils;
  
  private constructor() {}

  public static getInstance(): LocalStorageUtils {
    if (!LocalStorageUtils.instance) {
      LocalStorageUtils.instance = new LocalStorageUtils();
    }
    return LocalStorageUtils.instance;
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // ... otros métodos
}
```

#### Ventajas

1. **Singleton**
   - Control centralizado del acceso al localStorage
   - Una única instancia en toda la aplicación
   - Gestión eficiente de recursos

2. **Facade**
   - Interfaz simplificada para operaciones de localStorage
   - Tipado genérico para type safety
   - Encapsulación de la lógica de serialización/deserialización

#### Ejemplo de Uso

```typescript
// Obtener datos tipados
interface User {
  id: number;
  name: string;
}

// Guardar datos
localStorageUtils.setItem<User>("user", { 
  id: 1, 
  name: "John" 
});

// Recuperar datos con tipo
const user = localStorageUtils.getItem<User>("user");
```

#### Beneficios en el Proyecto

- **Consistencia**: Manejo uniforme del localStorage en toda la aplicación
- **Type Safety**: Prevención de errores relacionados con tipos
- **Mantenibilidad**: Cambios centralizados en la lógica de almacenamiento
- **Testabilidad**: Facilita el mock y testing de operaciones de storage


## 🏗️ Patrones de Diseño en la Capa de Servicios

### Caché de Países (ApiCache + Singleton)

La implementación del caché para el servicio de países utiliza una combinación de patrones de diseño para optimizar el rendimiento y el consumo de recursos.

#### 1. Patrón Singleton en ApiCache
```typescript
export class ApiCache {
  private static instance: ApiCache;
  
  static getInstance(): ApiCache {
    if (!ApiCache.instance) {
      ApiCache.instance = new ApiCache();
    }
    return ApiCache.instance;
  }
}
```

**Ventajas:**
- Garantiza una única instancia del caché en toda la aplicación
- Evita múltiples conexiones y duplicación de datos
- Gestión centralizada del almacenamiento en memoria

#### 2. Patrón Cache-Aside
```typescript
static async getAmericanCountries(): Promise<string[]> {
  // Verificar cache primero
  const cachedData = this.cache.get<string[]>(CACHE_KEY);
  if (cachedData) return cachedData;

  // Si no está en cache, obtener de la API
  const data = await fetchFromApi();
  
  // Guardar en cache para futuras solicitudes
  this.cache.set(CACHE_KEY, data);
  
  return data;
}
```

**Ventajas:**
- Reduce llamadas a la API
- Mejora el tiempo de respuesta
- Optimiza el uso de recursos

#### 3. Patrón Service (CountriesService)
```typescript
export class CountriesService {
  private static cache: ApiCache = ApiCache.getInstance();
  
  static async getAmericanCountries(): Promise<string[]> {
    // Implementación
  }
}
```

**Ventajas:**
- Encapsula la lógica de negocio
- Separa responsabilidades
- Facilita el mantenimiento y testing

### Consideraciones de Implementación

1. **Time-To-Live (TTL)**
   - El caché tiene un TTL de 1 hora
   - Ideal para datos estáticos como países
   - Configurable según necesidades

2. **Tipado Genérico**
   ```typescript
   get<T>(key: string): T | null
   set<T>(key: string, data: T): void
   ```
   - Proporciona type safety
   - Flexibilidad para diferentes tipos de datos

3. **Manejo de Errores**
   - Gestión centralizada de errores
   - Transformación de errores específicos
   - Facilita el debugging

### Uso del Servicio

```typescript
// Ejemplo de uso
const countries = await CountriesService.getAmericanCountries();
```

### Beneficios

1. **Rendimiento**
   - Reducción de llamadas a la API
   - Respuestas más rápidas
   - Menor consumo de ancho de banda

2. **Mantenibilidad**
   - Código organizado y modular
   - Fácil de extender
   - Testing simplificado

3. **Escalabilidad**
   - Preparado para crecimiento
   - Fácil de modificar TTL y políticas de caché
   - Adaptable a diferentes necesidades