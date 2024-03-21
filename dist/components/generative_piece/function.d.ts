import React from 'react';
import type { SimulationTrace, SimulationTraceDataFunction } from '../decision-graph/types/simulation.types';
import './function.scss';
import './monaco';
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