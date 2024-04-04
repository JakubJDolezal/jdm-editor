import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import type { VMEntry } from './context/vm-store.context';
import { useVMStore, useVMStoreRaw } from './context/vm-store.context';

export type VMControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: VMEntry[];
  value?: VMEntry[];
  onChange?: (value: VMEntry[]) => void;
};

export const VMController: React.FC<VMControllerProps> = ({
  value,
  onChange,
  defaultValue = [],
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const store = useVMStoreRaw();
  const { setVMs, vms } = useVMStore(({ setVMs, vms }) => ({
    setVMs,
    vms,
  }));

  useEffect(() => {
    store.setState({
      configurable,
      disabled,
    });
  }, [configurable, disabled]);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    return store.subscribe((state, prevState) => {
      if (!equal(state.vms, prevState.vms)) {
        onChange?.(state.vms);
      }
    });
  }, [store, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, vms)) {
      setVMs(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setVMs(value);
    } else if (defaultValue) {
      setVMs(defaultValue);
    }
    mounted.current = true;
  }, []);

  return null;
};
