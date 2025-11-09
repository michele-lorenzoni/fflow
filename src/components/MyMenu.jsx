import { useCallback, useState } from "react";
import MyOnHandleMode from "./customs/icons/MyOnHandleMode";
import MyOnHandleFavorite from "./customs/icons/MyOnHandleFavorite";
import { buttonMenuStyles, flexHFull, separator } from "./styles/classNames";

import MyViewToolBar from "./MyViewToolBar";
import MyEditToolBar from "./MyEditToolBar";
import MyFileToolBar from "./MyFileToolBar";
import MyPreferencesToolBar from "./MyPreferencesToolBar";

function MyMenu({ onScreenshot, onAdd }) {
  const [activeToolbar, setActiveToolbar] = useState(null);

  const handleToolbarToggle = useCallback((toolbarName) => {
    setActiveToolbar((prev) => (prev === toolbarName ? null : toolbarName));
  }, []);

  return (
    <>
      {/* MenuBar */}
      <div className="w-full box-border bg-menu-bg border-b-1 border-menu-border text-menu-icon text-xs flex items-center justify-between fixed z-100 h-[32px]">
        <div className={flexHFull}>
          <button
            className={buttonMenuStyles}
            onClick={() => handleToolbarToggle("file")}
          >
            File
          </button>
          <div className={separator}></div>
          <button
            className={buttonMenuStyles}
            onClick={() => handleToolbarToggle("edit")}
          >
            Edit
          </button>
          <div className={separator}></div>
          <button
            className={buttonMenuStyles}
            onClick={() => handleToolbarToggle("view")}
          >
            View
          </button>
          <div className={separator}></div>
          <button
            className={buttonMenuStyles}
            onClick={() => handleToolbarToggle("preferences")}
          >
            Preferences
          </button>
        </div>
        <div className={flexHFull}>
          <div className="h-full bg-neutral-950">
            <MyOnHandleMode />
          </div>
          <div className="h-full bg-pink-950">
            <MyOnHandleFavorite />
          </div>
        </div>
      </div>

      {/* Toolbars */}
      <MyFileToolBar
        className={`${activeToolbar === "file" ? "top-[32px] opacity-100" : "top-0 opacity-0"}`}
      />
      <MyEditToolBar
        onAdd={onAdd}
        className={`${activeToolbar === "edit" ? "top-[32px] opacity-100" : "top-0 opacity-0"}`}
      />
      <MyViewToolBar
        onScreenshot={onScreenshot}
        className={`${activeToolbar === "view" ? "top-[32px] opacity-100" : "top-0 opacity-0"}`}
      />
      <MyPreferencesToolBar
        className={`${activeToolbar === "preferences" ? "top-[32px] opacity-100" : "top-0 opacity-0"}`}
      />
    </>
  );
}

export default MyMenu;
