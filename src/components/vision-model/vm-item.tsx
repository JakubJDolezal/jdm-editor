import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Input, Popconfirm } from 'antd';
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { AutosizeTextArea } from '../autosize-text-area';
import type { VMEntry, ApiResponse } from './context/vm-store.context';
import { useVMStore } from './context/vm-store.context';

export type VMItemProps = {
  vm: VMEntry;
  index: number;
};

export const VMItem: React.FC<VMItemProps> = ({ vm, index }) => {
  const vmRef = useRef<HTMLDivElement>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');

  const { updateRow, removeRow, swapRows, disabled, configurable } = useVMStore(
    ({ updateRow, removeRow, swapRows, disabled, configurable }) => ({
      updateRow,
      removeRow,
      swapRows,
      disabled,
      configurable,
    }),
  );

    useEffect(() => {
    fetch('/api/visual-models/')
      .then(response => response.json())
      .then((data: ApiResponse) => setApiResponse(data))
      .catch(error => {
        console.error('Error fetching model data:', error);
        // Default data to use if fetch fails
        const defaultData: ApiResponse = {
          model_names: ["Model1", "Model2"]
        };
        setApiResponse(defaultData);
      });
  }, []);

  const onChange = (update: Partial<Omit<VMEntry, 'id'>>) => {
    updateRow(index, update);
  };
  const onModelChange = (newModelName: string) => {
    setSelectedModel(newModelName);
    // Update the model with the new name and reset the allowed categories based on the new model
    onChange({ model_name: newModelName});
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
    item: () => ({ ...vm, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(vmRef));

  return (
    <div
      ref={vmRef}
      className={clsx(
        'vm-list-item',
        'vm-list__item',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
      )}
      style={{ opacity: !isDragging ? 1 : 0.5 }}
    >
      <div ref={dragRef} className='vm-list-item__drag' aria-disabled={!configurable || disabled}>
        <MenuOutlined />
      </div>
      <div>
        {/* Model selection dropdown */}
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={disabled}
        >
          {apiResponse?.model_names.map((modelName, index) => (
            <option key={index} value={modelName}>{modelName}</option>
          ))}
        </select>
      </div>
     <div>
        <AutosizeTextArea
          placeholder='Input which page to process'
          maxRows={2}
          disabled={!configurable || disabled}
          value={vm?.page}
          onChange={(e) => onChange({ page: e.target.value })}
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
