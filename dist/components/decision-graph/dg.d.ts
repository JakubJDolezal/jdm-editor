import type { DragDropManager } from 'dnd-core';
import React from 'react';
import 'react-ace';
import type { DecisionGraphContextProps } from './context/dg-store.context';
import type { DecisionGraphEmptyType } from './dg-empty';
import type { DecisionGraphWrapperProps } from './dg-wrapper';
import './dg.scss';
import type { GraphRef } from './graph/graph';
export type DecisionGraphProps = {
    manager?: DragDropManager;
} & DecisionGraphWrapperProps & DecisionGraphContextProps & DecisionGraphEmptyType;
export type DecisionGraphRef = GraphRef;
export declare const DecisionGraph: React.ForwardRefExoticComponent<{
    manager?: DragDropManager | undefined;
} & DecisionGraphWrapperProps & DecisionGraphEmptyType & React.RefAttributes<{
    setDecisionGraph: (val: import("./context/dg-store.context").DecisionGraphType) => void;
    handleNodesChange: (nodesChange: import("reactflow").NodeChange[]) => void;
    handleEdgesChange: (edgesChange: import("reactflow").EdgeChange[]) => void;
    setNodes: (nodes: import("./context/dg-store.context").DecisionNode<any>[]) => void;
    addNodes: (nodes: import("./context/dg-store.context").DecisionNode<any>[]) => void;
    updateNode: (id: string, updater: (draft: import("immer/src/internal").WritableDraft<import("./context/dg-store.context").DecisionNode<any>>) => import("immer/src/internal").WritableDraft<import("./context/dg-store.context").DecisionNode<any>>) => void;
    removeNodes: (ids: string[]) => void;
    duplicateNodes: (ids: string[]) => void;
    copyNodes: (ids: string[]) => void;
    pasteNodes: () => void;
    setEdges: (edges: import("./context/dg-store.context").DecisionEdge[]) => void;
    addEdges: (edge: import("./context/dg-store.context").DecisionEdge[]) => void;
    removeEdges: (ids: string[]) => void;
    setHoveredEdgeId: (edgeId: string | null) => void;
    closeTab: (id: string) => void;
    openTab: (id: string) => void;
    setSimulatorRequest: (req: string) => void;
    toggleSimulator: () => void;
    runSimulator: (context?: unknown) => Promise<import(".").Simulation>;
}>>;
//# sourceMappingURL=dg.d.ts.map