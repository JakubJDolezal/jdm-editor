import { default as React } from 'react';
import { PFEntry } from './context/pf-store.context';

export type PFControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: PFEntry[];
    value?: PFEntry[];
    onChange?: (value: PFEntry[]) => void;
};
export declare const PFController: React.FC<PFControllerProps>;
//# sourceMappingURL=pf-controller.d.ts.map