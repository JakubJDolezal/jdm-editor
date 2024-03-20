import React from 'react';
import type { HandleProps } from 'reactflow';
import type { DecisionNodeProps } from './decision-node';
import type { MinimalNodeSpecification } from './specification-types';
export type GraphNodeProps = {
    id: string;
    handleLeft?: boolean | Partial<HandleProps>;
    handleRight?: boolean | Partial<HandleProps>;
    className?: string;
    specification: MinimalNodeSpecification;
} & Partial<DecisionNodeProps>;
export declare const GraphNode: React.FC<GraphNodeProps>;
//# sourceMappingURL=graph-node.d.ts.map