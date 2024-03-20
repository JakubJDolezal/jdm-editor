import type React from 'react';
import { type DecisionGraphStoreType, type DecisionGraphType } from './context/dg-store.context';
import type { NodeSpecification } from './nodes/specification-types';
export type DecisionGraphEmptyType = {
    id?: string;
    defaultValue?: DecisionGraphType;
    value?: DecisionGraphType;
    disabled?: boolean;
    configurable?: boolean;
    components?: NodeSpecification[];
    onChange?: DecisionGraphStoreType['listeners']['onChange'];
    onSimulationRun?: DecisionGraphStoreType['listeners']['onSimulationRun'];
    onSimulatorOpen?: DecisionGraphStoreType['listeners']['onSimulatorOpen'];
    onReactFlowInit?: DecisionGraphStoreType['listeners']['onReactFlowInit'];
};
export declare const DecisionGraphEmpty: React.FC<DecisionGraphEmptyType>;
//# sourceMappingURL=dg-empty.d.ts.map