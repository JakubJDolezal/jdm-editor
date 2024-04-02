import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { useModelStore } from './context/model-store.context';
import { ModelItem } from './model-item';

export type ModelListProps = {
  //
};

export const ModelList: React.FC<ModelListProps> = ({}) => {
  const { models, addRowBelow, configurable, disabled } = useModelStore(
    ({ models, addRowBelow, configurable, disabled }) => ({
      models,
      addRowBelow,
      configurable,
      disabled,
    }),
    equal,
  );

  return (
    <div className={'model-list'}>
      <div className={clsx('model-list__item', 'model-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Prompts</Typography.Text>
        <Typography.Text type='secondary'>Model</Typography.Text>
        <div />
      </div>
      {(models || []).map((model, index) => (
        <ModelItem key={model.id} model={model} index={index} />
      ))}
      {configurable && !disabled && (
        <div className={clsx('model-list__item')}>
          <Button
            className='model-list__button'
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => addRowBelow()}
          >
            Add row
          </Button>
        </div>
      )}
    </div>
  );
};
