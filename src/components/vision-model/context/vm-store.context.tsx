import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

const VMStoreContext = React.createContext<
  UseBoundStore<StoreApi<VMStore>> & {
    setState: (partial: Partial<VMStore>) => void;
  }
>({} as any);

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

type VMStoreProviderProps = {
  //
};

export const createVM = (data: Partial<VMEntry> = {}): VMEntry => ({
  id: v4(),
  model_name: '',
  page:'',
  ...data,
});

export const VMStoreProvider: React.FC<React.PropsWithChildren<VMStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<VMStore>((set) => ({
        configurable: true,
        disabled: false,
        addRowAbove: (index = 0) => {
          set(
            produce<VMStore>((draft) => {
              draft.vms.splice(index, 0, createVM());
              return draft;
            }),
          );
        },
        addRowBelow: (index) => {
          set(
            produce<VMStore>((draft) => {
              index = index ?? draft.vms.length - 1;
              draft.vms.splice(index + 1, 0, createVM());

              return draft;
            }),
          );
        },
        vms: [],
        setVMs: (vms) => {
          set({ vms });
        },
        swapRows: (sourceIndex, targetIndex) => {
          set(
            produce<VMStore>((draft) => {
              const [input] = draft.vms.splice(sourceIndex, 1);
              draft.vms.splice(targetIndex, 0, input);

              return draft;
            }),
          );
        },
        removeRow: (index) => {
          set(
            produce<VMStore>((draft) => {
              draft.vms.splice(index, 1);
              return draft;
            }),
          );
        },
        updateRow: (index, update) => {
          set(
            produce<VMStore>((draft) => {
              draft.vms[index] = {
                ...draft.vms[index],
                ...update,
              };

              return draft;
            }),
          );
        },
      })),
    [],
  );

  return <VMStoreContext.Provider value={store}>{children}</VMStoreContext.Provider>;
};

export function useVMStore<T>(
  selector: (state: VMStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(VMStoreContext)(selector, equals);
}

export const useVMStoreRaw = () => React.useContext(VMStoreContext);
