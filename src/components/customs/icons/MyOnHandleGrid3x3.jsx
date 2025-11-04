import { useCallback } from "react";
import MaterialSymbolsGrid3x3 from "../../standard/icons/MaterialSymbolsGrid3x3";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleGrid3x3() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsGrid3x3 width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleGrid3x3;
