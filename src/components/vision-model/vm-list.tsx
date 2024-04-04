import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { useVMStore } from './context/vm-store.context';
import { VMItem } from './vm-item';

export type VMListProps = {
  //
};

export const VMList: React.FC<VMListProps> = ({}) => {
  const { vms, addRowBelow, configurable, disabled } = useVMStore(
    ({ vms, addRowBelow, configurable, disabled }) => ({
      vms,
      addRowBelow,
      configurable,
      disabled,
    }),
    equal,
  );

  return (
    <div className={'vm-list'}>
      <div className={clsx('vm-list__item', 'vm-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Prompts</Typography.Text>
        <Typography.Text type='secondary'>VM</Typography.Text>
        <div />
      </div>
      {(vms || []).map((vm, index) => (
        <VMItem key={vm.id} vm={vm} index={index} />
      ))}
      {configurable && !disabled && (
        <div className={clsx('vm-list__item')}>
          <Button
            className='vm-list__button'
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
