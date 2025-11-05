import MyOnHandleAdd from "./customs/icons/MyOnHandleAdd";

function MyTooltipButton({ children, tooltip }) {
  return (
    <div className="relative group">
      {children}

      {tooltip && (
        <div className="absolute left-0 top-full px-2 py-1 bg-gray-800 text-white text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default MyTooltipButton;
