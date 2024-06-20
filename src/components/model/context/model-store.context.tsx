import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

const ModelStoreContext = React.createContext<
  UseBoundStore<StoreApi<ModelStore>> & {
    setState: (partial: Partial<ModelStore>) => void;
  }
>({} as any);

export type ModelEntry = {
  id: string;
  model_name: string;
  allowed_categories: string[];
  usage_type: "Whole text"| "Sentences" | "Spans";
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

type ModelStoreProviderProps = {
  //
};

export const createModel = (data: Partial<ModelEntry> = {}): ModelEntry => ({
  id: v4(),
  model_name: '',
  allowed_categories: ['None'],
  usage_type: 'Whole text',
  key: "document",
  url: "http://ai-text-classifier/api/ai/classify_docs",
  ...data,
});

export const ModelStoreProvider: React.FC<React.PropsWithChildren<ModelStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<ModelStore>((set) => ({
        configurable: true,
        disabled: false,
        addRowAbove: (index = 0) => {
          set(
            produce<ModelStore>((draft) => {
              draft.models.splice(index, 0, createModel());
              return draft;
            }),
          );
        },
        addRowBelow: (index) => {
          set(
            produce<ModelStore>((draft) => {
              index = index ?? draft.models.length - 1;
              draft.models.splice(index + 1, 0, createModel());

              return draft;
            }),
          );
        },
        models: [],
        setModels: (models) => {
          set({ models });
        },
        swapRows: (sourceIndex, targetIndex) => {
          set(
            produce<ModelStore>((draft) => {
              const [input] = draft.models.splice(sourceIndex, 1);
              draft.models.splice(targetIndex, 0, input);

              return draft;
            }),
          );
        },
        removeRow: (index) => {
          set(
            produce<ModelStore>((draft) => {
              draft.models.splice(index, 1);
              return draft;
            }),
          );
        },
        updateRow: (index, update) => {
          set(
            produce<ModelStore>((draft) => {
              draft.models[index] = {
                ...draft.models[index],
                ...update,
              };

              return draft;
            }),
          );
        },
      })),
    [],
  );

  return <ModelStoreContext.Provider value={store}>{children}</ModelStoreContext.Provider>;
};

export function useModelStore<T>(
  selector: (state: ModelStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(ModelStoreContext)(selector, equals);
}

export const useModelStoreRaw = () => React.useContext(ModelStoreContext);
