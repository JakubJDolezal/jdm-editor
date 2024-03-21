import { RobotOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { defaultFunctionValue } from '../../function/helpers/libs';
import { useDecisionGraphActions } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeGenAIData = string;

export const genAiSpecification: NodeSpecification<NodeGenAIData> = {
  type: NodeKind.GenAI,
  icon: <RobotOutlined />,
  displayName: 'GenAI',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/functions',
  shortDescription: '',
  generateNode: () => ({
    name: 'myGenAI',
    content: defaultFunctionValue,
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();

    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        actions={[
          <Button key='edit-function' type='link' onClick={() => graphActions.openTab(id)}>
            Edit GenAI Call
          </Button>,
        ]}
      />
    );
  },
};
