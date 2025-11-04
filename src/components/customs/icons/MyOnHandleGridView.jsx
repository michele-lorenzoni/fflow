import { useCallback } from 'react';
import MaterialSymbolsGridViewSharp from '../../standard/icons/MaterialSymbolsGridViewSharp';
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleGridView() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button 
      className={buttonStyles}
      onClick={handleClick}
    >
      <MaterialSymbolsGridViewSharp width="18px" height="18px"/>
    </button>
  );
}

export default MyOnHandleGridView;