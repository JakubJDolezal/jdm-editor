import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { PF } from '../../python-function';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';

export type TabPFProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabPythonFunction: React.FC<TabPFProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content } = useDecisionGraphState(({ disabled, configurable, decisionGraph }) => ({
    disabled,
    configurable,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
  }));

  return (
    <div style={{ maxWidth: 1200, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <PF
        value={content?.pfs}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
            draft.content.pfs = val;
            return draft;
          });
        }}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
      />
    </div>
  );
};
