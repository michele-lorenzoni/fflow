import { useState, useCallback } from "react";
import MaterialSymbolsLockOpenOutlineSharp from "../../standard/icons/MaterialSymbolsLockOpenOutlineSharp";
import MaterialSymbolsLockSharp from "../../standard/icons/MaterialSymbolsLockSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleLock() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    if (isClicked == false) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [isClicked]);

  const IconComponent = isClicked
    ? MaterialSymbolsLockSharp
    : MaterialSymbolsLockOpenOutlineSharp;

  return (
    <button
      className={`${buttonStyles}
    ${isClicked ? "!border-red-700 bg-red-100" : "!border-green-700 bg-green-100"}`}
      onClick={handleClick}
    >
      <IconComponent
        width="18px"
        height="18px"
        className={isClicked ? "fill-red-700" : "fill-green-700"}
      />
    </button>
  );
}

export default MyOnHandleLock;
