import { useState, useEffect, useCallback } from "react";
import MaterialSymbolsDarkModeOutline from "../../standard/icons/MaterialSymbolsDarkModeOutline";
import MaterialSymbolsLightModeOutline from "../../standard/icons/MaterialSymbolsLightModeOutline";
import { buttonModeStyles } from "../../styles/classNames";

function MyOnHandleMode() {
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    document.body.style.filter = isInverted ? "invert(1)" : "none";

    return () => {
      document.body.style.filter = "none";
    };
  }, [isInverted]);

  const handleClick = useCallback(() => {
    setIsInverted((prev) => !prev);
  }, []);

  const IconComponent = isInverted
    ? MaterialSymbolsLightModeOutline
    : MaterialSymbolsDarkModeOutline;

  return (
    <button className={buttonModeStyles} onClick={handleClick}>
      <IconComponent width="18px" height="18px" />
    </button>
  );
}

export default MyOnHandleMode;
