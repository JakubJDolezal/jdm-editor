import { default as React } from 'react';
import { HandleProps } from 'reactflow';
import { DecisionNodeProps } from './decision-node';
import { MinimalNodeSpecification } from './specification-types';

export type GraphNodeProps = {
    id: string;
    handleLeft?: boolean | Partial<HandleProps>;
    handleRight?: boolean | Partial<HandleProps>;
    className?: string;
    specification: MinimalNodeSpecification;
} & Partial<DecisionNodeProps>;
export declare const GraphNode: React.FC<GraphNodeProps>;
//# sourceMappingURL=graph-node.d.ts.map