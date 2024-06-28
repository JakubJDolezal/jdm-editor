import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import type { PFEntry } from './context/pf-store.context';
import { PF } from './PF';

const pfDefault: PFEntry[] = [
  { id: '1', location: "content", func:'bar', module:'foo' },
];

const meta: Meta<typeof PF> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'PF',
  component: PF,
  args: {
    configurable: true,
    disabled: false,
    defaultValue: pfDefault,
  },
  argTypes: {
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof PF>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 1200 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <PF {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(pfDefault);

    return (
      <StoryWrapper>
        <PF value={value} onChange={setValue} {...args} />
      </StoryWrapper>
    );
  },
};
