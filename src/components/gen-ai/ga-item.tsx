import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Input, Popconfirm } from 'antd';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { AutosizeTextArea } from '../autosize-text-area';
import type { GAEntry } from './context/ga-store.context';
import { useGAStore } from './context/ga-store.context';

export type GAItemProps = {
  ga: GAEntry;
  index: number;
};

export const GAItem: React.FC<GAItemProps> = ({ ga, index }) => {
  const gaRef = useRef<HTMLDivElement>(null);
  const { updateRow, removeRow, swapRows, disabled, configurable } = useGAStore(
    ({ updateRow, removeRow, swapRows, disabled, configurable }) => ({
      updateRow,
      removeRow,
      swapRows,
      disabled,
      configurable,
    }),
  );

  const onChange = (update: Partial<Omit<GAEntry, 'id'>>) => {
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
    item: () => ({ ...ga, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(gaRef));

  return (
    <div
      ref={gaRef}
      className={clsx(
        'ga-list-item',
        'ga-list__item',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
      )}
      style={{ opacity: !isDragging ? 1 : 0.5 }}
    >
      <div ref={dragRef} className='ga-list-item__drag' aria-disabled={!configurable || disabled}>
        <MenuOutlined />
      </div>
      <div>
        <AutosizeTextArea
          placeholder='Input your prompt'
          maxRows={20}
          disabled={!configurable || disabled}
          value={ga?.prompt}
          onChange={(e) => onChange({ prompt: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div>
        <select
        value={ga?.choice}
        onChange={(e) => {
          const newChoice = e.target.value;
          // Ensure newChoice is one of the allowed types
          if (newChoice === 'json' || newChoice === 'append') {
            onChange({ ...ga, choice: newChoice });
          }
        }}
        disabled={disabled}
      >
        <option value="json">JSON</option>
        <option value="append">Append</option>
      </select>
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
