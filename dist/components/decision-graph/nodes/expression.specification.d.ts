import type { NodeSpecification } from './specification-types';
export type Expression = {
    id?: string;
    key?: string;
    value?: string;
};
export type NodeExpressionData = {
    expressions?: Expression[];
};
export declare const expressionSpecification: NodeSpecification<NodeExpressionData>;
//# sourceMappingURL=expression.specification.d.ts.map