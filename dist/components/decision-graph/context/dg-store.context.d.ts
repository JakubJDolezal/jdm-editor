import { WritableDraft } from 'immer/src/types/types-external';
import { default as React, MutableRefObject } from 'react';
import { EdgeChange, NodeChange, ReactFlowInstance, useEdgesState, useNodesState } from 'reactflow';
import { StoreApi, UseBoundStore } from 'zustand';
import { useGraphClipboard } from '../hooks/use-graph-clipboard';
import { NodeSpecification } from '../nodes/specification-types';
import { Simulation } from '../types/simulation.types';

export type Position = {
    x: number;
    y: number;
};
export type DecisionNode<T = any> = {
    id: string;
    name: string;
    description?: string;
    type?: string;
    content?: T;
    position: Position;
};
export type DecisionEdge = {
    id: string;
    name?: string;
    sourceId: string;
    targetId: string;
    sourceHandle?: string;
    targetHandle?: string;
    type?: string;
};
export type DecisionGraphType = {
    nodes: DecisionNode[];
    edges: DecisionEdge[];
};
export type CustomNodeRenderFormType = {
    value: any;
    onChange: (val: any) => void;
};
type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;
export type DecisionGraphStoreType = {
    state: {
        id?: string;
        components: NodeSpecification[];
        disabled?: boolean;
        configurable?: boolean;
        decisionGraph: DecisionGraphType;
        hoveredEdgeId: string | null;
        openTabs: string[];
        activeTab: string;
        simulatorOpen: boolean;
        simulatorRequest?: string;
        simulate?: Simulation;
        simulatorLoading: boolean;
    };
    references: {
        nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
        edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;
        graphClipboard: MutableRefObject<ReturnType<typeof useGraphClipboard>>;
    };
    actions: {
        setDecisionGraph: (val: DecisionGraphType) => void;
        handleNodesChange: (nodesChange: NodeChange[]) => void;
        handleEdgesChange: (edgesChange: EdgeChange[]) => void;
        setNodes: (nodes: DecisionNode[]) => void;
        addNodes: (nodes: DecisionNode[]) => void;
        updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode>) => void;
        removeNodes: (ids: string[]) => void;
        duplicateNodes: (ids: string[]) => void;
        copyNodes: (ids: string[]) => void;
        pasteNodes: () => void;
        setEdges: (edges: DecisionEdge[]) => void;
        addEdges: (edge: DecisionEdge[]) => void;
        removeEdges: (ids: string[]) => void;
        setHoveredEdgeId: (edgeId: string | null) => void;
        closeTab: (id: string) => void;
        openTab: (id: string) => void;
        setSimulatorRequest: (req: string) => void;
        toggleSimulator: () => void;
        runSimulator: (context?: unknown) => Promise<Simulation>;
    };
    listeners: {
        onChange?: (val: DecisionGraphType) => void;
        onSimulationRun?: (data: {
            decisionGraph: DecisionGraphType;
            context: unknown;
        }) => Promise<Simulation>;
        onSimulatorOpen?: (open: boolean) => void;
        onReactFlowInit?: (instance: ReactFlowInstance) => void;
    };
};
type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
    setState: (partial: Partial<T>) => void;
};
export declare const DecisionGraphStoreContext: React.Context<{
    stateStore: ExposedStore<DecisionGraphStoreType['state']>;
    listenerStore: ExposedStore<DecisionGraphStoreType['listeners']>;
    referenceStore: ExposedStore<DecisionGraphStoreType['references']>;
    actions: DecisionGraphStoreType['actions'];
}>;
export type DecisionGraphContextProps = {};
export declare const DecisionGraphProvider: React.FC<React.PropsWithChildren<DecisionGraphContextProps>>;
export declare function useDecisionGraphState<T>(selector: (state: DecisionGraphStoreType['state']) => T, equals?: (a: any, b: any) => boolean): T;
export declare function useDecisionGraphListeners<T>(selector: (state: DecisionGraphStoreType['listeners']) => T, equals?: (a: any, b: any) => boolean): T;
export declare function useDecisionGraphReferences<T>(selector: (state: DecisionGraphStoreType['references']) => T, equals?: (a: any, b: any) => boolean): T;
export declare function useDecisionGraphActions(): DecisionGraphStoreType['actions'];
export declare function useDecisionGraphRaw(): {
    stateStore: ExposedStore<{
        id?: string | undefined;
        components: NodeSpecification[];
        disabled?: boolean | undefined;
        configurable?: boolean | undefined;
        decisionGraph: DecisionGraphType;
        hoveredEdgeId: string | null;
        openTabs: string[];
        activeTab: string;
        simulatorOpen: boolean;
        simulatorRequest?: string | undefined;
        simulate?: Simulation | undefined;
        simulatorLoading: boolean;
    }>;
    listenerStore: ExposedStore<{
        onChange?: ((val: DecisionGraphType) => void) | undefined;
        onSimulationRun?: ((data: {
            decisionGraph: DecisionGraphType;
            context: unknown;
        }) => Promise<Simulation>) | undefined;
        onSimulatorOpen?: ((open: boolean) => void) | undefined;
        onReactFlowInit?: ((instance: ReactFlowInstance) => void) | undefined;
    }>;
    referenceStore: ExposedStore<{
        nodesState: React.MutableRefObject<[import('reactflow').Node<unknown, string | undefined>[], React.Dispatch<React.SetStateAction<import('reactflow').Node<unknown, string | undefined>[]>>, (changes: NodeChange[]) => void]>;
        edgesState: React.MutableRefObject<[import('reactflow').Edge<unknown>[], React.Dispatch<React.SetStateAction<import('reactflow').Edge<unknown>[]>>, (changes: EdgeChange[]) => void]>;
        graphClipboard: React.MutableRefObject<{
            copyNodes: (nodes: import('reactflow').Node[]) => Promise<void>;
            pasteNodes: () => Promise<void>;
        }>;
    }>;
    actions: {
        setDecisionGraph: (val: DecisionGraphType) => void;
        handleNodesChange: (nodesChange: NodeChange[]) => void;
        handleEdgesChange: (edgesChange: EdgeChange[]) => void;
        setNodes: (nodes: DecisionNode<any>[]) => void;
        addNodes: (nodes: DecisionNode<any>[]) => void;
        updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode<any>>) => void;
        removeNodes: (ids: string[]) => void;
        duplicateNodes: (ids: string[]) => void;
        copyNodes: (ids: string[]) => void;
        pasteNodes: () => void;
        setEdges: (edges: DecisionEdge[]) => void;
        addEdges: (edge: DecisionEdge[]) => void;
        removeEdges: (ids: string[]) => void;
        setHoveredEdgeId: (edgeId: string | null) => void;
        closeTab: (id: string) => void;
        openTab: (id: string) => void;
        setSimulatorRequest: (req: string) => void;
        toggleSimulator: () => void;
        runSimulator: (context?: unknown) => Promise<Simulation>;
    };
};
export default DecisionGraphProvider;
//# sourceMappingURL=dg-store.context.d.ts.map