import { default as React } from 'react';
import { ModelEntry } from './context/model-store.context';

export type ModelControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: ModelEntry[];
    value?: ModelEntry[];
    onChange?: (value: ModelEntry[]) => void;
};
export declare const ModelController: React.FC<ModelControllerProps>;
//# sourceMappingURL=model-controller.d.ts.map