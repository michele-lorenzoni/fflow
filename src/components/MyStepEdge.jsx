import { useReactFlow, useStore } from "@xyflow/react";

import { computeDefaultCorners } from "./stepEdgeCorners";

const snapAxis = (value, candidates, gridSize) => {
  const threshold = gridSize / 2;
  let best = null;
  let bestDist = Infinity;
  for (const c of candidates) {
    const d = Math.abs(value - c);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  if (best !== null && bestDist <= threshold) return best;
  return Math.round(value / gridSize) * gridSize;
};

function MyStepEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) {
  const { updateEdgeData, screenToFlowPosition } = useReactFlow();
  const snapToGrid = useStore((s) => s.snapToGrid);
  const snapGrid = useStore((s) => s.snapGrid);
  const corners =
    data?.corners ??
    computeDefaultCorners(
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
    );

  const points = [
    { x: sourceX, y: sourceY },
    ...corners,
    { x: targetX, y: targetY },
  ];
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const startDrag = (index) => (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const target = evt.currentTarget;
    target.setPointerCapture(evt.pointerId);

    const onMove = (e) => {
      const pos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      if (snapToGrid) {
        pos.x = snapAxis(pos.x, [sourceX, targetX], snapGrid?.[0] ?? 25);
        pos.y = snapAxis(pos.y, [sourceY, targetY], snapGrid?.[1] ?? 25);
      }
      const next = corners.map((c, i) => (i === index ? pos : c));
      updateEdgeData(id, { ...(data ?? {}), corners: next });
    };
    const onUp = (e) => {
      target.releasePointerCapture(e.pointerId);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
  };

  return (
    <>
      <path d={path} fill="none" className="react-flow__edge-path" />
      {selected &&
        corners.map((c, i) => {
          const size = 5;
          return (
            <rect
              key={i}
              x={c.x - size / 2}
              y={c.y - size / 2}
              width={size}
              height={size}
              fill="#00a6f4"
              style={{ cursor: "move", pointerEvents: "all" }}
              onPointerDown={startDrag(i)}
            />
          );
        })}
    </>
  );
}

export default MyStepEdge;
