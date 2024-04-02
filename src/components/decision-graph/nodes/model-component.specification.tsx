import {HighlightOutlined, RobotOutlined} from '@ant-design/icons';


import { Button } from 'antd';

import { useDecisionGraphActions } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';


export type ModelComponent = {
  id?: string;
  modelName?: string;
  allowed_categories: string[];
};

export type NodeModelComponentData = {
  models?: ModelComponent[];
};


export const modelComponentSpecification: NodeSpecification<NodeModelComponentData> = {
  type: NodeKind.Model,
  icon:   <>
    <HighlightOutlined />
    <RobotOutlined />
  </>,
  displayName: 'Custom Component',
  documentationUrl: 'https://example.com/docs/custom-components',
  shortDescription: 'Model component node',
  generateNode: () => ({
    name: 'myModel',
    content: {models:[]},
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
            Edit Model Call
          </Button>,
        ]}
      />
    );
  },
};

