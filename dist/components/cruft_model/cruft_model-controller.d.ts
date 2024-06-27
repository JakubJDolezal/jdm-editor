import { default as React } from 'react';
import { CruftModelEntry } from './context/cruft_model-store.context';

export type CruftModelControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: CruftModelEntry[];
    value?: CruftModelEntry[];
    onChange?: (value: CruftModelEntry[]) => void;
};
export declare const CruftModelController: React.FC<CruftModelControllerProps>;
//# sourceMappingURL=cruft_model-controller.d.ts.map