import type { NodeSpecification } from './specification-types';
export type DecisionTableInput = {
    id?: string;
    name?: string;
    field?: string;
};
export type DecisionTableOutput = {
    id?: string;
    name?: string;
    field?: string;
};
export type NodeDecisionTableData = {
    hitPolicy?: 'first' | 'collect';
    inputs?: DecisionTableInput[];
    outputs?: DecisionTableOutput[];
    rules?: Record<string, string>[];
};
export declare const decisionTableSpecification: NodeSpecification<NodeDecisionTableData>;
//# sourceMappingURL=decision-table.specification.d.ts.map