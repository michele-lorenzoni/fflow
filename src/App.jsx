import { useCallback, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
  Background,
  BackgroundVariant,
  Position,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import { domToPng } from "modern-screenshot";

const LANGUAGES_META = {
  c: { label: "C", ext: "c" },
  cpp: { label: "C++", ext: "cpp" },
  csharp: { label: "C#", ext: "cs" },
  go: { label: "Go", ext: "go" },
  java: { label: "Java", ext: "java" },
  js: { label: "JavaScript", ext: "js" },
  ts: { label: "TypeScript", ext: "ts" },
  python: { label: "Python", ext: "py" },
  rust: { label: "Rust", ext: "rs" },
  ruby: { label: "Ruby", ext: "rb" },
  php: { label: "PHP", ext: "php" },
  swift: { label: "Swift", ext: "swift" },
  kotlin: { label: "Kotlin", ext: "kt" },
  html: { label: "HTML", ext: "html" },
  css: { label: "CSS", ext: "css" },
};

const SNAP_GRID = 25;
const snap = (v) => Math.round((Number(v) || 0) / SNAP_GRID) * SNAP_GRID;

const SIDE_TO_POSITION = {
  top: Position.Top,
  right: Position.Right,
  bottom: Position.Bottom,
  left: Position.Left,
};

const escapeXml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const handlePoint = (node, handleId, fallbackSide) => {
  const w = node.measured?.width ?? node.width ?? node.style?.width ?? 225;
  const h = node.measured?.height ?? node.height ?? node.style?.height ?? 125;
  const side = (handleId?.split("-")[0] ?? fallbackSide) || "bottom";
  const { x, y } = node.position;
  switch (side) {
    case "top":
      return { x: x + w / 2, y, side };
    case "bottom":
      return { x: x + w / 2, y: y + h, side };
    case "left":
      return { x, y: y + h / 2, side };
    case "right":
    default:
      return { x: x + w, y: y + h / 2, side };
  }
};

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
      width: 225,
      height: 125,
    },
  },
];

const nodeTypes = { myTextNode: MyTextNode };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [gridVariant, setGridVariant] = useState(BackgroundVariant.Cross);
  const [snapEnabled, setSnapEnabled] = useState(false);

  const toggleSnap = useCallback(() => {
    setSnapEnabled((wasEnabled) => {
      const next = !wasEnabled;
      if (next) {
        setNodes((nds) =>
          nds.map((n) => {
            const w = n.measured?.width ?? n.width ?? n.style?.width;
            const h = n.measured?.height ?? n.height ?? n.style?.height;
            return {
              ...n,
              position: { x: snap(n.position.x), y: snap(n.position.y) },
              style: {
                ...n.style,
                width: snap(w),
                height: snap(h),
              },
            };
          }),
        );
      }
      return next;
    });
  }, [setNodes]);
  const { fitView, screenToFlowPosition, getNodes, getEdges } = useReactFlow();

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

  const exportSvg = () => {
    try {
      const currentNodes = getNodes();
      const currentEdges = getEdges();
      if (currentNodes.length === 0) return;

      const PADDING = 40;
      const HEADER_H = 32;
      const FOOTER_H = 20;
      const ICON_W = 32;
      const BG = "#fafafa";
      const NODE_BG = "#e5e5e5";
      const BORDER = "#a1a1a1";
      const FG = "#737373";

      const sizeOf = (n) => ({
        w: n.measured?.width ?? n.width ?? n.style?.width ?? 225,
        h: n.measured?.height ?? n.height ?? n.style?.height ?? 125,
      });

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const n of currentNodes) {
        const { w, h } = sizeOf(n);
        minX = Math.min(minX, n.position.x);
        minY = Math.min(minY, n.position.y);
        maxX = Math.max(maxX, n.position.x + w);
        maxY = Math.max(maxY, n.position.y + h);
      }
      const vbX = minX - PADDING;
      const vbY = minY - PADDING;
      const vbW = maxX - minX + PADDING * 2;
      const vbH = maxY - minY + PADDING * 2;

      const nodeMarkup = currentNodes
        .map((n) => {
          const { w, h } = sizeOf(n);
          const langKey = n.data?.language ?? "cpp";
          const lang = LANGUAGES_META[langKey] ?? LANGUAGES_META.cpp;
          const filename = `hello_world.${lang.ext}`;
          const x = n.position.x;
          const y = n.position.y;
          return `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${NODE_BG}" stroke="${BORDER}" stroke-width="1"/>
    <line x1="0" y1="${HEADER_H}" x2="${w}" y2="${HEADER_H}" stroke="${BORDER}" stroke-width="1"/>
    <line x1="${ICON_W}" y1="0" x2="${ICON_W}" y2="${HEADER_H}" stroke="${BORDER}" stroke-width="1"/>
    <text x="${ICON_W / 2}" y="${HEADER_H / 2 + 4}" fill="${FG}" font-size="11" font-family="Iosevka, ui-monospace, monospace" text-anchor="middle">${escapeXml(lang.label)}</text>
    <text x="${ICON_W + 12}" y="${HEADER_H / 2 + 4}" fill="${FG}" font-size="12" font-style="italic" font-family="Iosevka, ui-monospace, monospace">${escapeXml(filename)}</text>
    <line x1="0" y1="${h - FOOTER_H}" x2="${w}" y2="${h - FOOTER_H}" stroke="${BORDER}" stroke-width="1"/>
    <text x="12" y="${h - FOOTER_H / 2 + 3}" fill="${FG}" font-size="10" font-family="Iosevka, ui-monospace, monospace">${escapeXml(lang.label)}</text>
    <text x="${w - 12}" y="${h - FOOTER_H / 2 + 3}" fill="${FG}" font-size="10" font-family="Iosevka, ui-monospace, monospace" text-anchor="end">UTF-8 · LF</text>
  </g>`;
        })
        .join("");

      const nodeMap = Object.fromEntries(currentNodes.map((n) => [n.id, n]));
      const edgeMarkup = currentEdges
        .map((e) => {
          const sourceNode = nodeMap[e.source];
          const targetNode = nodeMap[e.target];
          if (!sourceNode || !targetNode) return "";
          const s = handlePoint(sourceNode, e.sourceHandle, "right");
          const t = handlePoint(targetNode, e.targetHandle, "left");
          const [path] = getSmoothStepPath({
            sourceX: s.x,
            sourceY: s.y,
            sourcePosition: SIDE_TO_POSITION[s.side],
            targetX: t.x,
            targetY: t.y,
            targetPosition: SIDE_TO_POSITION[t.side],
            borderRadius: 0,
          });
          return `<path d="${path}" fill="none" stroke="${BORDER}" stroke-width="1"/>`;
        })
        .join("\n  ");

      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}">
  <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="${BG}"/>
  ${edgeMarkup}
  ${nodeMarkup}
</svg>`;

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "export.svg";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const addNode = useCallback(() => {
    const width = 225;
    const height = 125;
    const center = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    const jitter = () => Math.round((Math.random() - 0.5) * 80);

    const newNode = {
      id: `node-${Date.now()}`,
      type: "myTextNode",
      position: {
        x: center.x - width / 2 + jitter(),
        y: center.y - height / 2 + jitter(),
      },
      data: { value: 0 },
      style: { width, height },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, screenToFlowPosition]);

  return (
    <>
      <MyMenu
        onScreenshot={takeScreenshot}
        onExportSvg={exportSvg}
        onAdd={addNode}
        onFocus={focusSelected}
        gridVariant={gridVariant}
        onGridVariantChange={setGridVariant}
        snapEnabled={snapEnabled}
        onSnapToggle={toggleSnap}
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
        snapToGrid={snapEnabled}
        snapGrid={[SNAP_GRID, SNAP_GRID]}
        fitView
        style={rfStyle}
      >
        <Background id="2" gap={25} color="#d5d5d5" variant={gridVariant} />
      </ReactFlow>
    </>
  );
}

export default App;
