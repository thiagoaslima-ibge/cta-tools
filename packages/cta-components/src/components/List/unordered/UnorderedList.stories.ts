import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './UnorderedList';
import { type CTAUnorderedListElement } from './UnorderedList';
import { UNORDERED_LIST_MARKER_TYPES } from './list-markers';

const meta: Meta<CTAUnorderedListElement> = {
  title: 'Example/UnorderedList',
  tags: ['autodocs'],
  render: (args) => html`
    <cta-unordered-list 
      id=${ifDefined(args.id)}
      data-testid=${ifDefined(args['data-testid'])}
      type=${ifDefined(args.type)}
    >
      <ul>
      <li>first</li>
      <li>
        second
        <cta-ordered-list>
          <ul>
            <li>sub first</li>
            <li>sub second</li>
            <li>sub third</li>
            <li>sub fourth</li>
          </ul>
        </cta-ordered-list>
      </li>
      <li>third</li>
    </ul>
  </cta-unordered-list>
  
  <cta-unordered-list type="square">
    <ul>
      <li>sub first</li>
      <li>sub second</li>
      <li>sub third</li>
      <li>sub fourth</li>
    </ul>
  </cta-unordered-list>
  `,
  argTypes: {
    type:  { 
      control: { type: 'select' },
      options: UNORDERED_LIST_MARKER_TYPES,
    },
  },
};

export default meta;
type Story = StoryObj<CTAUnorderedListElement>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'circle',
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
