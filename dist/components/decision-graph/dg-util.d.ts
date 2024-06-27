import { Edge, Node } from 'reactflow';
import { DecisionEdge, DecisionNode } from './context/dg-store.context';

export declare const mapToDecisionEdge: (edge: Edge) => DecisionEdge;
export declare const mapToGraphNode: (node: DecisionNode) => Node;
export declare const mapToGraphNodes: (nodes: DecisionNode[]) => Node[];
export declare const mapToGraphEdge: (edge: DecisionEdge) => Edge;
export declare const mapToGraphEdges: (edges: DecisionEdge[]) => Edge[];
//# sourceMappingURL=dg-util.d.ts.map