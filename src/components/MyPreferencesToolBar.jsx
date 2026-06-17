import MyOnHandleSnap from "./customs/icons/MyOnHandleSnap";
import MyTooltipButton from "./MyTooltipButton";
import { toolbarStyles } from "./styles/classNames";

function MyPreferencesToolBar({ snapEnabled, onSnapToggle, className }) {
  return (
    <div className={`${toolbarStyles} ${className}`}>
      <div className="flex h-full">
        <MyTooltipButton tooltip="Snap to grid">
          <MyOnHandleSnap active={snapEnabled} onToggle={onSnapToggle} />
        </MyTooltipButton>
      </div>
    </div>
  );
}

export default MyPreferencesToolBar;
