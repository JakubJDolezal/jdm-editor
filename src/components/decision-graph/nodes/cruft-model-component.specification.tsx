import {ScissorOutlined , RobotOutlined} from '@ant-design/icons';


import { Button } from 'antd';

import { useDecisionGraphActions } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';


export type CruftModelComponent = {
  id?: string;
  modelName?: string;
  cruft_categories: string[];
};

export type NodeCruftModelComponentData = {
  cruft_models?: CruftModelComponent[];
};


export const cruft_modelComponentSpecification: NodeSpecification<NodeCruftModelComponentData> = {
  type: NodeKind.CruftModel,
  icon:   <>
    <ScissorOutlined />
    <RobotOutlined />
  </>,
  displayName: 'Model for decrufting',
  documentationUrl: 'https://example.com/docs/custom-components',
  shortDescription: 'Model for cleaning your text',
  generateNode: () => ({
    name: 'myCruftModel',
    content: {cruft_models:[]},
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
            Edit Cruft Model Call
          </Button>,
        ]}
      />
    );
  },
};

