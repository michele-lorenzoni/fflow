import { useState, useCallback } from "react";
import {
  addEdge,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import { domToPng } from "modern-screenshot";

import MyTextNode from "./components/MyTextNode";
import MyMenu from "./components/MyMenu";

const rfStyle = {
  backgroundColor: "#fafafa",
};

const initialNodes = [
  {
    id: "node-1",
    type: "myTextNode",
    position: { x: 0, y: 0 },
    data: { value: 123 },
    style: {
      width: 224,
      height: 124,
    },
  },
];

const nodeTypes = { myTextNode: MyTextNode };

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const snapToGrid = (value, gridSize = 2) => {
    return Math.round(value / gridSize) * gridSize;
  };

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, type: "step" }, eds));
  }, []);

  const takeScreenshot = async () => {
    try {
      const dataUrl = await domToPng(document.querySelector("#root"));

      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => {
      const modifiedChanges = changes.map((change) => {
        if (change.type === "dimensions" && change.dimensions) {
          return {
            ...change,
            dimensions: {
              width: snapToGrid(change.dimensions.width),
              height: snapToGrid(change.dimensions.height),
            },
            updateStyle: true,
          };
        }
        return change;
      });

      return applyNodeChanges(modifiedChanges, nds);
    });
  }, []);

  return (
    <>
      <MyMenu onScreenshot={takeScreenshot} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "step",
        }}
        connectionLineType="step"
        connectionLineStyle={{
          stroke: "var(--color-menu-border)",
          strokeWidth: 1,
        }}
        connectionRadius={7}
        fitView
        style={rfStyle}
      >
        <Background
          id="2"
          gap={25}
          color="#d5d5d5"
          variant={BackgroundVariant.Cross}
        />
      </ReactFlow>
    </>
  );
}

export default App;
