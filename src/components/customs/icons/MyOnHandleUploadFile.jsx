import { useCallback } from "react";
import MaterialSymbolsUploadFileSharp from "../../standard/icons/MaterialSymbolsUploadFileSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleUploadFile() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsUploadFileSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleUploadFile;
