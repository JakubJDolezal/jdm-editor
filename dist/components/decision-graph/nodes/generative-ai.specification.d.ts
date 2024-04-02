import type { NodeSpecification } from './specification-types';
export type NodeGenAIData = {
    gas?: GAEntry[];
};
export type GAEntry = {
    id: string;
    prompt: string;
    choice: 'json' | 'append' | 'multi-level json';
};
export declare const genAiSpecification: NodeSpecification<NodeGenAIData>;
//# sourceMappingURL=generative-ai.specification.d.ts.map