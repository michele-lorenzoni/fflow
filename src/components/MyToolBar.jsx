import MyOnHandlePinchZoomOut from './customs/icons/MyOnHandlePinchZoomOut';
import MyOnHandlePinchZoomIn from './customs/icons/MyOnHandlePinchZoomIn';
import MyOnHandleFilterCenterFocus from './customs/icons/MyOnHandleFilterCenterFocus';
import MyOnHandleLockOpen from './customs/icons/MyOnHandleLockOpen';
import MyOnHandleGrid3x3 from './customs/icons/MyOnHandleGrid3x3';
import MyOnHandleScreenshotKeyboard from './customs/icons/MyOnHandleScreenshotKeyboard';
import MyOnHandleScreenRecord from './customs/icons/MyOnHandleScreenRecord';
import MyOnHandleBackgroundDotSmall from './customs/icons/MyOnHandleBackgroundDotSmall';
import MyOnHandleGridView from './customs/icons/MyOnHandleGridView';

function MyToolBar({onScreenshot}) {
  return (
    <div className="shadow-md/5 w-full box-border bg-menu-bg border-b-1 border-menu-border text-[#767c8a] text-xs flex items-center justify-between fixed z-99 top-[32px] h-[32px]">
        <div className='flex h-full'>
            <MyOnHandlePinchZoomOut />
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

export default MyToolBar;