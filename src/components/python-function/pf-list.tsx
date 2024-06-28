import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { usePFStore } from './context/pf-store.context';
import { PFItem } from './pf-item';

export type PFListProps = {
  //
};

export const PFList: React.FC<PFListProps> = ({}) => {
  const { pfs, addRowBelow, configurable, disabled } = usePFStore(
    ({ pfs, addRowBelow, configurable, disabled }) => ({
      pfs,
      addRowBelow,
      configurable,
      disabled,
    }),
    equal,
  );

  return (
    <div className={'pf-list'}>
      <div className={clsx('pf-list__item', 'pf-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Prompts</Typography.Text>
        <Typography.Text type='secondary'>PF</Typography.Text>
        <div />
      </div>
      {(pfs || []).map((pf, index) => (
        <PFItem key={pf.id} pf={pf} index={index} />
      ))}
      {configurable && !disabled && (
        <div className={clsx('pf-list__item')}>
          <Button
            className='pf-list__button'
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
