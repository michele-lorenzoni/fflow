import MyOnHandlePinchZoomOut from "./customs/icons/MyOnHandlePinchZoomOut";
import MyOnHandlePinchZoomIn from "./customs/icons/MyOnHandlePinchZoomIn";
import MyOnHandleFilterCenterFocus from "./customs/icons/MyOnHandleFilterCenterFocus";
import MyOnHandleLock from "./customs/icons/MyOnHandleLock";
import MyOnHandleGrid3x3 from "./customs/icons/MyOnHandleGrid3x3";
import MyOnHandleScreenshotKeyboard from "./customs/icons/MyOnHandleScreenshotKeyboard";
import MyOnHandleScreenRecord from "./customs/icons/MyOnHandleScreenRecord";
import MyOnHandleSvgExport from "./customs/icons/MyOnHandleSvgExport";
import MyOnHandleBackgroundDotSmall from "./customs/icons/MyOnHandleBackgroundDotSmall";
import MyOnHandleGridView from "./customs/icons/MyOnHandleGridView";

import MySeparator from "./MySeparator";
import MyTooltipButton from "./MyTooltipButton";

import { BackgroundVariant } from "@xyflow/react";

import { toolbarStyles } from "./styles/classNames";

function MyViewToolBar({
  onScreenshot,
  onExportSvg,
  onFocus,
  gridVariant,
  onGridVariantChange,
  className,
}) {
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
          <MyOnHandleFilterCenterFocus onFocus={onFocus} />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Lock">
          <MyOnHandleLock />
        </MyTooltipButton>
        <MySeparator />
        <MyTooltipButton tooltip="Lines Grid">
          <MyOnHandleGrid3x3
            active={gridVariant === BackgroundVariant.Lines}
            onSelect={() => onGridVariantChange(BackgroundVariant.Lines)}
          />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Dots Grid">
          <MyOnHandleBackgroundDotSmall
            active={gridVariant === BackgroundVariant.Dots}
            onSelect={() => onGridVariantChange(BackgroundVariant.Dots)}
          />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Cross Grid">
          <MyOnHandleGridView
            active={gridVariant === BackgroundVariant.Cross}
            onSelect={() => onGridVariantChange(BackgroundVariant.Cross)}
          />
        </MyTooltipButton>
        <MySeparator />
        <MyTooltipButton tooltip="Screenshoter">
          <MyOnHandleScreenshotKeyboard onScreenshot={onScreenshot} />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Recorder">
          <MyOnHandleScreenRecord />
        </MyTooltipButton>
        <MyTooltipButton tooltip="Export SVG">
          <MyOnHandleSvgExport onExportSvg={onExportSvg} />
        </MyTooltipButton>
      </div>
    </div>
  );
}

export default MyViewToolBar;
