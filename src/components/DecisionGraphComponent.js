import React, { useState } from 'react';
import { DecisionGraph } from  'src/components/decision-graph/dg.tsx';
import {JdmConfigProvider} from "../theme.tsx";

const MyDecisionGraphComponent = () => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] }); // Initialize with an empty graph or your predefined graph structure

  return (
    <JdmConfigProvider>
      <DecisionGraph
        value={graph}
        onChange={(val) => setGraph(val)}
      />
    </JdmConfigProvider>
  );
};

export default MyDecisionGraphComponent;