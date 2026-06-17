const STRAIGHT_SNAP = 12;

const isHorizontalSide = (pos) => pos === "left" || pos === "right";

export function computeDefaultCorners(sX, sY, tX, tY, sPos, tPos) {
  const sh = isHorizontalSide(sPos);
  const th = isHorizontalSide(tPos);
  if (sh && th) {
    if (Math.abs(sY - tY) <= STRAIGHT_SNAP) return [];
    const midX = (sX + tX) / 2;
    return [
      { x: midX, y: sY },
      { x: midX, y: tY },
    ];
  }
  if (!sh && !th) {
    if (Math.abs(sX - tX) <= STRAIGHT_SNAP) return [];
    const midY = (sY + tY) / 2;
    return [
      { x: sX, y: midY },
      { x: tX, y: midY },
    ];
  }
  return sh ? [{ x: tX, y: sY }] : [{ x: sX, y: tY }];
}
