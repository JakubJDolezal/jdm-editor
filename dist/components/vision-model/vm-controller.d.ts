import type React from 'react';
import type { VMEntry } from './context/vm-store.context';
export type VMControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: VMEntry[];
    value?: VMEntry[];
    onChange?: (value: VMEntry[]) => void;
};
export declare const VMController: React.FC<VMControllerProps>;
//# sourceMappingURL=vm-controller.d.ts.map