import type { NodeSpecification } from './specification-types';
export type NodeVMData = {
    vms?: VMEntry[];
};
export type VMEntry = {
    id: string;
    model_name: string;
    page: string;
};
export declare const genAiSpecification: NodeSpecification<NodeVMData>;
//# sourceMappingURL=vision-model.specification.d.ts.map