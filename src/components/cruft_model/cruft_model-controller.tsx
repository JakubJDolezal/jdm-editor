import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import type { CruftModelEntry } from './context/cruft_model-store.context';
import { useCruftModelStore, useCruftModelStoreRaw } from './context/cruft_model-store.context';

export type CruftModelControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: CruftModelEntry[];
  value?: CruftModelEntry[];
  onChange?: (value: CruftModelEntry[]) => void;
};

export const CruftModelController: React.FC<CruftModelControllerProps> = ({
  value,
  onChange,
  defaultValue = [],
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const store = useCruftModelStoreRaw();
  const { setCruftModels, cruft_models } = useCruftModelStore(({ setCruftModels, cruft_models }) => ({
    setCruftModels,
    cruft_models,
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
      if (!equal(state.cruft_models, prevState.cruft_models)) {
        onChange?.(state.cruft_models);
      }
    });
  }, [store, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, cruft_models)) {
      setCruftModels(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setCruftModels(value);
    } else if (defaultValue) {
      setCruftModels(defaultValue);
    }
    mounted.current = true;
  }, []);

  return null;
};
