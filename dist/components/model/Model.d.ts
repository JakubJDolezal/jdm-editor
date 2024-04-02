import type { DragDropManager } from 'dnd-core';
import React from 'react';
import type { ModelControllerProps } from './model-controller';
import './model.scss';
export type modelProps = {
    manager?: DragDropManager;
} & ModelControllerProps;
export declare const Model: React.FC<modelProps>;
//# sourceMappingURL=Model.d.ts.map