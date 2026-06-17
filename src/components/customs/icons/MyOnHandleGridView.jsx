import MaterialSymbolsGridViewSharp from "../../standard/icons/MaterialSymbolsGridViewSharp";
import { buttonStyles, buttonActiveStyles } from "../../styles/classNames";

function MyOnHandleGridView({ active, onSelect }) {
  return (
    <button
      className={`${buttonStyles} ${active ? buttonActiveStyles : ""}`}
      onClick={onSelect}
    >
      <MaterialSymbolsGridViewSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleGridView;
