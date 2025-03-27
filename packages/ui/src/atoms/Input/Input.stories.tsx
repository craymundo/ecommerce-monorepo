import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Etiqueta del input'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Tipo de input'
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder'
    },
    error: {
      control: 'text',
      description: 'Mensaje de error'
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado'
    },
    required: {
      control: 'boolean',
      description: 'Campo requerido'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input'
    }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre'
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    error: 'Email inválido',
    required: true
  }
};

export const Password: Story = {
  args: {
    label: 'Contraseña',
    type: 'password',
    placeholder: '••••••••',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Input deshabilitado',
    placeholder: 'No puedes editar esto',
    disabled: true
  }
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar...',
    leftIcon: 'search'
  }
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    rightIcon: 'mail'
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input
        label="Input pequeño"
        placeholder="Tamaño pequeño"
        size="sm"
      />
      <Input
        label="Input mediano"
        placeholder="Tamaño mediano"
        size="md"
      />
      <Input
        label="Input grande"
        placeholder="Tamaño grande"
        size="lg"
      />
    </div>
  )
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <Input
        label="Input normal"
        placeholder="Placeholder"
      />
      <Input
        label="Input con error"
        placeholder="Error"
        error="Mensaje de error"
      />
      <Input
        label="Input requerido"
        placeholder="Campo obligatorio"
        required
      />
      <Input
        label="Input deshabilitado"
        placeholder="No editable"
        disabled
      />
      <Input
        label="Input con icono izquierdo"
        placeholder="Buscar..."
        leftIcon="search"
      />
      <Input
        label="Input con icono derecho"
        placeholder="Seleccionar fecha"
        rightIcon="calendar"
      />
      <Input
        label="Input con ambos iconos"
        placeholder="Buscar fecha..."
        leftIcon="search"
        rightIcon="calendar"
      />
    </div>
  )
};