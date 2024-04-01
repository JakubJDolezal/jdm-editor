import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

const GAStoreContext = React.createContext<
  UseBoundStore<StoreApi<GAStore>> & {
    setState: (partial: Partial<GAStore>) => void;
  }
>({} as any);

export type GAEntry = {
  id: string;
  prompt: string;
  choice: 'json' | 'append' | 'multi-level json';
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

type GAStoreProviderProps = {
  //
};

export const createGA = (data: Partial<GAEntry> = {}): GAEntry => ({
  id: v4(),
  prompt: '',
  choice: 'json',
  ...data,
});

export const GAStoreProvider: React.FC<React.PropsWithChildren<GAStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<GAStore>((set) => ({
        configurable: true,
        disabled: false,
        addRowAbove: (index = 0) => {
          set(
            produce<GAStore>((draft) => {
              draft.gas.splice(index, 0, createGA());
              return draft;
            }),
          );
        },
        addRowBelow: (index) => {
          set(
            produce<GAStore>((draft) => {
              index = index ?? draft.gas.length - 1;
              draft.gas.splice(index + 1, 0, createGA());

              return draft;
            }),
          );
        },
        gas: [],
        setGAs: (gas) => {
          set({ gas });
        },
        swapRows: (sourceIndex, targetIndex) => {
          set(
            produce<GAStore>((draft) => {
              const [input] = draft.gas.splice(sourceIndex, 1);
              draft.gas.splice(targetIndex, 0, input);

              return draft;
            }),
          );
        },
        removeRow: (index) => {
          set(
            produce<GAStore>((draft) => {
              draft.gas.splice(index, 1);
              return draft;
            }),
          );
        },
        updateRow: (index, update) => {
          set(
            produce<GAStore>((draft) => {
              draft.gas[index] = {
                ...draft.gas[index],
                ...update,
              };

              return draft;
            }),
          );
        },
      })),
    [],
  );

  return <GAStoreContext.Provider value={store}>{children}</GAStoreContext.Provider>;
};

export function useGAStore<T>(
  selector: (state: GAStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(GAStoreContext)(selector, equals);
}

export const useGAStoreRaw = () => React.useContext(GAStoreContext);
