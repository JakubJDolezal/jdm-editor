import { type RefObject } from 'react';
import type { Node, ReactFlowInstance } from 'reactflow';
export declare const useGraphClipboard: (reactFlow: RefObject<ReactFlowInstance | null>, wrapper: RefObject<HTMLDivElement | null>) => {
    copyNodes: (nodes: Node[]) => Promise<void>;
    pasteNodes: () => Promise<void>;
};
//# sourceMappingURL=use-graph-clipboard.d.ts.map