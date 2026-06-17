import { useState } from "react";
import { useNodes, useReactFlow } from "@xyflow/react";
import { THEMES } from "./themes";

const LANGUAGES = [
  { key: "c", label: "C", ext: "c" },
  { key: "cpp", label: "C++", ext: "cpp" },
  { key: "csharp", label: "C#", ext: "cs" },
  { key: "go", label: "Go", ext: "go" },
  { key: "java", label: "Java", ext: "java" },
  { key: "js", label: "JavaScript", ext: "js" },
  { key: "ts", label: "TypeScript", ext: "ts" },
  { key: "python", label: "Python", ext: "py" },
  { key: "rust", label: "Rust", ext: "rs" },
  { key: "ruby", label: "Ruby", ext: "rb" },
  { key: "php", label: "PHP", ext: "php" },
  { key: "swift", label: "Swift", ext: "swift" },
  { key: "kotlin", label: "Kotlin", ext: "kt" },
  { key: "html", label: "HTML", ext: "html" },
  { key: "css", label: "CSS", ext: "css" },
];

const inputCls =
  "h-[28px] px-2 bg-transparent border border-menu-border text-xs text-menu-icon outline-0 focus:border-sky-500 placeholder:text-menu-icon/40";

function MyNodeSidebar() {
  const nodes = useNodes();
  const { updateNodeData, setNodes } = useReactFlow();
  const selected = nodes.filter((n) => n.selected);
  const open = selected.length === 1;
  const node = selected[0];
  const [themesOpen, setThemesOpen] = useState(false);
  const [openTheme, setOpenTheme] = useState(null);
  const selectedTriad = node?.data?.themeId ?? null;

  const patchStyle = (patch) => {
    if (!node) return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, style: { ...n.style, ...patch } } : n,
      ),
    );
  };

  const patchPosition = (patch) => {
    if (!node) return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, position: { ...n.position, ...patch } } : n,
      ),
    );
  };

  const isCode = node?.type === "myTextNode";
  const isAnnotation = node?.type === "myAnnotationNode";
  const w = Math.round(node?.measured?.width ?? node?.style?.width ?? 0);
  const h = Math.round(node?.measured?.height ?? node?.style?.height ?? 0);

  return (
    <div
      className={`fixed right-0 top-[32px] bottom-0 w-[260px] bg-menu-bg border-l border-menu-border z-99 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {node && (
        <div className="flex flex-col h-full">
          <div className="shadow-md/5 box-border h-[31px] px-3 flex items-center border-b-1 border-menu-border text-xs uppercase tracking-wide text-menu-icon">
            {isCode ? "Codice" : isAnnotation ? "Annotazione" : "Nodo"}
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 text-menu-icon">
            <input
              className={inputCls}
              placeholder="ID"
              value={node.id}
              readOnly
              disabled
            />

            {isCode && (
              <>
                <div className="flex">
                  <input
                    className={`${inputCls} flex-1 min-w-0`}
                    placeholder="Titolo"
                    value={node.data?.title ?? ""}
                    onChange={(e) =>
                      updateNodeData(node.id, {
                        ...node.data,
                        title: e.target.value,
                      })
                    }
                  />
                  <span className="h-[28px] px-2 flex items-center text-xs italic border border-l-0 border-menu-border">
                    .
                    {LANGUAGES.find(
                      (l) => l.key === (node.data?.language ?? "cpp"),
                    )?.ext ?? "cpp"}
                  </span>
                </div>

                <select
                  className={inputCls}
                  value={node.data?.language ?? "cpp"}
                  onChange={(e) =>
                    updateNodeData(node.id, {
                      ...node.data,
                      language: e.target.value,
                    })
                  }
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.key} value={l.key}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                className={inputCls}
                placeholder="X"
                value={Math.round(node.position.x)}
                onChange={(e) =>
                  patchPosition({ x: Number(e.target.value) || 0 })
                }
              />
              <input
                type="number"
                className={inputCls}
                placeholder="Y"
                value={Math.round(node.position.y)}
                onChange={(e) =>
                  patchPosition({ y: Number(e.target.value) || 0 })
                }
              />
              <input
                type="number"
                className={inputCls}
                placeholder="Larghezza"
                value={w}
                onChange={(e) =>
                  patchStyle({ width: Number(e.target.value) || 0 })
                }
              />
              <input
                type="number"
                className={inputCls}
                placeholder="Altezza"
                value={h}
                onChange={(e) =>
                  patchStyle({ height: Number(e.target.value) || 0 })
                }
              />
            </div>

            <div className="my-2 h-px bg-menu-border" />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setThemesOpen((o) => !o)}
                className="flex items-center justify-between h-[28px] px-2 text-xs uppercase tracking-wide text-menu-icon border border-menu-border hover:bg-menu-light transition-colors"
              >
                <span>Themes</span>
                <span className="text-menu-icon/60">
                  {themesOpen ? "−" : "+"}
                </span>
              </button>
              {themesOpen && (
                <div className="flex flex-col gap-1 mt-2">
                  {THEMES.map((t) => {
                    const isOpen = openTheme === t.name;
                    return (
                      <div key={t.name} className="border border-menu-border">
                        <button
                          type="button"
                          onClick={() => setOpenTheme(isOpen ? null : t.name)}
                          className="flex items-center justify-between w-full h-[26px] px-2 text-xs hover:bg-menu-light transition-colors"
                        >
                          <span>{t.name}</span>
                          <span className="text-menu-icon/60">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="flex flex-col gap-2 p-2 border-t border-menu-border">
                            {t.triads.map((tr, i) => {
                              const triadId = `${t.name}::${i}`;
                              const isTriadSelected = selectedTriad === triadId;
                              const applyTriad = () => {
                                if (!node) return;
                                if (isTriadSelected) {
                                  const {
                                    theme: _theme,
                                    themeId: _themeId,
                                    ...rest
                                  } = node.data ?? {};
                                  updateNodeData(node.id, rest);
                                } else {
                                  updateNodeData(node.id, {
                                    ...node.data,
                                    themeId: triadId,
                                    theme: {
                                      bg: tr.main,
                                      border: tr.variant,
                                      fg: tr.fg,
                                    },
                                  });
                                }
                              };
                              return (
                                <button
                                  type="button"
                                  key={i}
                                  title={tr.usage}
                                  onClick={applyTriad}
                                  className={`flex items-center gap-1 p-1 -m-1 text-left transition-colors ${
                                    isTriadSelected
                                      ? "bg-sky-50 outline outline-sky-500"
                                      : "hover:bg-menu-light"
                                  }`}
                                >
                                  <div className="flex h-[18px] flex-1 border border-menu-border">
                                    <div
                                      className="flex-1"
                                      style={{ backgroundColor: tr.main }}
                                    />
                                    <div
                                      className="flex-1"
                                      style={{ backgroundColor: tr.variant }}
                                    />
                                    <div
                                      className="flex-1"
                                      style={{ backgroundColor: tr.fg }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-menu-icon/70 truncate w-[90px]">
                                    {tr.usage}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyNodeSidebar;
