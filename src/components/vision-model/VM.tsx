import type { DragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { VMStoreProvider } from './context/vm-store.context';
import type { VMControllerProps } from './vm-controller';
import { VMController } from './vm-controller';
import { VMList } from './vm-list';
import './vm.scss';

export type vmProps = {
  manager?: DragDropManager;
} & VMControllerProps;

export const VM: React.FC<vmProps> = ({ manager, ...props }) => {
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
          <VMStoreProvider>
            <VMController {...props} />
            <VMList />
          </VMStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};
