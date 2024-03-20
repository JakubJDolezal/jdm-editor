import React from 'react';
import type { SchemaSelectProps } from '../../../helpers/components';
import type { ColumnType, TableSchemaItem } from '../context/dt-store.context';
export type FieldAddProps = {
    id?: string;
    onSuccess?: (column: TableSchemaItem) => void;
    onDismiss?: () => void;
    isOpen?: boolean;
    schema?: SchemaSelectProps[];
    columnType?: ColumnType;
    getContainer?: () => HTMLElement;
};
export declare const FieldAdd: React.FC<FieldAddProps>;
//# sourceMappingURL=field-add-dialog.d.ts.map