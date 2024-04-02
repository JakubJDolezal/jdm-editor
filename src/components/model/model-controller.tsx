import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import type { ModelEntry } from './context/model-store.context';
import { useModelStore, useModelStoreRaw } from './context/model-store.context';

export type ModelControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: ModelEntry[];
  value?: ModelEntry[];
  onChange?: (value: ModelEntry[]) => void;
};

export const ModelController: React.FC<ModelControllerProps> = ({
  value,
  onChange,
  defaultValue = [],
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const store = useModelStoreRaw();
  const { setModels, models } = useModelStore(({ setModels, models }) => ({
    setModels,
    models,
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
      if (!equal(state.models, prevState.models)) {
        onChange?.(state.models);
      }
    });
  }, [store, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, models)) {
      setModels(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setModels(value);
    } else if (defaultValue) {
      setModels(defaultValue);
    }
    mounted.current = true;
  }, []);

  return null;
};
