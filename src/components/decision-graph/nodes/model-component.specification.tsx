import { CommentOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Typography } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import { v4 } from 'uuid';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { MinimalNodeProps, NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type ModelComponent = {
  id?: string;
  type?: string; // Additional properties can be added here based on the component's needs
};

export type NodeModelComponentData = {
  selectedComponentType?: string;
  components?: ModelComponent[];
};

// Sample list of custom components
const componentList = [
  { id: 'comp1', name: 'Component 1' },
  { id: 'comp2', name: 'Component 2' },
  // Add more components as needed
];

export const modelComponentSpecification: NodeSpecification<NodeModelComponentData> = {
  type: NodeKind.Model,
  icon: <CommentOutlined />,
  displayName: 'Custom Component',
  documentationUrl: 'https://example.com/docs/custom-components',
  shortDescription: 'Custom component node',
  generateNode: () => ({
    name: 'modelComponent',
    content: {
      components: [{ id: v4(), type: '' }],
    },
  }),
  renderNode: ({ specification, ...props }) => <ModelComponentNode specification={specification} {...props} />,
};

const ModelComponentNode: React.FC<
  MinimalNodeProps & {
    specification: Pick<NodeSpecification, 'displayName' | 'icon' | 'documentationUrl'>;
  }
> = ({ id, data, selected, specification }) => {
  const graphActions = useDecisionGraphActions();
  const { content, disabled } = useDecisionGraphState(({ decisionGraph }) => ({
    content: (decisionGraph?.nodes || []).find((n) => n?.id === id)?.content as NodeCustomComponentData | undefined,
    disabled,
  }));

  const [selectedComponent, setSelectedComponent] = useState('');

  const onComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
    graphActions.updateNode(id, (node) => {
      node.content.selectedComponentType = componentId;
      return node;
    });
  };

  return (
    <GraphNode
      id={id}
      className={clsx(['model-component'])}
      specification={specification}
      name={data.name}
      handleRight={false}
      noBodyPadding
      isSelected={selected}
      actions={[
        <Dropdown
          key='componentSelector'
          trigger={['click']}
          placement='bottomRight'
          disabled={disabled}
          overlay={
            <Menu
              items={componentList.map((comp) => ({
                key: comp.id,
                label: comp.name,
                onClick: () => onComponentSelect(comp.id),
              }))}
            />
          }
        >
          <Button type='link' style={{ textTransform: 'capitalize', marginLeft: 'auto' }}>
            Select Component <DownOutlined />
          </Button>
        </Dropdown>,
      ]}
    >
      <div className='ModelComponentNode'>
        <div className='modelComponentNode__body edit nodrag'>
          {selectedComponent ? (
            <Typography.Text>{`Selected Component: ${selectedComponent}`}</Typography.Text>
          ) : (
            <Typography.Text type={'secondary'} className={'no-component'}>
              No component selected
            </Typography.Text>
          )}
        </div>
      </div>
    </GraphNode>
  );
};
