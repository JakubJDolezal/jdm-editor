import { Row } from '@tanstack/react-table';
import { default as React } from 'react';

export declare const TableRow: React.FC<{
    index: number;
    row: Row<Record<string, string>>;
    reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
    disabled?: boolean;
}>;
//# sourceMappingURL=table-row.d.ts.map