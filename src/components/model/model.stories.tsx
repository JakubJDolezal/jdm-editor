import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import type { ModelEntry } from './context/model-store.context';
import { Model } from './Model';

const modelDefault: ModelEntry[] = [
    { id: '1', model_name: 'GenericIntent', allowed_categories: ['Query'] , usage_type:'Spans',
      key: "document",
      url: "http://ai-text-classifier/api/ai/classify_docs"},
];

const meta: Meta<typeof Model> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Model',
  component: Model,
  args: {
    configurable: true,
    disabled: false,
    defaultValue: modelDefault,
  },
  argTypes: {
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Model>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 900 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <Model {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(modelDefault);

    return (
      <StoryWrapper>
        <Model value={value} onChange={setValue} {...args} />
      </StoryWrapper>
    );
  },
};
