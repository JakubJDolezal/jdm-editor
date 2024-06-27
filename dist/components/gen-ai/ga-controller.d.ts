import { default as React } from 'react';
import { GAEntry } from './context/ga-store.context';

export type GAControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: GAEntry[];
    value?: GAEntry[];
    onChange?: (value: GAEntry[]) => void;
};
export declare const GAController: React.FC<GAControllerProps>;
//# sourceMappingURL=ga-controller.d.ts.map