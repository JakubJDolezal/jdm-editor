import { NodeSpecification } from './specification-types';

export type CruftModelComponent = {
    id?: string;
    modelName?: string;
    cruft_categories: string[];
    cruft_url: string;
    source: string;
    target: string;
};
export type NodeCruftModelComponentData = {
    cruft_models?: CruftModelComponent[];
};
export declare const cruft_modelComponentSpecification: NodeSpecification<NodeCruftModelComponentData>;
//# sourceMappingURL=cruft-model-component.specification.d.ts.map