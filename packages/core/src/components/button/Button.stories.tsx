

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './buttons';
import { Intent } from '../../common';

// Import global styles
import '../../styles/kizilui.scss';

const meta: Meta<typeof Button> = {
  title: 'Core/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Buttons trigger actions when clicked. They can display text, icons, or both.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: [undefined, Intent.PRIMARY, Intent.SUCCESS, Intent.WARNING, Intent.DANGER],
    },
    icon: {
      control: 'text',
    },
    rightIcon: {
      control: 'text',
    },
    text: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    large: {
      control: 'boolean',
    },
    small: {
      control: 'boolean',
    },
    minimal: {
      control: 'boolean',
    },
    outlined: {
      control: 'boolean',
    },
    fill: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
  },
  args: {
    text: 'Button',
    disabled: false,
    loading: false,
    large: false,
    small: false,
    minimal: false,
    outlined: false,
    fill: false,
    active: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button examples
export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: 'download',
    text: 'Download',
  },
};

export const WithRightIcon: Story = {
  args: {
    text: 'Next',
    rightIcon: 'arrow-right',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'settings',
    text: undefined,
  },
};

// Intent variations
export const Primary: Story = {
  args: {
    intent: Intent.PRIMARY,
    text: 'Primary Button',
  },
};

export const Success: Story = {
  args: {
    intent: Intent.SUCCESS,
    text: 'Success Button',
  },
};

export const Warning: Story = {
  args: {
    intent: Intent.WARNING,
    text: 'Warning Button',
  },
};

export const Danger: Story = {
  args: {
    intent: Intent.DANGER,
    text: 'Danger Button',
  },
};

// Size variations
export const Large: Story = {
  args: {
    large: true,
    text: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    small: true,
    text: 'Small Button',
  },
};

// Style variations
export const Minimal: Story = {
  args: {
    minimal: true,
    text: 'Minimal Button',
  },
};

export const Outlined: Story = {
  args: {
    outlined: true,
    text: 'Outlined Button',
  },
};

export const Fill: Story = {
  args: {
    fill: true,
    text: 'Fill Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// State variations
export const Loading: Story = {
  args: {
    loading: true,
    text: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    text: 'Disabled Button',
  },
};

export const Active: Story = {
  args: {
    active: true,
    text: 'Active Button',
  },
};

// Complex examples
export const ButtonWithChildren: Story = {
  render: (args) => (
    <Button {...args}>
      <strong>Bold</strong> and <em>italic</em> text
    </Button>
  ),
  args: {
    text: undefined,
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" intent={Intent.PRIMARY} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple buttons can be grouped together.',
      },
    },
  },
};