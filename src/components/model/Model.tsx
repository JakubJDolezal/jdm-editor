import type { DragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ModelStoreProvider } from './context/model-store.context';
import type { ModelControllerProps } from './model-controller';
import { ModelController } from './model-controller';
import { ModelList } from './model-list';
import './model.scss';

export type modelProps = {
  manager?: DragDropManager;
} & ModelControllerProps;

export const Model: React.FC<modelProps> = ({ manager, ...props }) => {
  const [_, setMounted] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dndProps = useMemo(() => {
    if (manager) {
      return {
        manager,
      };
    }

    return {
      backend: HTML5Backend,
      options: {
        rootElement: container.current,
      },
    };
  }, [container.current, manager]);

  return (
    <div ref={container}>
      {container.current && (
        <DndProvider {...dndProps}>
          <ModelStoreProvider>
            <ModelController {...props} />
            <ModelList />
          </ModelStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};
