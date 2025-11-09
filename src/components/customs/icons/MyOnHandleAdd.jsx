import MaterialSymbolsAddSharp from "../../standard/icons/MaterialSymbolsAddSharp";
import { buttonStyles } from "../../styles/classNames";

function MyOnHandleAdd({ onAdd }) {
  return (
    <button className={buttonStyles} onClick={onAdd}>
      <MaterialSymbolsAddSharp width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleAdd;
