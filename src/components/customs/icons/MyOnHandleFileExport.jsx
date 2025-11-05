import { useCallback } from "react";
import MaterialSymbolsFileExportSharp from "../../standard/icons/MaterialSymbolsFileExportSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleFileExport() {
  const handleClick = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <MaterialSymbolsFileExportSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleFileExport;
