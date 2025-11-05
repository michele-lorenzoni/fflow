import { useCallback } from "react";
import MaterialSymbolsAddSharp from "../../standard/icons/MaterialSymbolsAddSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleAdd() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsAddSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleAdd;
