

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './icon';
import { Intent } from '../../common';

const meta: Meta<typeof Icon> = {
  title: 'Core/Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icons are visual indicators of actions, objects, or concepts.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
    },
    intent: {
      control: 'select',
      options: [undefined, Intent.PRIMARY, Intent.SUCCESS, Intent.WARNING, Intent.DANGER],
    },
    size: {
      control: { type: 'range', min: 8, max: 48, step: 2 },
    },
    title: {
      control: 'text',
    },
  },
  args: {
    icon: '⚙️',
    size: 16,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic icon examples
export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    icon: '❓',
    title: 'Help icon',
  },
};

// Size variations
export const Small: Story = {
  args: {
    icon: '⭐',
    size: 12,
  },
};

export const Large: Story = {
  args: {
    icon: '⭐',
    size: 24,
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: '⭐',
    size: 32,
  },
};

// Intent variations
export const Primary: Story = {
  args: {
    icon: '🔵',
    intent: Intent.PRIMARY,
  },
};

export const Success: Story = {
  args: {
    icon: '✅',
    intent: Intent.SUCCESS,
  },
};

export const Warning: Story = {
  args: {
    icon: '⚠️',
    intent: Intent.WARNING,
  },
};

export const Danger: Story = {
  args: {
    icon: '❌',
    intent: Intent.DANGER,
  },
};

// Common icon examples
export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Icon icon="📁" title="Folder" />
      <Icon icon="📄" title="Document" />
      <Icon icon="⚙️" title="Settings" />
      <Icon icon="🔍" title="Search" />
      <Icon icon="❤️" title="Heart" />
      <Icon icon="⭐" title="Star" />
      <Icon icon="🏠" title="Home" />
      <Icon icon="👤" title="User" />
      <Icon icon="📧" title="Email" />
      <Icon icon="🔔" title="Notification" />
      <Icon icon="💾" title="Save" />
      <Icon icon="🗑️" title="Delete" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common icons used in UI applications.',
      },
    },
  },
};

// Size showcase
export const SizeShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon icon="⭐" size={8} title="8px" />
      <Icon icon="⭐" size={12} title="12px" />
      <Icon icon="⭐" size={16} title="16px (default)" />
      <Icon icon="⭐" size={20} title="20px" />
      <Icon icon="⭐" size={24} title="24px" />
      <Icon icon="⭐" size={32} title="32px" />
      <Icon icon="⭐" size={40} title="40px" />
      <Icon icon="⭐" size={48} title="48px" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons at different sizes from 8px to 48px.',
      },
    },
  },
};

// Intent showcase
export const IntentShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon icon="🔵" />
      <Icon icon="🔵" intent={Intent.PRIMARY} />
      <Icon icon="🔵" intent={Intent.SUCCESS} />
      <Icon icon="🔵" intent={Intent.WARNING} />
      <Icon icon="🔵" intent={Intent.DANGER} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons with different intent colors.',
      },
    },
  },
};