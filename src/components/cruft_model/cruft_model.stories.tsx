import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import type { CruftModelEntry } from './context/cruft_model-store.context';
import { CruftModel } from './CruftModel';

const cruft_modelDefault: CruftModelEntry[] = [
  { id: '1', cruft_model_name: 'GenericIntent', cruft_categories: ['Query'], cruft_url: 'http://ai-transformerfilter/api/ai/filter',   source:'document.content',
  target:'document.content'},
];

const meta: Meta<typeof CruftModel> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'CruftModel',
  component: CruftModel,
  args: {
    configurable: true,
    disabled: false,
    defaultValue: cruft_modelDefault,
  },
  argTypes: {
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof CruftModel>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 900 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <CruftModel {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(cruft_modelDefault);

    return (
      <StoryWrapper>
        <CruftModel value={value} onChange={setValue} {...args} />
      </StoryWrapper>
    );
  },
};
