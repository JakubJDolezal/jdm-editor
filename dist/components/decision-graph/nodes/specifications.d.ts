import { NodeSpecification } from './specification-types';

export declare const nodeSpecification: Readonly<{
    inputNode: NodeSpecification<never>;
    outputNode: NodeSpecification<never>;
    decisionTableNode: NodeSpecification<import('./decision-table.specification').NodeDecisionTableData>;
    expressionNode: NodeSpecification<import('./expression.specification').NodeExpressionData>;
    switchNode: NodeSpecification<import('./switch.specification').NodeSwitchData>;
    modelNode: NodeSpecification<import('./model-component.specification').NodeModelComponentData>;
    genAINode: NodeSpecification<import('./generative-ai.specification').NodeGenAIData>;
    cruftModelNode: NodeSpecification<import('./cruft-model-component.specification').NodeCruftModelComponentData>;
    visualModelNode: NodeSpecification<import('./vision-model.specification').NodeVMData>;
    pythonFunctionNode: NodeSpecification<import('./python-function.specification').NodeGenAIData>;
}>;
//# sourceMappingURL=specifications.d.ts.map