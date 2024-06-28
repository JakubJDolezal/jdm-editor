import type { DragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { PFStoreProvider } from './context/pf-store.context';
import type { PFControllerProps } from './pf-controller';
import { PFController } from './pf-controller';
import { PFList } from './pf-list';
import './pf.scss';

export type pfProps = {
  manager?: DragDropManager;
} & PFControllerProps;

export const PF: React.FC<pfProps> = ({ manager, ...props }) => {
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
          <PFStoreProvider>
            <PFController {...props} />
            <PFList />
          </PFStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};
