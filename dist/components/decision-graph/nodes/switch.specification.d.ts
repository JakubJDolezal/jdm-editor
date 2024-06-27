import { NodeSpecification } from './specification-types';

export type SwitchStatement = {
    id?: string;
    condition?: string;
};
export type NodeSwitchData = {
    hitPolicy?: 'first' | 'collect';
    statements?: SwitchStatement[];
};
export declare const switchSpecification: NodeSpecification<NodeSwitchData>;
//# sourceMappingURL=switch.specification.d.ts.map