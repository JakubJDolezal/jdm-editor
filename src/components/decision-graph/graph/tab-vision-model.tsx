import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { Model } from '../../model/Model';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';

export type TabModelProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabVisionModel: React.FC<TabModelProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content } = useDecisionGraphState(({ disabled, configurable, decisionGraph }) => ({
    disabled,
    configurable,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
  }));

  return (
    <div style={{ maxWidth: 900, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <Model
        value={content?.vms}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
            draft.content.vms = val;
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
