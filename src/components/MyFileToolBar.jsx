import MyOnHandlePinchZoomOut from "./customs/icons/MyOnHandlePinchZoomOut";
import MyOnHandlePinchZoomIn from "./customs/icons/MyOnHandlePinchZoomIn";
import MyOnHandleFilterCenterFocus from "./customs/icons/MyOnHandleFilterCenterFocus";
import MyOnHandleLockOpen from "./customs/icons/MyOnHandleLockOpen";
import MyOnHandleGrid3x3 from "./customs/icons/MyOnHandleGrid3x3";
import MyOnHandleScreenshotKeyboard from "./customs/icons/MyOnHandleScreenshotKeyboard";
import MyOnHandleScreenRecord from "./customs/icons/MyOnHandleScreenRecord";
import MyOnHandleBackgroundDotSmall from "./customs/icons/MyOnHandleBackgroundDotSmall";
import MyOnHandleGridView from "./customs/icons/MyOnHandleGridView";
import MyOnHandleAdd from "./customs/icons/MyOnHandleAdd";

import MyTooltipButton from "./MyTooltipButton";

function MyFileToolBar({ onScreenshot, className }) {
  return (
    <div
      className={`shadow-md/5 w-full box-border bg-menu-bg border-b-1 border-menu-border text-[#767c8a] text-xs flex items-center justify-between fixed z-99 h-[32px] transition-all duration-300 ${className}`}
    >
      <div className="flex h-full">
        <MyTooltipButton
            tooltip="Open File"
        >
            <MyOnHandleAdd />
        </MyTooltipButton>
        <MyOnHandlePinchZoomIn />
        <MyOnHandleFilterCenterFocus />
        <MyOnHandleLockOpen />
        <div className="border-l-1 border-menu-border"></div>
        <MyOnHandleGrid3x3 />
        <MyOnHandleBackgroundDotSmall />
        <MyOnHandleGridView />
        <div className="border-l-1 border-menu-border"></div>
        <MyOnHandleScreenshotKeyboard onScreenshot={onScreenshot} />
        <MyOnHandleScreenRecord />
      </div>
    </div>
  );
}

export default MyFileToolBar;
