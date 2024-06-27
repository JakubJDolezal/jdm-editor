import { default as React } from 'react';
import { StoreApi } from 'zustand';

export type CruftModelEntry = {
    id: string;
    cruft_model_name: string;
    cruft_categories: string[];
    cruft_url: string;
    source: string;
    target: string;
};
export type ApiResponse = {
    cruft_model_names: string[];
    allowed_categories: {
        [key: string]: string[];
    };
};
export type CruftModelStore = {
    configurable: boolean;
    disabled: boolean;
    addRowAbove: (index?: number, data?: Partial<CruftModelEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<CruftModelEntry>) => void;
    cruft_models: CruftModelEntry[];
    setCruftModels: (cruft_models: CruftModelEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<CruftModelEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
};
type CruftModelStoreProviderProps = {};
export declare const createCruftModel: (data?: Partial<CruftModelEntry>) => CruftModelEntry;
export declare const CruftModelStoreProvider: React.FC<React.PropsWithChildren<CruftModelStoreProviderProps>>;
export declare function useCruftModelStore<T>(selector: (state: CruftModelStore) => T, equals?: (a: any, b: any) => boolean): T;
export declare const useCruftModelStoreRaw: () => {
    (): CruftModelStore;
    <U>(selector: (state: CruftModelStore) => U): U;
    <U_1>(selector: (state: CruftModelStore) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<CruftModelStore> & {
    setState: (partial: Partial<CruftModelStore>) => void;
};
export {};
//# sourceMappingURL=cruft_model-store.context.d.ts.map