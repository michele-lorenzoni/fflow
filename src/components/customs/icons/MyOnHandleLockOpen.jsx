import { useCallback } from "react";
import MaterialSymbolsLockOpenOutlineSharp from "../../standard/icons/MaterialSymbolsLockOpenOutlineSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleLockOpen() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsLockOpenOutlineSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleLockOpen;
