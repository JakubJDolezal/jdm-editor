import { default as React } from 'react';
import { StoreApi } from 'zustand';

export type ModelEntry = {
    id: string;
    model_name: string;
    allowed_categories: string[];
    usage_type: "Whole text" | "Sentences" | "Spans";
    key: string;
    url: string;
};
export type ApiResponse = {
    model_names: string[];
    allowed_categories: {
        [key: string]: string[];
    };
};
export type ModelStore = {
    configurable: boolean;
    disabled: boolean;
    addRowAbove: (index?: number, data?: Partial<ModelEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<ModelEntry>) => void;
    models: ModelEntry[];
    setModels: (models: ModelEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<ModelEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
};
type ModelStoreProviderProps = {};
export declare const createModel: (data?: Partial<ModelEntry>) => ModelEntry;
export declare const ModelStoreProvider: React.FC<React.PropsWithChildren<ModelStoreProviderProps>>;
export declare function useModelStore<T>(selector: (state: ModelStore) => T, equals?: (a: any, b: any) => boolean): T;
export declare const useModelStoreRaw: () => {
    (): ModelStore;
    <U>(selector: (state: ModelStore) => U): U;
    <U_1>(selector: (state: ModelStore) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<ModelStore> & {
    setState: (partial: Partial<ModelStore>) => void;
};
export {};
//# sourceMappingURL=model-store.context.d.ts.map