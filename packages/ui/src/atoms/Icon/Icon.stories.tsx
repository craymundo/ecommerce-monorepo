import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { icons } from './icons';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons)
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    },
    color: {
      control: 'color'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'arrowRight',
    size: 'md'
  }
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
      {Object.keys(icons).map((name) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <Icon name={name as IconName} size="md" />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>{name}</div>
        </div>
      ))}
    </div>
  )
}; 