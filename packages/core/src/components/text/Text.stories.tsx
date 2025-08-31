

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Core/Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Text component provides consistent text styling and truncation behavior.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    ellipsize: {
      control: 'boolean',
    },
    tagName: {
      control: 'select',
      options: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'This is some text content.',
    ellipsize: false,
    tagName: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text examples
export const Default: Story = {};

export const WithEllipsis: Story = {
  args: {
    ellipsize: true,
    children: 'This is a very long text that should be truncated with an ellipsis when it exceeds the available width of its container.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, border: '1px solid #ccc', padding: '8px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Text with ellipsis truncation when it overflows its container.',
      },
    },
  },
};

// Tag variations
export const AsSpan: Story = {
  args: {
    tagName: 'span',
    children: 'This text is rendered as a span element.',
  },
};

export const AsParagraph: Story = {
  args: {
    tagName: 'p',
    children: 'This text is rendered as a paragraph element.',
  },
};

export const AsHeading1: Story = {
  args: {
    tagName: 'h1',
    children: 'This is a heading 1',
  },
};

export const AsHeading2: Story = {
  args: {
    tagName: 'h2',
    children: 'This is a heading 2',
  },
};

export const AsHeading3: Story = {
  args: {
    tagName: 'h3',
    children: 'This is a heading 3',
  },
};

// Complex examples
export const MultipleTextElements: Story = {
  render: () => (
    <div>
      <Text tagName="h2">Main Title</Text>
      <Text tagName="p">This is a paragraph with some description text.</Text>
      <Text tagName="span" ellipsize style={{ display: 'block', width: 200 }}>
        This is inline text that gets truncated when too long
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple text elements with different tag names and behaviors.',
      },
    },
  },
};

export const EllipsisComparison: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <div style={{ marginBottom: '16px' }}>
        <h4>Without ellipsis:</h4>
        <div style={{ border: '1px solid #ccc', padding: '8px' }}>
          <Text ellipsize={false}>
            This is a very long text that will wrap to multiple lines when it exceeds the available width of its container.
          </Text>
        </div>
      </div>
      <div>
        <h4>With ellipsis:</h4>
        <div style={{ border: '1px solid #ccc', padding: '8px' }}>
          <Text ellipsize={true}>
            This is a very long text that will be truncated with an ellipsis when it exceeds the available width of its container.
          </Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between text with and without ellipsis truncation.',
      },
    },
  },
};

// Style variations
export const StyledText: Story = {
  render: () => (
    <div>
      <Text style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>
        Blue, large, bold text
      </Text>
      <br />
      <Text style={{ color: 'red', fontStyle: 'italic' }}>
        Red, italic text
      </Text>
      <br />
      <Text style={{ textDecoration: 'underline' }}>
        Underlined text
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text components with custom styling.',
      },
    },
  },
};