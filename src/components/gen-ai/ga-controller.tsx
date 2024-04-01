import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import type { GAEntry } from './context/ga-store.context';
import { useGAStore, useGAStoreRaw } from './context/ga-store.context';

export type GAControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: GAEntry[];
  value?: GAEntry[];
  onChange?: (value: GAEntry[]) => void;
};

export const GAController: React.FC<GAControllerProps> = ({
  value,
  onChange,
  defaultValue = [],
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const store = useGAStoreRaw();
  const { setGAs, gas } = useGAStore(({ setGAs, gas }) => ({
    setGAs,
    gas,
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
      if (!equal(state.gas, prevState.gas)) {
        onChange?.(state.gas);
      }
    });
  }, [store, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, gas)) {
      setGAs(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setGAs(value);
    } else if (defaultValue) {
      setGAs(defaultValue);
    }
    mounted.current = true;
  }, []);

  return null;
};
