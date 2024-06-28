import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import type { PFEntry } from './context/pf-store.context';
import { usePFStore, usePFStoreRaw } from './context/pf-store.context';

export type PFControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: PFEntry[];
  value?: PFEntry[];
  onChange?: (value: PFEntry[]) => void;
};

export const PFController: React.FC<PFControllerProps> = ({
  value,
  onChange,
  defaultValue = [],
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const store = usePFStoreRaw();
  const { setPFs, pfs } = usePFStore(({ setPFs, pfs }) => ({
    setPFs,
    pfs,
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
      if (!equal(state.pfs, prevState.pfs)) {
        onChange?.(state.pfs);
      }
    });
  }, [store, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, pfs)) {
      setPFs(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setPFs(value);
    } else if (defaultValue) {
      setPFs(defaultValue);
    }
    mounted.current = true;
  }, []);

  return null;
};
