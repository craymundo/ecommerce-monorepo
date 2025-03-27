import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconProps } from './Icon';
import { IconName, icons } from './icons';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons),
      description: 'Nombre del icono'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del icono'
    },
    color: {
      control: 'color',
      description: 'Color del icono'
    }
  }
} satisfies Meta<IconProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 'md'
  }
};

export const AllIcons: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '1rem'
    }}>
      {Object.keys(icons).map((name) => (
        <div key={name} style={{ 
          textAlign: 'center',
          padding: '1rem',
          border: '1px solid #eee',
          borderRadius: '8px'
        }}>
          <Icon name={name as IconName} size="md" />
          <div style={{ 
            fontSize: '12px',
            marginTop: '8px',
            color: '#666'
          }}>
            {name}
          </div>
        </div>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="check" size="sm" />
      <Icon name="check" size="md" />
      <Icon name="check" size="lg" />
      <Icon name="check" size="xl" />
    </div>
  )
};

export const Colors: Story = {
  args: {
    name: 'check',
    size: 'md',
    color: '#10B981',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Icon name="check" size="md" color="#10B981" />
      <Icon name="close" size="md" color="#EF4444" />
    </div>
  )
};