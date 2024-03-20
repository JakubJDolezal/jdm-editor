import React from 'react';
import type { ProOptions } from 'reactflow';
import 'reactflow/dist/style.css';
import { type DecisionGraphStoreType, type DecisionNode } from '../context/dg-store.context';
import '../dg.scss';
export type GraphProps = {
    className?: string;
    onDisableTabs?: (val: boolean) => void;
    reactFlowProOptions?: ProOptions;
};
export type GraphRef = DecisionGraphStoreType['actions'];
export declare const Graph: React.ForwardRefExoticComponent<GraphProps & React.RefAttributes<{
    setDecisionGraph: (val: import("../context/dg-store.context").DecisionGraphType) => void;
    handleNodesChange: (nodesChange: import("reactflow").NodeChange[]) => void;
    handleEdgesChange: (edgesChange: import("reactflow").EdgeChange[]) => void;
    setNodes: (nodes: DecisionNode<any>[]) => void;
    addNodes: (nodes: DecisionNode<any>[]) => void;
    updateNode: (id: string, updater: (draft: import("immer/src/internal").WritableDraft<DecisionNode<any>>) => import("immer/src/internal").WritableDraft<DecisionNode<any>>) => void;
    removeNodes: (ids: string[]) => void;
    duplicateNodes: (ids: string[]) => void;
    copyNodes: (ids: string[]) => void;
    pasteNodes: () => void;
    setEdges: (edges: import("../context/dg-store.context").DecisionEdge[]) => void;
    addEdges: (edge: import("../context/dg-store.context").DecisionEdge[]) => void;
    removeEdges: (ids: string[]) => void;
    setHoveredEdgeId: (edgeId: string | null) => void;
    closeTab: (id: string) => void;
    openTab: (id: string) => void;
    setSimulatorRequest: (req: string) => void;
    toggleSimulator: () => void;
    runSimulator: (context?: unknown) => Promise<import("..").Simulation>;
}>>;
//# sourceMappingURL=graph.d.ts.map