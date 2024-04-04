import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import type { VMEntry } from './context/vm-store.context';
import { VM } from './VM';

const vmDefault: VMEntry[] = [
  { id: '1', model_name: 'ParsingModel', page: '1'},
];

const meta: Meta<typeof VM> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'VM',
  component: VM,
  args: {
    configurable: true,
    disabled: false,
    defaultValue: vmDefault,
  },
  argTypes: {
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof VM>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 900 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <VM {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(vmDefault);

    return (
      <StoryWrapper>
        <VM value={value} onChange={setValue} {...args} />
      </StoryWrapper>
    );
  },
};
