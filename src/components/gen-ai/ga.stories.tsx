import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import type { GAEntry } from './context/ga-store.context';
import { GA } from './GA';

const gaDefault: GAEntry[] = [
  { id: '1', prompt: 'Given the following categories generate a json of those that the following emails touches upon. ', choice: 'json' },
  { id: '2', prompt: 'Generate a summary for the following email', choice: 'append' },
];

const meta: Meta<typeof GA> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'GA',
  component: GA,
  args: {
    configurable: true,
    disabled: false,
    defaultValue: gaDefault,
  },
  argTypes: {
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof GA>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 900 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <GA {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(gaDefault);

    return (
      <StoryWrapper>
        <GA value={value} onChange={setValue} {...args} />
      </StoryWrapper>
    );
  },
};
