import { useCallback, useState } from 'react';
import MaterialSymbolsScreenRecord from '../../standard/icons/MaterialSymbolsScreenRecord';
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleScreenRecord () {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    if (isClicked == false) {
      setIsClicked(true);
      console.log(isClicked);
    }else{
      setIsClicked(false);
      console.log(isClicked);
    }
  }, [isClicked]);

  return (
    <button 
      className={`${buttonStyles}
        ${isClicked ? 'border-red-700 bg-red-100' : 'border-menu-border'}`}
      onClick={handleClick}
    >
      <MaterialSymbolsScreenRecord width="18px" height="18px" className={isClicked ? 'fill-red-700' : 'fill-menu-icon'} />
    </button>
  );
}

export default MyOnHandleScreenRecord;