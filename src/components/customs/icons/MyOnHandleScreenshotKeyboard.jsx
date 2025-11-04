// import { useCallback } from 'react';
import MaterialSymbolsScreenshotKeyboardOutlineSharp from '../../standard/icons/MaterialSymbolsScreenshotKeyboardOutlineSharp';
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleScreenshotKeyboard({onScreenshot}) {
  // const handleClick = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <button 
      className={buttonStyles}
      onClick={onScreenshot}
    >
      <MaterialSymbolsScreenshotKeyboardOutlineSharp width="18px" height="18px"/>
    </button>
  );
}

export default MyOnHandleScreenshotKeyboard;