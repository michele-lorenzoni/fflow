import MyOnHandlePinchZoomOut from "./customs/icons/MyOnHandlePinchZoomOut";
import MyOnHandlePinchZoomIn from "./customs/icons/MyOnHandlePinchZoomIn";
import MyOnHandleFilterCenterFocus from "./customs/icons/MyOnHandleFilterCenterFocus";
import MyOnHandleLock from "./customs/icons/MyOnHandleLock";
import MyOnHandleGrid3x3 from "./customs/icons/MyOnHandleGrid3x3";
import MyOnHandleScreenshotKeyboard from "./customs/icons/MyOnHandleScreenshotKeyboard";
import MyOnHandleScreenRecord from "./customs/icons/MyOnHandleScreenRecord";
import MyOnHandleBackgroundDotSmall from "./customs/icons/MyOnHandleBackgroundDotSmall";
import MyOnHandleGridView from "./customs/icons/MyOnHandleGridView";

import MySeparator from "./MySeparator";
import MyTooltipButton from "./MyTooltipButton";

import { toolbarStyles } from "./styles/classNames";

function MyViewToolBar({ onScreenshot, className }) {
  return (
    <div className={`${toolbarStyles} ${className}`}>
      <div className="flex h-full">
        <MyTooltipButton tooltip="Zoom Out">
          <MyOnHandlePinchZoomOut />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Zoom In">
          <MyOnHandlePinchZoomIn />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Focus">
          <MyOnHandleFilterCenterFocus />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Lock">
          <MyOnHandleLock />
        </MyTooltipButton>
        <MySeparator />
        <MyTooltipButton tooltip="Lines Grid">
          <MyOnHandleGrid3x3 />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Dots Grid">
          <MyOnHandleBackgroundDotSmall />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Cross Grid">
          <MyOnHandleGridView />
        </MyTooltipButton>
        <MySeparator />
        <MyTooltipButton tooltip="Screenshoter">
          <MyOnHandleScreenshotKeyboard onScreenshot={onScreenshot} />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Recorder">
          <MyOnHandleScreenRecord />
        </MyTooltipButton>
      </div>
    </div>
  );
}

export default MyViewToolBar;
