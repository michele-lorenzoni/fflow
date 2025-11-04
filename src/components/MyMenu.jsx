import MyOnHandleMode from './customs/icons/MyOnHandleMode';
import MyOnHandleFavorite from './customs/icons/MyOnHandleFavorite';
import { buttonMenuStyles } from './styles/classNames';

import MyToolBar from './MyToolBar';

function MyMenu({onScreenshot}) {
  return (
    <>
      <div className="w-full box-border bg-menu-bg border-b-1 border-menu-border text-menu-icon text-xs flex items-center justify-between fixed z-100 h-[32px]">
        <div className='flex h-full'>
          <button className={buttonMenuStyles}>File</button>
          <div className="border-l-1 border-menu-border"></div>
          <button className={buttonMenuStyles}>Edit</button>
          <div className="border-l-1 border-menu-border"></div>
          <button className={buttonMenuStyles}>View</button>
          <div className="border-l-1 border-menu-border"></div>
          <button className={buttonMenuStyles}>Preferences</button>
        </div>
        <div className='h-full flex'>
          <div className='h-full bg-neutral-950'>
            <MyOnHandleMode />
          </div>
          <div className='h-full bg-pink-950'>
            <MyOnHandleFavorite />
          </div>
        </div>
      </div>
      <MyToolBar onScreenshot={onScreenshot} />
    </>
  );
}

export default MyMenu;