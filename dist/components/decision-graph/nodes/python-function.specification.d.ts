import { NodeSpecification } from './specification-types';

export type NodeGenAIData = {
    pfs?: PFEntry[];
};
export type PFEntry = {
    id: string;
    location: string;
    module: string;
    func: string;
};
export declare const pythonFuncSpecification: NodeSpecification<NodeGenAIData>;
//# sourceMappingURL=python-function.specification.d.ts.map