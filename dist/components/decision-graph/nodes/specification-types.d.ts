import type React from 'react';
import type { NodeProps } from 'reactflow';
import type { DecisionNode } from '../context/dg-store.context';
import type { DecisionNodeProps } from './decision-node';
export declare enum NodeKind {
    Input = "inputNode",
    Output = "outputNode",
    DecisionTable = "decisionTableNode",
    Function = "functionNode",
    Expression = "expressionNode",
    Switch = "switchNode",
    Model = "modelNode",
    CruftModel = "cruftModelNode",
    GenAI = "genAINode",
    VisualModel = "visualModelNode"
}
export type MinimalNodeProps = Pick<NodeProps, 'id' | 'data' | 'selected'>;
export type MinimalNodeSpecification = Pick<NodeSpecification, 'color' | 'icon' | 'displayName' | 'documentationUrl'>;
export type NodeSpecification<T = any> = {
    icon: React.ReactNode;
    type: string;
    color?: DecisionNodeProps['color'];
    displayName: string;
    documentationUrl?: string;
    shortDescription: string;
    generateNode: () => Omit<DecisionNode<T>, 'position' | 'id' | 'type'>;
    renderNode: React.FC<MinimalNodeProps & {
        specification: MinimalNodeSpecification;
    }>;
    onNodeAdd?: (node: DecisionNode<T>) => Promise<DecisionNode<T>>;
};
//# sourceMappingURL=specification-types.d.ts.map