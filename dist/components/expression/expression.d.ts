import type { DragDropManager } from 'dnd-core';
import React from 'react';
import type { ExpressionControllerProps } from './expression-controller';
import './expression.scss';
export type ExpressionProps = {
    manager?: DragDropManager;
} & ExpressionControllerProps;
export declare const Expression: React.FC<ExpressionProps>;
//# sourceMappingURL=expression.d.ts.map