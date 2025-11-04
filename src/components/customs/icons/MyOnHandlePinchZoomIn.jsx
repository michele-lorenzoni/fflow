import { useCallback } from "react";
import MaterialSymbolsPinchZoomInOutlineSharp from "../../standard/icons/MaterialSymbolsPinchZoomInOutlineSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandlePinchZoomIn() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsPinchZoomInOutlineSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandlePinchZoomIn;
