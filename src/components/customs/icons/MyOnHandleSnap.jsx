import MaterialSymbolsStraightenSharp from "../../standard/icons/MaterialSymbolsStraightenSharp";
import { buttonStyles, buttonActiveStyles } from "../../styles/classNames";

function MyOnHandleSnap({ active, onToggle }) {
  return (
    <button
      className={`${buttonStyles} ${active ? buttonActiveStyles : ""}`}
      onClick={onToggle}
    >
      <MaterialSymbolsStraightenSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleSnap;
