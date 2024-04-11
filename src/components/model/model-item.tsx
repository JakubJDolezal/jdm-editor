import React, { useEffect, useState, useRef } from 'react';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Popconfirm } from 'antd';
import clsx from 'clsx';
import { useDrag, useDrop } from 'react-dnd';

import type { ModelEntry, ApiResponse } from './context/model-store.context';
import { useModelStore } from './context/model-store.context';

export type ModelItemProps = {
  model: ModelEntry;
  index: number;
};
export const ModelItem: React.FC<ModelItemProps> = ({ model, index }) => {
  const modelRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const { updateRow, removeRow, swapRows, disabled, configurable } = useModelStore(
    ({ updateRow, removeRow, swapRows, disabled, configurable }) => ({
      updateRow,
      removeRow,
      swapRows,
      disabled,
      configurable,
    }),
  );


  useEffect(() => {
    fetch('http://localhost:8000/api/model-data/')
      .then(response => response.json())
      .then((data: ApiResponse) => setApiResponse(data))
      .catch(error => {
        console.error('Error fetching model data:', error);
        // Default data to use if fetch fails
        const defaultData: ApiResponse = {
          model_names: ["Model1", "Model2"],
          allowed_categories: {
            "Model1": ["category1", "category2"],
            "Model2": ["category3", "category4"]
          }
        };
        setApiResponse(defaultData);
      });
  }, []);


  const toggleCategorySelection = (category: string) => {
    const updatedCategories = model.allowed_categories.includes(category)
      ? model.allowed_categories.filter((c) => c !== category)
      : [...model.allowed_categories, category];
    onChange({ ...model, allowed_categories: updatedCategories });
  };

  const onModelChange = (newModelName: string) => {
    setSelectedModel(newModelName);
    // Update the model with the new name and reset the allowed categories based on the new model
    onChange({ model_name: newModelName, allowed_categories: apiResponse?.allowed_categories[newModelName] || [] });
  };

  const onChange = (update: Partial<ModelEntry>) => {
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
    item: () => ({ ...model, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(modelRef));

  return (
    <div
      ref={modelRef}
      className={clsx(
        'model-list-item',
        'model-list__item',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
        isDragging && 'dragging'
      )}
    >
      <div ref={dragRef} className='model-list-item__drag' aria-disabled={!configurable || disabled}>
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
        {/* Allowed categories based on selected model */}
        {selectedModel && apiResponse?.allowed_categories[selectedModel]?.map((category, index) => (
          <Button
            key={index}
            type={model.allowed_categories.includes(category) ? 'primary' : 'default'}
            onClick={() => toggleCategorySelection(category)}
            disabled={disabled}
          >
            {category}
          </Button>
        ))}
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

