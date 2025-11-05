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

import { toolbarStyles } from "./styles/classNames";

function MyViewToolBar({ onScreenshot, className }) {
  return (
    <div className={`${toolbarStyles} ${className}`}>
      <div className="flex h-full">
        <MyOnHandlePinchZoomOut />
        <MyOnHandlePinchZoomIn />
        <MyOnHandleFilterCenterFocus />
        <MyOnHandleLock />
        <MySeparator />
        <MyOnHandleGrid3x3 />
        <MyOnHandleBackgroundDotSmall />
        <MyOnHandleGridView />
        <MySeparator />
        <MyOnHandleScreenshotKeyboard onScreenshot={onScreenshot} />
        <MyOnHandleScreenRecord />
      </div>
    </div>
  );
}

export default MyViewToolBar;
