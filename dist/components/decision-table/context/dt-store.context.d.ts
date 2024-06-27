import { default as React } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';
import { SchemaSelectProps } from '../../../helpers/components';
import { TableCellProps } from '../table/table-default-cell';

export type TableExportOptions = {
    name?: string;
};
export type TableCursor = {
    x: string;
    y: number;
};
export type TableSchemaItem = {
    id: string;
    name: string;
    field?: string;
    type: string;
    defaultValue?: string;
};
export type HitPolicy = 'first' | 'collect';
export type ColumnType = 'inputs' | 'outputs';
export type DecisionTableType = {
    hitPolicy: HitPolicy | string;
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
    rules: Record<string, string>[];
};
export declare const parseDecisionTable: (decisionTable?: DecisionTableType) => DecisionTableType;
export type DecisionTableStoreType = {
    state: {
        id?: string;
        name?: string;
        decisionTable: DecisionTableType;
        cursor: TableCursor | null;
        activeRules: string[];
        disabled: boolean;
        configurable: boolean;
        disableHitPolicy: boolean;
        minColWidth: number;
        colWidth: number;
        inputsSchema?: SchemaSelectProps[];
        outputsSchema?: SchemaSelectProps[];
    };
    actions: {
        setDecisionTable: (val: DecisionTableType) => void;
        setCursor: (cursor: TableCursor | null) => void;
        commitData: (data: string, cursor: TableCursor) => void;
        swapRows: (source: number, target: number) => void;
        addRowAbove: (target?: number) => void;
        addRowBelow: (target?: number) => void;
        removeRow: (target?: number) => void;
        addColumn: (type: ColumnType, column: TableSchemaItem) => void;
        updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void;
        removeColumn: (type: ColumnType, id: string) => void;
        reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void;
        updateHitPolicy: (hitPolicy: HitPolicy) => void;
    };
    listeners: {
        onChange?: (val: DecisionTableType) => void;
        cellRenderer?: (props: TableCellProps) => React.ReactNode | null | undefined;
        onColumnResize?: () => void;
    };
};
type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
    setState: (partial: Partial<T>) => void;
};
export type DecisionTableContextProps = {};
export declare const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>>;
export declare function useDecisionTableState<T>(selector: (state: DecisionTableStoreType['state']) => T, equals?: (a: any, b: any) => boolean): T;
export declare function useDecisionTableListeners<T>(selector: (state: DecisionTableStoreType['listeners']) => T, equals?: (a: any, b: any) => boolean): T;
export declare function useDecisionTableActions(): DecisionTableStoreType['actions'];
export declare const useDecisionTableRaw: () => {
    stateStore: ExposedStore<DecisionTableStoreType['state']>;
    listenerStore: ExposedStore<DecisionTableStoreType['listeners']>;
    actions: DecisionTableStoreType['actions'];
};
export default DecisionTableProvider;
//# sourceMappingURL=dt-store.context.d.ts.map