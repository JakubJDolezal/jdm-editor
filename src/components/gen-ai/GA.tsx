import type { DragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GAStoreProvider } from './context/ga-store.context';
import type { GAControllerProps } from './ga-controller';
import { GAController } from './ga-controller';
import { GAList } from './ga-list';
import './ga.scss';

export type gaProps = {
  manager?: DragDropManager;
} & GAControllerProps;

export const GA: React.FC<gaProps> = ({ manager, ...props }) => {
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
          <GAStoreProvider>
            <GAController {...props} />
            <GAList />
          </GAStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};
