import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import './OrderedList';
import { OrderedListElement } from './OrderedList';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
const meta: Meta<OrderedListElement> = {
  title: 'Example/OrderedList',
  tags: ['autodocs'],
  render: (args) => html`
    <cta-ordered-list symbol=${args.symbol}>
      <li>first</li>
      <li>second</li>
      <li>third</li>
    </cta-ordered-list>
  `,
  argTypes: {
    symbol:  { 
      control: { type: 'select' },
      options: ['numeric', 'uppercase-letters', 'lowercase-letters'],
    },
    // onClick: { action: 'onClick' },
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
  },
};

export default meta;
type Story = StoryObj<OrderedListElement>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    symbol: 'uppercase-letters',
  },
};

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
