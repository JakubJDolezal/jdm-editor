import type { NodeSpecification } from './specification-types';
export declare const nodeSpecification: Readonly<{
    inputNode: NodeSpecification<never>;
    outputNode: NodeSpecification<never>;
    decisionTableNode: NodeSpecification<import("./decision-table.specification").NodeDecisionTableData>;
    functionNode: NodeSpecification<string>;
    expressionNode: NodeSpecification<import("./expression.specification").NodeExpressionData>;
    switchNode: NodeSpecification<import("./switch.specification").NodeSwitchData>;
    modelNode: NodeSpecification<import("./custom-component.specification").NodeModelComponentData>;
}>;
//# sourceMappingURL=specifications.d.ts.map