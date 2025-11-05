import { toolbarStyles } from "./styles/classNames";

function MyViewToolBar({ className }) {
  return (
    <div className={`${toolbarStyles} ${className}`}>
      <div className="flex w-full h-full">
        <input type="text" className="px-3 w-full h-full outline-none"></input>
      </div>
    </div>
  );
}

export default MyViewToolBar;
