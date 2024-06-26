type Input = unknown;
type Output = unknown;
export type Simulation = {
    result?: SimulationOk;
} | {
    error?: SimulationError;
};
export type SimulationError = {
    title?: string;
    message?: string;
    data: {
        nodeId?: string;
    };
};
export type SimulationOk = {
    performance: string;
    result: Output;
    trace: Record<string, SimulationTrace>;
};
type TraceDataVariants = SimulationTraceDataTable | SimulationTraceDataFunction | SimulationTraceDataExpression | SimulationTraceDataSwitch | null;
export type SimulationTrace<Trace = TraceDataVariants> = {
    input: Input | null;
    output: Output | null;
    name: string;
    id: string;
    performance: string | null;
    traceData: Trace;
};
export type SimulationTraceDataFunction = {
    log?: TraceFunctionLog[];
};
export type SimulationTraceDataExpression = object;
export type SimulationTraceDataTable = {
    index: number;
    reference_map: Record<string, unknown>;
    rule: Record<string, string>;
};
export type SimulationTraceDataSwitch = {
    statements: {
        id: string;
    }[];
};
type TraceFunctionLog = {
    lines: string[];
    msSinceRun: number;
};
export {};
//# sourceMappingURL=simulation.types.d.ts.map