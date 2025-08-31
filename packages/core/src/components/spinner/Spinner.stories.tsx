

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner, SpinnerSize } from './spinner';
import { Intent } from '../../common';

const meta: Meta<typeof Spinner> = {
  title: 'Core/Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Spinners indicate progress in a pending state.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: [undefined, Intent.PRIMARY, Intent.SUCCESS, Intent.WARNING, Intent.DANGER],
    },
    size: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
    },
    value: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
  },
  args: {
    size: SpinnerSize.STANDARD,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic spinner examples
export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 0.7,
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with a specific progress value (70% complete).',
      },
    },
  },
};

// Size variations
export const Small: Story = {
  args: {
    size: SpinnerSize.SMALL,
  },
};

export const Standard: Story = {
  args: {
    size: SpinnerSize.STANDARD,
  },
};

export const Large: Story = {
  args: {
    size: SpinnerSize.LARGE,
  },
};

export const CustomSize: Story = {
  args: {
    size: 75,
  },
};

// Intent variations
export const Primary: Story = {
  args: {
    intent: Intent.PRIMARY,
  },
};

export const Success: Story = {
  args: {
    intent: Intent.SUCCESS,
  },
};

export const Warning: Story = {
  args: {
    intent: Intent.WARNING,
  },
};

export const Danger: Story = {
  args: {
    intent: Intent.DANGER,
  },
};

// Progress examples
export const ProgressStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner value={0} size={60} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>0%</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner value={0.25} size={60} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>25%</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner value={0.5} size={60} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>50%</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner value={0.75} size={60} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>75%</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner value={1} size={60} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>100%</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinners showing different progress states.',
      },
    },
  },
};

// Size showcase
export const SizeShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={SpinnerSize.SMALL} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Small (20px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={SpinnerSize.STANDARD} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Standard (50px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={SpinnerSize.LARGE} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Large (100px)</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Predefined spinner sizes.',
      },
    },
  },
};

// Intent showcase
export const IntentShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={60} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Default</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={60} intent={Intent.PRIMARY} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Primary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={60} intent={Intent.SUCCESS} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Success</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={60} intent={Intent.WARNING} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Warning</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={60} intent={Intent.DANGER} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Danger</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinners with different intent colors.',
      },
    },
  },
};