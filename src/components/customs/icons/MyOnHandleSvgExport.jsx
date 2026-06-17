import MaterialSymbolsCodeSharp from "../../standard/icons/MaterialSymbolsCodeSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleSvgExport({ onExportSvg }) {
  return (
    <button className={buttonStyles} onClick={onExportSvg}>
      <MaterialSymbolsCodeSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleSvgExport;
