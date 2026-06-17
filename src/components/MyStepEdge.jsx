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

const pointSegmentDist = (px, py, ax, ay, bx, by) => {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const x = ax + t * dx;
  const y = ay + t * dy;
  return Math.hypot(px - x, py - y);
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

  const removeCorner = (index) => (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const next = corners.filter((_, i) => i !== index);
    updateEdgeData(id, { ...(data ?? {}), corners: next });
  };

  const addCorner = (evt) => {
    evt.stopPropagation();
    const pos = screenToFlowPosition({ x: evt.clientX, y: evt.clientY });
    if (snapToGrid) {
      pos.x = Math.round(pos.x / (snapGrid?.[0] ?? 25)) * (snapGrid?.[0] ?? 25);
      pos.y = Math.round(pos.y / (snapGrid?.[1] ?? 25)) * (snapGrid?.[1] ?? 25);
    }
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const d = pointSegmentDist(pos.x, pos.y, a.x, a.y, b.x, b.y);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    const next = [...corners.slice(0, bestIdx), pos, ...corners.slice(bestIdx)];
    updateEdgeData(id, { ...(data ?? {}), corners: next });
  };

  return (
    <>
      <path d={path} fill="none" className="react-flow__edge-path" />
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        style={{ pointerEvents: "stroke", cursor: "copy" }}
        onDoubleClick={addCorner}
      />
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
              onDoubleClick={removeCorner(i)}
            />
          );
        })}
    </>
  );
}

export default MyStepEdge;
