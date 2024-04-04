import type { DragDropManager } from 'dnd-core';
import React from 'react';
import type { VMControllerProps } from './vm-controller';
import './vm.scss';
export type vmProps = {
    manager?: DragDropManager;
} & VMControllerProps;
export declare const VM: React.FC<vmProps>;
//# sourceMappingURL=VM.d.ts.map