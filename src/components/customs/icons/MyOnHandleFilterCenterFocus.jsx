import { useCallback } from "react";
import MaterialSymbolsFilterCenterFocusOutlineSharp from "../../standard/icons/MaterialSymbolsFilterCenterFocusOutlineSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandlePinchZoomIn() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsFilterCenterFocusOutlineSharp
        width="18px"
        height="18px"
      />
    </button>
  );
}

export default MyOnHandlePinchZoomIn;
