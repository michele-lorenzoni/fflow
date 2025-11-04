import { useCallback } from 'react';
import MaterialSymbolsPinchZoomOutOutlineSharp from '../../standard/icons/MaterialSymbolsPinchZoomOutOutlineSharp';
import { buttonStyles } from "../../styles/classNames";

function MyOnHandlePinchZoomOut() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button 
      className={buttonStyles}
      onClick={handleClick}
    >
      <MaterialSymbolsPinchZoomOutOutlineSharp width="18px" height="18px"/>
    </button>
  );
}

export default MyOnHandlePinchZoomOut;