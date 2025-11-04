import { useCallback } from 'react';
import MaterialSymbolsBackgroundDotSmallSharp from '../../standard/icons/MaterialSymbolsBackgroundDotSmallSharp';
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleBackgroundDotSmall() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button 
      className={buttonStyles}
      onClick={handleClick}
    >
      <MaterialSymbolsBackgroundDotSmallSharp width="18px" height="18px"/>
    </button>
  );
}

export default MyOnHandleBackgroundDotSmall;