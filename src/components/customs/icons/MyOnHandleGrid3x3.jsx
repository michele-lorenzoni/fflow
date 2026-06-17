import MaterialSymbolsGrid3x3 from "../../standard/icons/MaterialSymbolsGrid3x3";
import { buttonStyles, buttonActiveStyles } from "../../styles/classNames";

function MyOnHandleGrid3x3({ active, onSelect }) {
  return (
    <button
      className={`${buttonStyles} ${active ? buttonActiveStyles : ""}`}
      onClick={onSelect}
    >
      <MaterialSymbolsGrid3x3 width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleGrid3x3;
