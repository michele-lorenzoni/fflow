import MaterialSymbolsFilterCenterFocusOutlineSharp from "../../standard/icons/MaterialSymbolsFilterCenterFocusOutlineSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleFilterCenterFocus({ onFocus }) {
  return (
    <button className={buttonStyles} onClick={onFocus}>
      <MaterialSymbolsFilterCenterFocusOutlineSharp
        width="18px"
        height="18px"
      />
    </button>
  );
}

export default MyOnHandleFilterCenterFocus;
