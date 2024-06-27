import { NodeSpecification } from './specification-types';

export type NodeGenAIData = {
    gas?: GAEntry[];
};
export type GAEntry = {
    id: string;
    prompt: string;
    choice: 'json' | 'append' | 'multi-level json';
    name: string;
    linked: string;
    model: string;
    platform: string;
    location: string;
};
export declare const genAiSpecification: NodeSpecification<NodeGenAIData>;
//# sourceMappingURL=generative-ai.specification.d.ts.map