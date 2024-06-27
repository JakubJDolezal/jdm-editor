import { NodeSpecification } from './specification-types';

export type ModelComponent = {
    id?: string;
    modelName?: string;
    allowed_categories: string[];
    usage_type: "Whole text" | "Sentences" | "Spans";
    key: string;
    url: string;
};
export type NodeModelComponentData = {
    models?: ModelComponent[];
};
export declare const modelComponentSpecification: NodeSpecification<NodeModelComponentData>;
//# sourceMappingURL=model-component.specification.d.ts.map