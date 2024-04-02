import type { NodeSpecification } from './specification-types';
export declare const nodeSpecification: Readonly<{
    inputNode: NodeSpecification<never>;
    outputNode: NodeSpecification<never>;
    decisionTableNode: NodeSpecification<import("./decision-table.specification").NodeDecisionTableData>;
    functionNode: NodeSpecification<string>;
    expressionNode: NodeSpecification<import("./expression.specification").NodeExpressionData>;
    switchNode: NodeSpecification<import("./switch.specification").NodeSwitchData>;
    modelNode: NodeSpecification<import("./model-component.specification").NodeModelComponentData>;
    genAINode: NodeSpecification<import("./generative-ai.specification").NodeGenAIData>;
}>;
//# sourceMappingURL=specifications.d.ts.map