import MaterialSymbolsBackgroundDotSmallSharp from "../../standard/icons/MaterialSymbolsBackgroundDotSmallSharp";
import { buttonStyles, buttonActiveStyles } from "../../styles/classNames";

function MyOnHandleBackgroundDotSmall({ active, onSelect }) {
  return (
    <button
      className={`${buttonStyles} ${active ? buttonActiveStyles : ""}`}
      onClick={onSelect}
    >
      <MaterialSymbolsBackgroundDotSmallSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleBackgroundDotSmall;
