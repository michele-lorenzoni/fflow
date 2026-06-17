import { NodeResizer, useReactFlow } from "@xyflow/react";
import MyHandle from "./MyHandle";

function MyTableNode({ id, selected, data }) {
  const { updateNodeData } = useReactFlow();
  const rows = Math.max(1, data?.rows ?? 3);
  const cols = Math.max(1, data?.cols ?? 3);
  const cells = data?.cells ?? {};

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

  const setCell = (r, c, value) => {
    updateNodeData(id, {
      ...data,
      cells: { ...cells, [`${r},${c}`]: value },
    });
  };

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
          className="flex-1 grid nodrag nowheel overflow-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
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
