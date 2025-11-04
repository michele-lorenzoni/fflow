import { useCallback, useState } from "react";
import MyOnHandleMode from "./customs/icons/MyOnHandleMode";
import MyOnHandleFavorite from "./customs/icons/MyOnHandleFavorite";
import { buttonMenuStyles, flexHFull, separator } from "./styles/classNames";

import MyToolBar from "./MyToolBar";

function MyMenu({ onScreenshot }) {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = useCallback(() => {
    if (isClicked == false) {
      setIsClicked(true);
      // console.log(isClicked);
    } else {
      setIsClicked(false);
      // console.log(isClicked);
    }
  }, [isClicked]);
    
  return (
    <>
      {/* MenuBar */}
      <div className="w-full box-border bg-menu-bg border-b-1 border-menu-border text-menu-icon text-xs flex items-center justify-between fixed z-100 h-[32px]">
        <div className={flexHFull}>
          <button className={buttonMenuStyles}>File</button>
          <div className={separator}></div>
          <button className={buttonMenuStyles}>Edit</button>
          <div className={separator}></div>
          <button className={buttonMenuStyles} onClick={handleClick}>View</button>
          <div className={separator}></div>
          <button className={buttonMenuStyles}>Preferences</button>
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

      {/* ToolBar */}
      <MyToolBar onScreenshot={onScreenshot} className={`${isClicked ? "top-0" : "top-[32px]"}`}/>
    </>
  );
}

export default MyMenu;
