import { useState, useCallback } from "react";
import MaterialSymbolsLockOpenOutlineSharp from "../../standard/icons/MaterialSymbolsLockOpenOutlineSharp";
import MaterialSymbolsLockSharp from "../../standard/icons/MaterialSymbolsLockSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleLock() {
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

  const IconComponent = isClicked
    ? MaterialSymbolsLockSharp
    : MaterialSymbolsLockOpenOutlineSharp;

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <IconComponent width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleLock;
