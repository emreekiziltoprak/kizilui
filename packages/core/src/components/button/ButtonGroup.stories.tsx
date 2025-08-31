

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGroup } from './buttonGroup';
import { Button } from './buttons';
import { Intent, Alignment } from '../../common';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Core/Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ButtonGroup arranges buttons horizontally or vertically.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    alignText: {
      control: 'select',
      options: [undefined, Alignment.CENTER, Alignment.LEFT, Alignment.RIGHT],
    },
    fill: {
      control: 'boolean',
    },
    minimal: {
      control: 'boolean',
    },
    outlined: {
      control: 'boolean',
    },
    large: {
      control: 'boolean',
    },
    small: {
      control: 'boolean',
    },
    vertical: {
      control: 'boolean',
    },
  },
  args: {
    fill: false,
    minimal: false,
    outlined: false,
    large: false,
    small: false,
    vertical: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button group examples
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" />
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button icon="📁" text="Open" />
      <Button icon="💾" text="Save" />
      <Button icon="✏️" text="Edit" />
    </ButtonGroup>
  ),
};

export const WithIntents: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="Cancel" />
      <Button text="Save" intent={Intent.SUCCESS} />
      <Button text="Delete" intent={Intent.DANGER} />
    </ButtonGroup>
  ),
};

// Vertical layout
export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" />
    </ButtonGroup>
  ),
};

export const VerticalWithIcons: Story = {
  args: {
    vertical: true,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button icon="🏠" text="Home" />
      <Button icon="⚙️" text="Settings" />
      <Button icon="👤" text="Profile" />
      <Button icon="🚪" text="Logout" />
    </ButtonGroup>
  ),
};

// Fill width
export const Fill: Story = {
  args: {
    fill: true,
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <ButtonGroup {...args}>
        <Button text="First" />
        <Button text="Second" />
        <Button text="Third" />
      </ButtonGroup>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Button group that fills the width of its container.',
      },
    },
  },
};

// Style variations (deprecated but still functional)
export const Minimal: Story = {
  args: {
    minimal: true,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" />
    </ButtonGroup>
  ),
};

export const Outlined: Story = {
  args: {
    outlined: true,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" />
    </ButtonGroup>
  ),
};

export const Large: Story = {
  args: {
    large: true,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" />
    </ButtonGroup>
  ),
};

export const Small: Story = {
  args: {
    small: true,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button text="First" />
      <Button text="Second" />
      <Button text="Third" />
    </ButtonGroup>
  ),
};

// Complex examples
export const Toolbar: Story = {
  render: () => (
    <div>
      <ButtonGroup style={{ marginBottom: '16px' }}>
        <Button icon="📄" />
        <Button icon="📁" />
        <Button icon="💾" />
      </ButtonGroup>
      <ButtonGroup style={{ marginBottom: '16px' }}>
        <Button icon="↶" />
        <Button icon="↷" />
      </ButtonGroup>
      <ButtonGroup>
        <Button icon="✂️" />
        <Button icon="📋" />
        <Button icon="📄" />
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple button groups arranged as a toolbar.',
      },
    },
  },
};

export const Navigation: Story = {
  render: () => (
    <ButtonGroup vertical>
      <Button icon="🏠" text="Dashboard" active />
      <Button icon="👥" text="Users" />
      <Button icon="📊" text="Analytics" />
      <Button icon="⚙️" text="Settings" />
      <Button icon="🚪" text="Logout" intent={Intent.DANGER} />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical button group used for navigation.',
      },
    },
  },
};

// Alignment examples
export const AlignmentExamples: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <div style={{ marginBottom: '16px' }}>
        <h4>Left Aligned</h4>
        <ButtonGroup fill alignText={Alignment.LEFT}>
          <Button text="Left" />
          <Button text="Center" />
          <Button text="Right" />
        </ButtonGroup>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h4>Center Aligned</h4>
        <ButtonGroup fill alignText={Alignment.CENTER}>
          <Button text="Left" />
          <Button text="Center" />
          <Button text="Right" />
        </ButtonGroup>
      </div>
      <div>
        <h4>Right Aligned</h4>
        <ButtonGroup fill alignText={Alignment.RIGHT}>
          <Button text="Left" />
          <Button text="Center" />
          <Button text="Right" />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Button groups with different text alignments.',
      },
    },
  },
};