import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

const CruftModelStoreContext = React.createContext<
  UseBoundStore<StoreApi<CruftModelStore>> & {
    setState: (partial: Partial<CruftModelStore>) => void;
  }
>({} as any);

export type CruftModelEntry = {
  id: string;
  cruft_model_name: string;
  cruft_categories: string[];
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

type CruftModelStoreProviderProps = {
  //
};

export const createCruftModel = (data: Partial<CruftModelEntry> = {}): CruftModelEntry => ({
  id: v4(),
  cruft_model_name: '',
  cruft_categories: ['None'],
  ...data,
});

export const CruftModelStoreProvider: React.FC<React.PropsWithChildren<CruftModelStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<CruftModelStore>((set) => ({
        configurable: true,
        disabled: false,
        addRowAbove: (index = 0) => {
          set(
            produce<CruftModelStore>((draft) => {
              draft.cruft_models.splice(index, 0, createCruftModel());
              return draft;
            }),
          );
        },
        addRowBelow: (index) => {
          set(
            produce<CruftModelStore>((draft) => {
              index = index ?? draft.cruft_models.length - 1;
              draft.cruft_models.splice(index + 1, 0, createCruftModel());

              return draft;
            }),
          );
        },
        cruft_models: [],
        setCruftModels: (cruft_models) => {
          set({ cruft_models });
        },
        swapRows: (sourceIndex, targetIndex) => {
          set(
            produce<CruftModelStore>((draft) => {
              const [input] = draft.cruft_models.splice(sourceIndex, 1);
              draft.cruft_models.splice(targetIndex, 0, input);

              return draft;
            }),
          );
        },
        removeRow: (index) => {
          set(
            produce<CruftModelStore>((draft) => {
              draft.cruft_models.splice(index, 1);
              return draft;
            }),
          );
        },
        updateRow: (index, update) => {
          set(
            produce<CruftModelStore>((draft) => {
              draft.cruft_models[index] = {
                ...draft.cruft_models[index],
                ...update,
              };

              return draft;
            }),
          );
        },
      })),
    [],
  );

  return <CruftModelStoreContext.Provider value={store}>{children}</CruftModelStoreContext.Provider>;
};

export function useCruftModelStore<T>(
  selector: (state: CruftModelStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(CruftModelStoreContext)(selector, equals);
}

export const useCruftModelStoreRaw = () => React.useContext(CruftModelStoreContext);
