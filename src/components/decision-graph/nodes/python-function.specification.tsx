import { FunctionOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { useDecisionGraphActions } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';


export type NodeGenAIData = {
  pfs?: PFEntry[];
};
export type PFEntry = {
  id: string;
  location: string;
  module: string;
  func: string;
};

export const pythonFuncSpecification: NodeSpecification<NodeGenAIData> = {
  type: NodeKind.PFunction,
  icon:   <>
    <FunctionOutlined />
  </>,
  displayName: 'PythonFunction',
  documentationUrl: 'https://example.com/docs/custom-components',
  shortDescription: 'A custom python function to call',
  generateNode: () => ({
    name: 'myPythonFunc',
    content: {pfs:[]},
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
            Edit what to call
          </Button>,
        ]}
      />
    );
  },
};
