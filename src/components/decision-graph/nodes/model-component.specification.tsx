import {CommentOutlined, DeleteOutlined, DownOutlined} from '@ant-design/icons';
import { Button, Dropdown, Typography } from 'antd';
import clsx from 'clsx';
import React, {useLayoutEffect, useState} from 'react';
import { v4 } from 'uuid';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { MinimalNodeProps, NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';
import { P, match } from 'ts-pattern';
import {AutosizeTextArea} from "../../autosize-text-area";
import {Handle, Position} from "reactflow";
import {NodeSwitchData, SwitchStatement} from "./switch.specification";

export type ModelComponent = {
  id?: string;
  type?: string;
};

export type NodeModelComponentData = {
  selectedComponentType?: string;
  components?: ModelComponent[];
};
//
// const componentList = [
//   { id: 'comp1', name: 'Component 1' },
//   { id: 'comp2', name: 'Component 2' },
// ];

export const modelComponentSpecification: NodeSpecification<NodeModelComponentData> = {
  type: NodeKind.Model,
  icon: <CommentOutlined />,
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
    content: (decisionGraph?.nodes || []).find((n) => n?.id === id)?.content as NodeSwitchData | undefined,
    disabled,
  }));

  const statements: SwitchStatement[] = content?.statements || [];
  const hitPolicy = content?.hitPolicy || 'first';

  const changeHitPolicy = (hitPolicy: string) => {
    graphActions.updateNode(id, (node) => {
      node.content.hitPolicy = hitPolicy;
      return node;
    });
  };

  return (
    <GraphNode
      id={id}
      className={clsx(['switch'])}
      specification={specification}
      name={data.name}
      handleRight={false}
      noBodyPadding
      isSelected={selected}
      actions={[
        <Button
          key='add row'
          type='link'
          disabled={disabled}
          onClick={() => {
            graphActions.updateNode(id, (draft) => {
              draft.content.statements.push({ id: v4(), condition: '' });
              return draft;
            });
          }}
        >
          Add row
        </Button>,
        <Dropdown
          key='hitPolicy'
          trigger={['click']}
          placement='bottomRight'
          disabled={disabled}
          menu={{
            items: [
              {
                key: 'first',
                label: 'First',
                onClick: () => changeHitPolicy('first'),
              },
              {
                key: 'collect',
                label: 'Collect',
                onClick: () => changeHitPolicy('collect'),
              },
            ],
          }}
        >
          <Button type='link' style={{ textTransform: 'capitalize', marginLeft: 'auto' }}>
            {hitPolicy} <DownOutlined />
          </Button>
        </Dropdown>,
      ]}
    >
      <div className='switchNode'>
        <div className='switchNode__body edit nodrag'>
          {!(statements?.length > 0) && (
            <Typography.Text type={'secondary'} className={'no-conditions'}>
              No conditions
            </Typography.Text>
          )}
          {statements.map((statement) => (
            <SwitchHandle
              key={statement.id}
              value={statement.condition}
              id={statement.id}
              disabled={disabled}
              isActive={match(nodeTrace)
                .with({ statements: P.array(P._) }, ({ statements }) =>
                  statements.some((s) => s?.id && s?.id === statement?.id),
                )
                .otherwise(() => false)}
              onDelete={() => {
                graphActions.updateNode(id, (draft) => {
                  draft.content.statements = draft.content.statements.filter(
                    (s: SwitchStatement) => s?.id !== statement?.id,
                  );

                  return draft;
                });
              }}
              onChange={(condition) => {
                graphActions.updateNode(id, (draft) => {
                  const draftStatement = draft.content.statements.find((s: SwitchStatement) => {
                    return s.id === statement.id;
                  });

                  draftStatement.condition = condition;
                  return draft;
                });
              }}
            />
          ))}
        </div>
      </div>
    </GraphNode>
  );
};

const SwitchHandle: React.FC<{
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  configurable?: boolean;
}> = ({ id, value, onChange, disabled, configurable = true, onDelete, isActive }) => {
  const [inner, setInner] = useState(value);
  useLayoutEffect(() => {
    if (inner !== value) {
      setInner(value);
    }
  }, [value]);

  const handleChange = (val: string) => {
    setInner(val);
    onChange?.(val);
  };

  return (
    <div className={clsx('switchNode__statement')}>
      <div className='switchNode__statement__inputArea'>
        <AutosizeTextArea
          placeholder={`Enter condition (e.g. x > 10)`}
          style={{
            fontSize: 12,
            lineHeight: '20px',
          }}
          value={inner}
          maxRows={4}
          readOnly={disabled}
          onChange={(e) => handleChange?.(typeof e.target.value === 'string' ? e.target.value : '')}
        />
        {!disabled && configurable && (
          <Button
            className='switchNode__statement__more'
            size='small'
            type='text'
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete?.()}
          />
        )}
      </div>
      <Handle
        id={id}
        type='source'
        position={Position.Right}
        className={clsx(isActive && 'switchNode__activeHandle')}
      />
    </div>
  );
};
