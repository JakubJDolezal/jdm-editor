import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { Model } from '../../model/Model';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';

export type TabModelProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabModel: React.FC<TabModelProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content } = useDecisionGraphState(({ disabled, configurable, decisionGraph }) => ({
    disabled,
    configurable,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
  }));

  return (
    <div style={{ maxWidth: 1200, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <Model
        value={content?.models}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
            draft.content.models = val;
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
