import { default as React } from 'react';
import { SimulationTrace, SimulationTraceDataFunction } from '../decision-graph/types/simulation.types';

export type FunctionProps = {
    disabled?: boolean;
    defaultValue?: string;
    disableDebug?: boolean;
    language?: string;
    value?: string;
    onChange?: (value: string) => void;
    trace?: SimulationTrace<SimulationTraceDataFunction>;
};
export declare const Function: React.FC<FunctionProps>;
//# sourceMappingURL=function.d.ts.map