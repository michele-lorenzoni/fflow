const STRAIGHT_SNAP = 12;
const SAME_SIDE_OFFSET = 25;

const isHorizontalSide = (pos) => pos === "left" || pos === "right";

export function computeDefaultCorners(sX, sY, tX, tY, sPos, tPos) {
  const sh = isHorizontalSide(sPos);
  const th = isHorizontalSide(tPos);
  if (sh && th) {
    if (Math.abs(sY - tY) <= STRAIGHT_SNAP) return [];
    let midX;
    if (sPos === tPos) {
      midX =
        sPos === "right"
          ? Math.max(sX, tX) + SAME_SIDE_OFFSET
          : Math.min(sX, tX) - SAME_SIDE_OFFSET;
    } else {
      midX = (sX + tX) / 2;
    }
    return [
      { x: midX, y: sY },
      { x: midX, y: tY },
    ];
  }
  if (!sh && !th) {
    if (Math.abs(sX - tX) <= STRAIGHT_SNAP) return [];
    let midY;
    if (sPos === tPos) {
      midY =
        sPos === "bottom"
          ? Math.max(sY, tY) + SAME_SIDE_OFFSET
          : Math.min(sY, tY) - SAME_SIDE_OFFSET;
    } else {
      midY = (sY + tY) / 2;
    }
    return [
      { x: sX, y: midY },
      { x: tX, y: midY },
    ];
  }
  return sh ? [{ x: tX, y: sY }] : [{ x: sX, y: tY }];
}
