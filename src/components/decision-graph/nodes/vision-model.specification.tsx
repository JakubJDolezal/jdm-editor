import { RobotOutlined, EyeOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { useDecisionGraphActions } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';


export type NodeVMData = {
  vms?: VMEntry[];
};
export type VMEntry = {
  id: string;
  model_name: string;
  page: string;
};

export const visionModelSpecification: NodeSpecification<NodeVMData> = {
  type: NodeKind.VisualModel,
  icon:   <>
    <EyeOutlined />
    <RobotOutlined />
  </>,
  displayName: 'Visual Models',
  documentationUrl: 'https://example.com/docs/custom-components',
  shortDescription: 'Image to text model',
  generateNode: () => ({
    name: 'myVisualModel',
    content: {vms:[]},
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
            Edit Document Extraction Model Call
          </Button>,
        ]}
      />
    );
  },
};
