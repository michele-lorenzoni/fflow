import { useRef } from "react";
import { NodeResizer, useReactFlow } from "@xyflow/react";
import MyHandle from "./MyHandle";

function MyTableNode({ id, selected, data }) {
  const { updateNodeData } = useReactFlow();
  const rows = Math.max(1, data?.rows ?? 3);
  const cols = Math.max(1, data?.cols ?? 3);
  const cells = data?.cells ?? {};
  const gridRef = useRef(null);

  const theme = data?.theme;
  const rootStyle = theme
    ? { backgroundColor: theme.bg, borderColor: theme.fg, color: theme.fg }
    : undefined;
  const headerStyle = theme
    ? { backgroundColor: theme.border, color: theme.fg }
    : undefined;
  const cellBorder = theme ? { borderColor: theme.fg } : undefined;
  const cellBg = theme
    ? { backgroundColor: theme.bg, color: theme.fg }
    : undefined;
  const handleStyle = theme
    ? { backgroundColor: theme.border, borderColor: theme.fg }
    : undefined;

  const setCell = (r, c, value) => {
    updateNodeData(id, {
      ...data,
      cells: { ...cells, [`${r},${c}`]: value },
    });
  };

  const startColDrag = (colIdx) => (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const target = evt.currentTarget;
    target.setPointerCapture(evt.pointerId);
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;

    const onMove = () => {};
    const onUp = (e) => {
      target.releasePointerCapture(e.pointerId);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);

      const colW = rect.width / cols;
      const x = e.clientX - rect.left;
      const targetIdx = Math.max(0, Math.min(cols - 1, Math.floor(x / colW)));
      if (targetIdx === colIdx) return;

      const order = Array.from({ length: cols }, (_, i) => i);
      const [moved] = order.splice(colIdx, 1);
      order.splice(targetIdx, 0, moved);
      const newCells = {};
      for (const [key, value] of Object.entries(cells)) {
        const [r, c] = key.split(",").map(Number);
        const newC = order.indexOf(c);
        newCells[`${r},${newC}`] = value;
      }
      updateNodeData(id, { ...data, cells: newCells });
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
  };

  const gridTemplate = `repeat(${cols}, minmax(0, 1fr))`;

  return (
    <>
      <NodeResizer
        minWidth={150}
        minHeight={75}
        isVisible={selected}
        color="#00a6f4"
        lineStyle={{ borderWidth: 1 }}
        handleStyle={{
          width: 5,
          height: 5,
          borderRadius: 0,
          backgroundColor: "#00a6f4",
          border: "#000",
        }}
      />

      <div
        style={rootStyle}
        className="shadow-md/5 box-border flex flex-col w-full h-full bg-menu-bg border border-menu-border text-menu-icon"
      >
        <div
          style={headerStyle}
          className="h-[10px] shrink-0 border-b border-menu-border bg-menu-light cursor-move"
        />
        <div
          style={{
            ...(headerStyle ?? {}),
            gridTemplateColumns: gridTemplate,
          }}
          className="grid shrink-0 h-[12px] border-b border-menu-border bg-menu-light nodrag"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              onPointerDown={startColDrag(c)}
              title="Trascina per riordinare"
              className="h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <div
                style={handleStyle}
                className="w-[14px] h-[3px] bg-menu-icon/40"
              />
            </div>
          ))}
        </div>
        <div
          ref={gridRef}
          className="flex-1 grid nodrag nowheel overflow-auto"
          style={{
            gridTemplateColumns: gridTemplate,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
              <input
                key={`${r},${c}`}
                value={cells[`${r},${c}`] ?? ""}
                onChange={(e) => setCell(r, c, e.target.value)}
                style={{ ...cellBorder, ...cellBg }}
                className={`min-w-0 bg-transparent text-menu-icon text-xs px-2 py-1 outline-0 border-menu-border ${
                  c < cols - 1 ? "border-r" : ""
                } ${r < rows - 1 ? "border-b" : ""}`}
              />
            )),
          )}
        </div>
        <MyHandle />
      </div>
    </>
  );
}

export default MyTableNode;
