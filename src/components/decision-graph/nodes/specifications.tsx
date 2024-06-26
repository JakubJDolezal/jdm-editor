import { decisionTableSpecification } from './decision-table.specification';
import { expressionSpecification } from './expression.specification';
// import { functionSpecification } from './function.specification';
import { inputSpecification } from './input.specification';
import { outputSpecification } from './output.specification';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';
import { switchSpecification } from './switch.specification';
import {modelComponentSpecification} from "./model-component.specification";
import {genAiSpecification} from "./generative-ai.specification";
import {cruft_modelComponentSpecification} from "./cruft-model-component.specification";
import {visionModelSpecification} from "./vision-model.specification";
import {pythonFuncSpecification} from "./python-function.specification"
function makeNodeSpecification<T extends Record<NodeKind, V>, V extends NodeSpecification>(o: T): Readonly<T> {
  return o;
}

export const nodeSpecification = makeNodeSpecification({
  [NodeKind.Input]: inputSpecification,
  [NodeKind.Output]: outputSpecification,
  [NodeKind.DecisionTable]: decisionTableSpecification,
  [NodeKind.Expression]: expressionSpecification,
  [NodeKind.Switch]: switchSpecification,
  [NodeKind.Model]: modelComponentSpecification,
  [NodeKind.GenAI]: genAiSpecification,
  [NodeKind.CruftModel]: cruft_modelComponentSpecification,
  [NodeKind.VisualModel]: visionModelSpecification,
  [NodeKind.PFunction] : pythonFuncSpecification,

});
