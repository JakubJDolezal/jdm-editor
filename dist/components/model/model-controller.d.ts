import type React from 'react';
import type { ModelEntry } from './context/model-store.context';
export type ModelControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: ModelEntry[];
    value?: ModelEntry[];
    onChange?: (value: ModelEntry[]) => void;
};
export declare const ModelController: React.FC<ModelControllerProps>;
//# sourceMappingURL=model-controller.d.ts.map