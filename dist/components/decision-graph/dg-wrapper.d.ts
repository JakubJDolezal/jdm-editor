import { default as React } from 'react';
import { ProOptions } from 'reactflow';
import { GraphAsideProps } from './graph/graph-aside';

export type DecisionGraphWrapperProps = {
    reactFlowProOptions?: ProOptions;
    defaultOpenMenu?: GraphAsideProps['defaultOpenMenu'];
};
export declare const DecisionGraphWrapper: React.MemoExoticComponent<React.ForwardRefExoticComponent<DecisionGraphWrapperProps & React.RefAttributes<{
    setDecisionGraph: (val: import('./context/dg-store.context').DecisionGraphType) => void;
    handleNodesChange: (nodesChange: import('reactflow').NodeChange[]) => void;
    handleEdgesChange: (edgesChange: import('reactflow').EdgeChange[]) => void;
    setNodes: (nodes: import('./context/dg-store.context').DecisionNode<any>[]) => void;
    addNodes: (nodes: import('./context/dg-store.context').DecisionNode<any>[]) => void;
    updateNode: (id: string, updater: (draft: import('immer/src/internal').WritableDraft<import('./context/dg-store.context').DecisionNode<any>>) => import('immer/src/internal').WritableDraft<import('./context/dg-store.context').DecisionNode<any>>) => void;
    removeNodes: (ids: string[]) => void;
    duplicateNodes: (ids: string[]) => void;
    copyNodes: (ids: string[]) => void;
    pasteNodes: () => void;
    setEdges: (edges: import('./context/dg-store.context').DecisionEdge[]) => void;
    addEdges: (edge: import('./context/dg-store.context').DecisionEdge[]) => void;
    removeEdges: (ids: string[]) => void;
    setHoveredEdgeId: (edgeId: string | null) => void;
    closeTab: (id: string) => void;
    openTab: (id: string) => void;
    setSimulatorRequest: (req: string) => void;
    toggleSimulator: () => void;
    runSimulator: (context?: unknown) => Promise<import('.').Simulation>;
}>>>;
//# sourceMappingURL=dg-wrapper.d.ts.map