import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { useCruftModelStore } from './context/cruft_model-store.context';
import { CruftModelItem } from './cruft_model-item';

export type CruftModelListProps = {
  //
};

export const CruftModelList: React.FC<CruftModelListProps> = ({}) => {
  const { cruft_models, addRowBelow, configurable, disabled } = useCruftModelStore(
    ({ cruft_models, addRowBelow, configurable, disabled }) => ({
      cruft_models,
      addRowBelow,
      configurable,
      disabled,
    }),
    equal,
  );

  return (
    <div className={'cruft_model-list'}>
      <div className={clsx('cruft_model-list__item', 'cruft_model-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Prompts</Typography.Text>
        <Typography.Text type='secondary'>CruftModel</Typography.Text>
        <div />
      </div>
      {(cruft_models || []).map((cruft_model, index) => (
        <CruftModelItem key={cruft_model.id} cruft_model={cruft_model} index={index} />
      ))}
      {configurable && !disabled && (
        <div className={clsx('cruft_model-list__item')}>
          <Button
            className='cruft_model-list__button'
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
