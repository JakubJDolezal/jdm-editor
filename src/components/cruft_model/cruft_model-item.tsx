import React, { useEffect, useState, useRef } from 'react';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Popconfirm } from 'antd';
import clsx from 'clsx';
import { useDrag, useDrop } from 'react-dnd';

import type { CruftModelEntry, ApiResponse } from './context/cruft_model-store.context';
import { useCruftModelStore } from './context/cruft_model-store.context';
import {AutosizeTextArea} from "../autosize-text-area";

export type CruftModelItemProps = {
  cruft_model: CruftModelEntry;
  index: number;
};
export const CruftModelItem: React.FC<CruftModelItemProps> = ({ cruft_model, index }) => {
  const cruft_modelRef = useRef<HTMLDivElement>(null);
  const [selectedCruftModel, setSelectedCruftModel] = useState<string>('');

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const { updateRow, removeRow, swapRows, disabled, configurable } = useCruftModelStore(
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
        console.error('Error fetching cruft_model data:', error);
        // Default data to use if fetch fails
        const defaultData: ApiResponse = {
          cruft_model_names: ["CruftModel1"],
          allowed_categories: {
            "CruftModel1": [   "Other", "Name", "Junk", "Email address", "Location", "Url", "Time", "Not Junk", "Disclaimer", "Email Signature"],
          }
        };
        setApiResponse(defaultData);
      });
  }, []);


  const toggleCategorySelection = (category: string) => {
    const updatedCategories = cruft_model.cruft_categories.includes(category)
      ? cruft_model.cruft_categories.filter((c) => c !== category)
      : [...cruft_model.cruft_categories, category];
    onChange({ ...cruft_model, cruft_categories: updatedCategories });
  };

  const onCruftModelChange = (newCruftModelName: string) => {
    setSelectedCruftModel(newCruftModelName);
    // Update the cruft_model with the new name and reset the allowed categories based on the new cruft_model
    onChange({ cruft_model_name: newCruftModelName, cruft_categories: apiResponse?.allowed_categories[newCruftModelName] || [] });
  };

  const onChange = (update: Partial<CruftModelEntry>) => {
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
    item: () => ({ ...cruft_model, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(cruft_modelRef));

  return (
    <div
      ref={cruft_modelRef}
      className={clsx(
        'cruft_model-list-item',
        'cruft_model-list__item',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
        isDragging && 'dragging'
      )}
    >
      <div ref={dragRef} className='cruft_model-list-item__drag' aria-disabled={!configurable || disabled}>
        <MenuOutlined />
      </div>
      <div>
        {/* CruftModel selection dropdown */}
        <select
          value={selectedCruftModel}
          onChange={(e) => onCruftModelChange(e.target.value)}
          disabled={disabled}
        >
          {apiResponse?.cruft_model_names.map((cruft_modelName, index) => (
            <option key={index} value={cruft_modelName}>{cruft_modelName}</option>
          ))}
        </select>
      </div>
      <div>
        {/* Allowed categories based on selected cruft_model */}
        {selectedCruftModel && apiResponse?.allowed_categories[selectedCruftModel]?.map((category, index) => (
          <Button
            key={index}
            type={cruft_model.cruft_categories.includes(category) ? 'primary' : 'default'}
            onClick={() => toggleCategorySelection(category)}
            disabled={disabled}
          >
            {category}
          </Button>
        ))}
      </div>
      <div>
        <AutosizeTextArea
          placeholder='http://ai-text-classifier/api/ai/classify_docs'
          maxRows={2}
          disabled={!configurable || disabled}
          value={cruft_model?.cruft_url}
          onChange={(e) => onChange({ cruft_url: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div>
        <AutosizeTextArea
          placeholder='document.content'
          maxRows={2}
          disabled={!configurable || disabled}
          value={cruft_model?.source}
          onChange={(e) => onChange({ source: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div>
        <AutosizeTextArea
          placeholder='document.content'
          maxRows={2}
          disabled={!configurable || disabled}
          value={cruft_model?.target}
          onChange={(e) => onChange({ target: e.target.value })}
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

