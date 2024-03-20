import type { NodeSpecification } from './specification-types';
export type ModelComponent = {
    id?: string;
    type?: string;
};
export type NodeModelComponentData = {
    selectedComponentType?: string;
    components?: ModelComponent[];
};
export declare const modelComponentSpecification: NodeSpecification<NodeModelComponentData>;
//# sourceMappingURL=model-component.specification.d.ts.map