import type React from 'react';
import type { SchemaSelectProps } from '../../helpers/components';
import { type DecisionTableType } from './context/dt-store.context';
import type { TableCellProps } from './table/table-default-cell';
export type DecisionTableEmptyType = {
    id?: string;
    defaultValue?: DecisionTableType;
    value?: DecisionTableType;
    disabled?: boolean;
    configurable?: boolean;
    disableHitPolicy?: boolean;
    activeRules?: string[];
    cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined;
    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];
    minColWidth?: number;
    colWidth?: number;
    onChange?: (val: DecisionTableType) => void;
};
export declare const DecisionTableEmpty: React.FC<DecisionTableEmptyType>;
//# sourceMappingURL=dt-empty.d.ts.map