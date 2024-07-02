import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { useGAStore } from './context/ga-store.context';
import { GAItem } from './ga-item';

export type GAListProps = {
  //
};

export const GAList: React.FC<GAListProps> = ({}) => {
  const { gas, addRowBelow, configurable, disabled } = useGAStore(
    ({ gas, addRowBelow, configurable, disabled }) => ({
      gas,
      addRowBelow,
      configurable,
      disabled,
    }),
    equal,
  );

  return (
    <div className={'ga-list'}>
      <div className={clsx('ga-list__item', 'ga-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Prompts</Typography.Text>
        <Typography.Text type='secondary'>Output</Typography.Text>
        <Typography.Text type='secondary'>Deployment Platform</Typography.Text>
        <Typography.Text type='secondary'>Source</Typography.Text>
        <Typography.Text type='secondary'>Model</Typography.Text>

        <div />
      </div>
      {(gas || []).map((ga, index) => (
        <GAItem key={ga.id} ga={ga} index={index} />
      ))}
      {configurable && !disabled && (
        <div className={clsx('ga-list__item')}>
          <Button
            className='ga-list__button'
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
