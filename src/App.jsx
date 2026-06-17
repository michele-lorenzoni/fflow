import { useCallback } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
  Background,
  BackgroundVariant,
  useReactFlow,
} from "@xyflow/react";
import { domToPng } from "modern-screenshot";

import MyTextNode from "./components/MyTextNode";
import MyMenu from "./components/MyMenu";

const rfStyle = {
  backgroundColor: "#fafafa",
};

const initialNodes = [
  {
    id: `node-${Date.now()}`,
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const focusSelected = useCallback(() => {
    const selected = nodes.filter((n) => n.selected);
    const target = selected.length > 0 ? selected : nodes;
    if (target.length === 0) return;
    fitView({ nodes: target, duration: 500, padding: 0.3, maxZoom: 1.5 });
  }, [nodes, fitView]);

  // const snapToGrid = (value, gridSize = 2) => {
  //   return Math.round(value / gridSize) * gridSize;
  // };

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds));
    },
    [setEdges],
  );

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

  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "myTextNode",
      position: { x: 0, y: 0 },
      data: { value: 0 },
      style: {
        width: 260,
        height: 180,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  return (
    <>
      <MyMenu
        onScreenshot={takeScreenshot}
        onAdd={addNode}
        onFocus={focusSelected}
      />
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
