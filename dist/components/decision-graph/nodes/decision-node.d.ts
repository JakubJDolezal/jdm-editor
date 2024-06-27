import { MenuProps } from 'antd';
import { default as React } from 'react';

export type DecisionNodeProps = {
    name?: string;
    icon: React.ReactNode;
    type: React.ReactNode;
    disabled?: boolean;
    isSelected?: boolean;
    children?: React.ReactNode;
    actions?: React.ReactNode[];
    status?: 'error' | 'success';
    noBodyPadding?: boolean;
    color?: 'primary' | 'secondary';
    menuItems?: MenuProps['items'];
    onNameChange?: (name: string) => void;
};
export declare const DecisionNode: React.FC<DecisionNodeProps>;
//# sourceMappingURL=decision-node.d.ts.map