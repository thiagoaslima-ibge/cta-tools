import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './OrderedList';
import { type CTAOrderedListElement } from './OrderedList';
import { ORDERED_LIST_MARKER_TYPES } from './list-markers';

const meta: Meta<CTAOrderedListElement> = {
  title: 'Example/OrderedList',
  tags: ['autodocs'],
  render: (args) => html`
    <cta-ordered-list 
      id=${ifDefined(args.id)}
      data-testid=${ifDefined(args['data-testid'])}
      type=${ifDefined(args.type)}
      start=${ifDefined(args.start)}
    >
      <ol>
      <li>first</li>
      <li>
        second
        <cta-ordered-list
          ?keep-parent-counter=${args['keep-parent-counter']}
        >
          <ol>
            <li>sub first</li>
            <li>sub second</li>
            <li>sub third</li>
            <li>sub fourth</li>
          </ol>
        </cta-ordered-list>
      </li>
      <li>third</li>
    </ol>
  </cta-ordered-list>
  
  <cta-ordered-list
    type="lowercase-roman"
    ?keep-parent-counter=${args['keep-parent-counter']}
  >
    <ol>
      <li>sub first</li>
      <li>sub second</li>
      <li>sub third</li>
      <li>sub fourth</li>
    </ol>
  </cta-ordered-list>
  `,
  argTypes: {
    type:  { 
      control: { type: 'select' },
      options: ORDERED_LIST_MARKER_TYPES,
    },
    start: {
      control: { type: 'number', step: 1, min: 1, max: Number.MAX_SAFE_INTEGER }
    },
    "keep-parent-counter": {
      control: { type: 'boolean' }
    }
  },
};

export default meta;
type Story = StoryObj<CTAOrderedListElement>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'numeric',
    start: 1,
    "keep-parent-counter": true,
  },
};
