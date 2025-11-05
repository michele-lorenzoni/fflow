function MyEditToolBar({ className }) {
  return (
    <div
      className={`shadow-md/5 w-full box-border bg-menu-bg border-b-1 border-menu-border text-[#767c8a] text-xs flex items-center justify-between fixed z-99 h-[32px] transition-all duration-300 ${className}`}
    >
      <div className="flex h-full"></div>
    </div>
  );
}

export default MyEditToolBar;
