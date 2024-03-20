import type { NodeSpecification } from './specification-types';
export type CustomComponent = {
    id?: string;
    type?: string;
};
export type NodeCustomComponentData = {
    selectedComponentType?: string;
    components?: CustomComponent[];
};
export declare const customComponentSpecification: NodeSpecification<NodeCustomComponentData>;
//# sourceMappingURL=custom-component.specification.d.ts.map