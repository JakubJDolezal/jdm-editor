import {HighlightOutlined, DownOutlined, RobotOutlined, CommentOutlined} from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Typography } from 'antd';
import clsx from 'clsx';
import { v4 } from 'uuid';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { MinimalNodeProps, NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';
import { P, match } from 'ts-pattern';


export type ModelComponent = {
  id?: string;
  type?: string;
};

export type NodeModelComponentData = {
  modelName?: 'Mixtral' | 'DebertaNer';
  components?: ModelComponent[];
};


export const modelComponentSpecification: NodeSpecification<NodeModelComponentData> = {
  type: NodeKind.Model,
  icon:   <>
    <RobotOutlined />
    <HighlightOutlined />
  </>,
  displayName: 'Custom Component',
  documentationUrl: 'https://example.com/docs/custom-components',
  shortDescription: 'Model component node',
  generateNode: () => ({
    name: 'myModel',
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
  const { content, disabled, nodeTrace } = useDecisionGraphState(({ decisionGraph, disabled, simulate }) => ({
    nodeTrace: match(simulate)
      .with({ result: P._ }, ({ result }) => result?.trace?.[id]?.traceData)
      .otherwise(() => null),
    content: (decisionGraph?.nodes || []).find((n) => n?.id === id)?.content as NodeModelComponentData | undefined,
    disabled,
  }));

  const modelName = content?.modelName || 'Mixtral';

  const [fetchError, setFetchError] = useState(false);


  useEffect(() => {
  fetch('http://localhost:8000/api/model-component-data/')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((fetchedData: NodeModelComponentData) => {
      graphActions.updateNode(id, (node) => {
        node.content = { ...node.content, ...fetchedData };
        return node;
      });
    })
    .catch((error) => {
      console.error('Fetching model component data failed:', error);
      setFetchError(true);
    });
  }, [id, graphActions]);

  const changeModel = (modelName: string) => {
    graphActions.updateNode(id, (node) => {
      node.content.modelName = modelName;
      return node;
    });
  };

  return (
    <GraphNode
      id={id}
      className={clsx(['model'])}
      specification={specification}
      name={data.name}
      handleRight={true}
      noBodyPadding
      isSelected={selected}
      actions={[
        <Dropdown
          key='modelName'
          trigger={['click']}
          placement='bottomRight'
          disabled={disabled}
          menu={{
            items: [
              {
                key: 'debertaner',
                label: 'DebertaNer',
                onClick: () => changeModel('DebertaNer'),
              },
              {
                key: 'mixtral',
                label: 'Mixtral',
                onClick: () => changeModel('Mixtral'),
              },
            ],
          }}
        >

          <Button type='link' style={{ textTransform: 'capitalize', marginLeft: 'auto' }}>
            {modelName} <DownOutlined />
          </Button>
        </Dropdown>,
      ]}
    >
      <div className='switchNode'>
        <div className='switchNode__body edit nodrag'>
          {(1) && (
            <Typography.Text type={'secondary'} className={'no-conditions'}>
              No conditions
            </Typography.Text>
          )}
          {fetchError && (
            <Typography.Text type={'danger'}>
              Error fetching model data.
            </Typography.Text>
          )}
        </div>
      </div>
    </GraphNode>
  );
};

