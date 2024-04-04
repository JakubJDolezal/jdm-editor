import type { DragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { CruftModelStoreProvider } from './context/cruft_model-store.context';
import type { CruftModelControllerProps } from './cruft_model-controller';
import { CruftModelController } from './cruft_model-controller';
import { CruftModelList } from './cruft_model-list';
import './cruft_model.scss';

export type cruft_modelProps = {
  manager?: DragDropManager;
} & CruftModelControllerProps;

export const CruftModel: React.FC<cruft_modelProps> = ({ manager, ...props }) => {
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
          <CruftModelStoreProvider>
            <CruftModelController {...props} />
            <CruftModelList />
          </CruftModelStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};
