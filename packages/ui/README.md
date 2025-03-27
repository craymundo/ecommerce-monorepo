# UI Component Library

Una librería de componentes UI moderna y accesible para React, construida con TypeScript.

## Instalación

```bash
npm install ui-ecommerce
```

## Uso

```tsx
import { Button, Input, Icon } from 'ui-ecommerce';

```

## Componentes

### Button

Componente de botón con múltiples variantes y estados.

```tsx
import { Button } from 'ui-ecommerce';

<Button 
  variant="primary" 
  size="md" 
  onClick={() => console.log('clicked')}
>
  Click me
</Button>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'outline' | 'primary' | Estilo visual del botón |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tamaño del botón |
| disabled | boolean | false | Estado deshabilitado |
| loading | boolean | false | Estado de carga |
| leftIcon | ReactNode | - | Icono a la izquierda |
| rightIcon | ReactNode | - | Icono a la derecha |

### Input

Campo de entrada con soporte para estados, iconos y mensajes de error.

```tsx
import { Input } from 'ui-ecommerce';

<Input
  label="Email"
  type="email"
  placeholder="tu@email.com"
  error="Email inválido"
  required
/>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| label | string | - | Etiqueta del campo |
| error | string | - | Mensaje de error |
| helperText | string | - | Texto de ayuda |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tamaño del input |
| leftIcon | ReactNode | - | Icono a la izquierda |
| rightIcon | ReactNode | - | Icono a la derecha |
| required | boolean | false | Campo requerido |

### Icon

Sistema de iconos con soporte para diferentes tamaños y colores.

```tsx
import { Icon } from 'ui-ecommerce';

<Icon name="check" size="md" color="primary" />
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| name | string | - | Nombre del icono |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tamaño del icono |
| color | string | 'currentColor' | Color del icono |

### Typography

Componentes tipográficos consistentes.

```tsx
import { Typography } from 'ui-ecommerce';

<Typography variant="h1">Título Principal</Typography>
<Typography variant="body1">Texto regular</Typography>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| variant | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'body1' \| 'body2' \| 'caption' | 'body1' | Variante tipográfica |
| align | 'left' \| 'center' \| 'right' | 'left' | Alineación del texto |
| color | string | - | Color del texto |

## Temas

La librería soporta modo claro y oscuro. Para cambiar el tema:

```tsx
<div data-theme="dark">
  {/* Tus componentes aquí */}
</div>
```

## Variables CSS

La librería utiliza variables CSS para personalización:

```css
:root {
  /* Colores */
  --primary-500: #2563eb;
  --error-500: #dc2626;
  --gray-900: #111827;
  
  /* Espaciado */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  
  /* Tipografía */
  --font-family-base: system-ui, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
}
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar Storybook
npm run storybook

# Ejecutar pruebas
npm run test

# Construir la librería
npm run build
```

## Licencia

MIT 