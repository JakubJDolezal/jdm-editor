import { default as React } from 'react';
import { StoreApi } from 'zustand';

export type VMEntry = {
    id: string;
    model_name: string;
    page: string;
};
export type ApiResponse = {
    model_names: string[];
};
export type VMStore = {
    configurable: boolean;
    disabled: boolean;
    addRowAbove: (index?: number, data?: Partial<VMEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<VMEntry>) => void;
    vms: VMEntry[];
    setVMs: (vms: VMEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<VMEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
};
type VMStoreProviderProps = {};
export declare const createVM: (data?: Partial<VMEntry>) => VMEntry;
export declare const VMStoreProvider: React.FC<React.PropsWithChildren<VMStoreProviderProps>>;
export declare function useVMStore<T>(selector: (state: VMStore) => T, equals?: (a: any, b: any) => boolean): T;
export declare const useVMStoreRaw: () => {
    (): VMStore;
    <U>(selector: (state: VMStore) => U): U;
    <U_1>(selector: (state: VMStore) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<VMStore> & {
    setState: (partial: Partial<VMStore>) => void;
};
export {};
//# sourceMappingURL=vm-store.context.d.ts.map