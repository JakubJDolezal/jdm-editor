import { BookOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React from 'react';

import { platform } from '../../../helpers/platform';
import { SpacedText } from '../../spaced-text';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeModelData = {
  selectedComponentType?: string; // Adjust based on your model node's data structure
};

export const modelComponentSpecification: NodeSpecification<NodeModelData> = {
  type: NodeKind.Model,
  icon: <BookOutlined />,
  displayName: 'Model Component',
  color: 'secondary',
  documentationUrl: 'https://example.com/docs/model-components', // Adjust URL as needed
  shortDescription: 'Represents a model component',
  generateNode: () => ({
    name: 'myModelComponent',
    content: {
      selectedComponentType: '', // Initialize with appropriate default value
    },
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    const { disabled } = useDecisionGraphState(({ disabled }) => ({
      disabled,
    }));

    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        handleLeft={false} // Adjust handle position if needed
        menuItems={[
          {
            key: 'documentation',
            icon: <BookOutlined />,
            label: 'Documentation',
            onClick: () => window.open(specification.documentationUrl, '_href'),
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            danger: true,
            label: <SpacedText left='Delete' right={platform.shortcut('Backspace')} />,
            disabled,
            onClick: () =>
              Modal.confirm({
                icon: null,
                title: 'Delete node',
                content: (
                  <Typography.Text>
                    Are you sure you want to delete <Typography.Text strong>{data.name}</Typography.Text> node.
                  </Typography.Text>
                ),
                okButtonProps: { danger: true },
                onOk: () => graphActions.removeNodes([id]),
              }),
          },
        ]}
      />
    );
  },
};
