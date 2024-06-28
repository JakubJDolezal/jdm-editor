import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

const PFStoreContext = React.createContext<
  UseBoundStore<StoreApi<PFStore>> & {
    setState: (partial: Partial<PFStore>) => void;
  }
>({} as any);

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

type PFStoreProviderProps = {
  //
};

export const createPF = (data: Partial<PFEntry> = {}): PFEntry => ({
  id: v4(),
  location: '',
  module: 'collection',
  func: '',
  ...data,
});

export const PFStoreProvider: React.FC<React.PropsWithChildren<PFStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<PFStore>((set) => ({
        configurable: true,
        disabled: false,
        addRowAbove: (index = 0) => {
          set(
            produce<PFStore>((draft) => {
              draft.pfs.splice(index, 0, createPF());
              return draft;
            }),
          );
        },
        addRowBelow: (index) => {
          set(
            produce<PFStore>((draft) => {
              index = index ?? draft.pfs.length - 1;
              draft.pfs.splice(index + 1, 0, createPF());

              return draft;
            }),
          );
        },
        pfs: [],
        setPFs: (pfs) => {
          set({ pfs });
        },
        swapRows: (sourceIndex, targetIndex) => {
          set(
            produce<PFStore>((draft) => {
              const [input] = draft.pfs.splice(sourceIndex, 1);
              draft.pfs.splice(targetIndex, 0, input);

              return draft;
            }),
          );
        },
        removeRow: (index) => {
          set(
            produce<PFStore>((draft) => {
              draft.pfs.splice(index, 1);
              return draft;
            }),
          );
        },
        updateRow: (index, update) => {
          set(
            produce<PFStore>((draft) => {
              draft.pfs[index] = {
                ...draft.pfs[index],
                ...update,
              };

              return draft;
            }),
          );
        },
      })),
    [],
  );

  return <PFStoreContext.Provider value={store}>{children}</PFStoreContext.Provider>;
};

export function usePFStore<T>(
  selector: (state: PFStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(PFStoreContext)(selector, equals);
}

export const usePFStoreRaw = () => React.useContext(PFStoreContext);
