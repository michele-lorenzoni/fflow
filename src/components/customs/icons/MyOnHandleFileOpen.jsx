import { useCallback } from "react";
import MaterialSymbolsFileOpenSharp from "../../standard/icons/MaterialSymbolsFileOpenSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleFileOpen() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsFileOpenSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleFileOpen;
