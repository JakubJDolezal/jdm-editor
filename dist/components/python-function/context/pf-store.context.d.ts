import { default as React } from 'react';
import { StoreApi } from 'zustand';

export type PFEntry = {
    id: string;
    location: string;
    module: string;
    func: string;
};
export type PFStore = {
    configurable: boolean;
    disabled: boolean;
    addRowAbove: (index?: number, data?: Partial<PFEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<PFEntry>) => void;
    pfs: PFEntry[];
    setPFs: (pfs: PFEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<PFEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
};
type PFStoreProviderProps = {};
export declare const createPF: (data?: Partial<PFEntry>) => PFEntry;
export declare const PFStoreProvider: React.FC<React.PropsWithChildren<PFStoreProviderProps>>;
export declare function usePFStore<T>(selector: (state: PFStore) => T, equals?: (a: any, b: any) => boolean): T;
export declare const usePFStoreRaw: () => {
    (): PFStore;
    <U>(selector: (state: PFStore) => U): U;
    <U_1>(selector: (state: PFStore) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<PFStore> & {
    setState: (partial: Partial<PFStore>) => void;
};
export {};
//# sourceMappingURL=pf-store.context.d.ts.map