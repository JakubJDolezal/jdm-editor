import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Popconfirm } from 'antd';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { AutosizeTextArea } from '../autosize-text-area';
import type { PFEntry } from './context/pf-store.context';
import { usePFStore } from './context/pf-store.context';

export type PFItemProps = {
  pf: PFEntry;
  index: number;
};

export const PFItem: React.FC<PFItemProps> = ({ pf, index }) => {
  const pfRef = useRef<HTMLDivElement>(null);
  const { updateRow, removeRow, swapRows, disabled, configurable } = usePFStore(
    ({ updateRow, removeRow, swapRows, disabled, configurable }) => ({
      updateRow,
      removeRow,
      swapRows,
      disabled,
      configurable,
    }),
  );

  const onChange = (update: Partial<Omit<PFEntry, 'id'>>) => {
    updateRow(index, update);
  };

  const onRemove = () => {
    removeRow(index);
  };

  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) => {
      swapRows(draggedRow.index, index);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    canDrag: configurable && !disabled,
    item: () => ({ ...pf, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(pfRef));

  return (
    <div
      ref={pfRef}
      className={clsx(
        'pf-list-item',
        'pf-list__item',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
      )}
      style={{ opacity: !isDragging ? 1 : 0.5 }}
    >
      <div ref={dragRef} className='pf-list-item__drag' aria-disabled={!configurable || disabled}>
        <MenuOutlined />
      </div>
      <div>
        <AutosizeTextArea
          placeholder='Enter place to download function from..'
          maxRows={20}
          disabled={!configurable || disabled}
          value={pf?.location}
          onChange={(e) => onChange({ location: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div>
        <AutosizeTextArea
          placeholder='Determine module..'
          maxRows={1}
          disabled={!configurable || disabled}
          value={pf?.module}
          onChange={(e) => onChange({ module: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div>
        <AutosizeTextArea
          placeholder='What function to call...'
          maxRows={1}
          disabled={!configurable || disabled}
          value={pf?.func}
          onChange={(e) => onChange({ func: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div>
        <Popconfirm
          title='Remove selected row?'
          okText='Remove'
          onConfirm={onRemove}
          disabled={!configurable || disabled}
        >
          <Button type='text' icon={<DeleteOutlined />} danger disabled={!configurable || disabled} />
        </Popconfirm>
      </div>
    </div>
  );
};
