import * as React from 'react';
import type { StoreApi } from 'zustand';
export type GAEntry = {
    id: string;
    prompt: string;
    choice: 'json' | 'append' | 'collection';
    name: string;
    linked: string;
    model : string,
    platform : string,
    location: string,
};
export type GAStore = {
    configurable: boolean;
    disabled: boolean;
    addRowAbove: (index?: number, data?: Partial<GAEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<GAEntry>) => void;
    gas: GAEntry[];
    setGAs: (gas: GAEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<GAEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
};
type GAStoreProviderProps = {};
export declare const createGA: (data?: Partial<GAEntry>) => GAEntry;
export declare const GAStoreProvider: React.FC<React.PropsWithChildren<GAStoreProviderProps>>;
export declare function useGAStore<T>(selector: (state: GAStore) => T, equals?: (a: any, b: any) => boolean): T;
export declare const useGAStoreRaw: () => {
    (): GAStore;
    <U>(selector: (state: GAStore) => U): U;
    <U_1>(selector: (state: GAStore) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<GAStore> & {
    setState: (partial: Partial<GAStore>) => void;
};
export {};
//# sourceMappingURL=ga-store.context.d.ts.map