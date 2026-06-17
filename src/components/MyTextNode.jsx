import { useEffect, useRef, useState } from "react";
import { NodeResizer, useReactFlow } from "@xyflow/react";
import {
  C,
  CPlusPlus,
  CSharp,
  Go,
  Java,
  JavaScript,
  TypeScript,
  Python,
  RustDark as Rust,
  Ruby,
  PHP,
  Swift,
  Kotlin,
  HTML5,
  CSS3,
} from "developer-icons";
import MyHandle from "./MyHandle";

const LANGUAGES = [
  { key: "c", label: "C", ext: "c", Icon: C },
  { key: "cpp", label: "C++", ext: "cpp", Icon: CPlusPlus },
  { key: "csharp", label: "C#", ext: "cs", Icon: CSharp },
  { key: "go", label: "Go", ext: "go", Icon: Go },
  { key: "java", label: "Java", ext: "java", Icon: Java },
  { key: "js", label: "JavaScript", ext: "js", Icon: JavaScript },
  { key: "ts", label: "TypeScript", ext: "ts", Icon: TypeScript },
  { key: "python", label: "Python", ext: "py", Icon: Python },
  { key: "rust", label: "Rust", ext: "rs", Icon: Rust },
  { key: "ruby", label: "Ruby", ext: "rb", Icon: Ruby },
  { key: "php", label: "PHP", ext: "php", Icon: PHP },
  { key: "swift", label: "Swift", ext: "swift", Icon: Swift },
  { key: "kotlin", label: "Kotlin", ext: "kt", Icon: Kotlin },
  { key: "html", label: "HTML", ext: "html", Icon: HTML5 },
  { key: "css", label: "CSS", ext: "css", Icon: CSS3 },
];

const LANG_BY_KEY = Object.fromEntries(LANGUAGES.map((l) => [l.key, l]));
const DEFAULT_LANG = "cpp";

function MyTextNode({ id, selected, data }) {
  const { updateNodeData } = useReactFlow();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const langKey = data?.language ?? DEFAULT_LANG;
  const lang = LANG_BY_KEY[langKey] ?? LANG_BY_KEY[DEFAULT_LANG];
  const Icon = lang.Icon;
  const title = data?.title ?? "hello_world";

  const onTitleChange = (e) => {
    updateNodeData(id, { ...data, title: e.target.value });
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (key) => {
    updateNodeData(id, { ...data, language: key });
    setOpen(false);
  };

  return (
    <>
      <NodeResizer
        minWidth={225}
        minHeight={125}
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

      <div className="shadow-md/5 box-border flex flex-col w-full h-full bg-menu-bg border border-menu-border text-menu-icon">
        {/* Header */}
        <div className="flex items-center h-[32px] border-b border-menu-border">
          <div ref={wrapperRef} className="relative h-full">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center justify-center h-full w-[32px] border-r border-menu-border hover:bg-menu-light transition-all duration-200 nodrag"
            >
              <Icon size={18} className="overflow-visible shrink-0" />
            </button>
            {open && (
              <div className="absolute top-full left-0 z-50 mt-px bg-menu-bg border border-menu-border shadow-md/10 nodrag nowheel max-h-[260px] overflow-y-auto min-w-[140px]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.key}
                    type="button"
                    onClick={() => pick(l.key)}
                    className={`flex items-center gap-2 w-full h-[28px] px-2 text-xs text-left hover:bg-menu-light transition-colors ${
                      l.key === langKey ? "bg-menu-light" : ""
                    }`}
                  >
                    <l.Icon size={16} className="overflow-visible shrink-0" />
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center h-full px-3 text-xs italic">
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              spellCheck="false"
              className="flex-1 min-w-0 bg-transparent outline-0 italic nodrag"
            />
            <span className="shrink-0 italic">.{lang.ext}</span>
          </div>
        </div>

        {/* Body */}
        <textarea
          spellCheck="false"
          placeholder="// scrivi qui…"
          className="flex-1 bg-menu-bg text-menu-icon px-3 py-2 text-xs outline-0 resize-none placeholder:text-menu-icon/60 nodrag"
        />

        {/* Footer */}
        <div className="flex items-center justify-between h-[20px] px-3 border-t border-menu-border text-[10px]">
          <span>{lang.label}</span>
          <span>UTF-8 · LF</span>
        </div>

        <MyHandle />
      </div>
    </>
  );
}

export default MyTextNode;
