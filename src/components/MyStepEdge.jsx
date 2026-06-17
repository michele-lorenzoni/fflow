import { useReactFlow } from "@xyflow/react";

import { computeDefaultCorners } from "./stepEdgeCorners";

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
        corners.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={5}
            fill="#00a6f4"
            stroke="#fff"
            strokeWidth={1}
            style={{ cursor: "move", pointerEvents: "all" }}
            onPointerDown={startDrag(i)}
          />
        ))}
    </>
  );
}

export default MyStepEdge;
