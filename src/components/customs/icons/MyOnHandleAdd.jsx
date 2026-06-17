import { useEffect, useRef, useState } from "react";
import MaterialSymbolsAddSharp from "../../standard/icons/MaterialSymbolsAddSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleAdd({ onAddCode, onAddAnnotation, onAddTable }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

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

  const pick = (action) => {
    action?.();
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative h-full">
      <button className={buttonStyles} onClick={() => setOpen((o) => !o)}>
        <MaterialSymbolsAddSharp width="18px" height="18px" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-px bg-menu-bg border border-menu-border shadow-md/10 min-w-[140px]">
          <button
            type="button"
            onClick={() => pick(onAddCode)}
            className="flex items-center w-full h-[28px] px-3 text-xs text-left hover:bg-menu-light transition-colors"
          >
            Codice
          </button>
          <button
            type="button"
            onClick={() => pick(onAddAnnotation)}
            className="flex items-center w-full h-[28px] px-3 text-xs text-left hover:bg-menu-light transition-colors"
          >
            Annotazione
          </button>
          <button
            type="button"
            onClick={() => pick(onAddTable)}
            className="flex items-center w-full h-[28px] px-3 text-xs text-left hover:bg-menu-light transition-colors"
          >
            Tabella
          </button>
        </div>
      )}
    </div>
  );
}

export default MyOnHandleAdd;
