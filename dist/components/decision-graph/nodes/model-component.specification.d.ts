import type { NodeSpecification } from './specification-types';
export type ModelComponent = {
    id?: string;
    modelName?: string;
    allowed_categories: string[];
};
export type NodeModelComponentData = {
    models?: ModelComponent[];
};
export declare const modelComponentSpecification: NodeSpecification<NodeModelComponentData>;
//# sourceMappingURL=model-component.specification.d.ts.map