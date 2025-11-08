import { useRef, useEffect, useState, useCallback } from "react";
import { NodeResizer } from "@xyflow/react";
import { textareaStyles } from "./styles/classNames";
import { CPlusPlus } from "developer-icons";
import MyHandle from "./MyHandle";

function MyTextNode(props) {
  const { selected, data } = props;
  const contentRef = useRef(null);
  const [minDimensions, setMinDimensions] = useState({
    width: 224,
    height: 124,
  });

  const [isClicked, setIsClicked] = useState(null);

  const handleClick = useCallback((toolbarName) => {
    setIsClicked((prev) => (prev === toolbarName ? null : toolbarName));
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const { scrollWidth, scrollHeight } = contentRef.current;
      setMinDimensions({
        width: scrollWidth,
        height: scrollHeight,
      });
    }
  }, [data]);

  return (
    <>
      <NodeResizer
        minWidth={minDimensions.width}
        minHeight={minDimensions.height}
        isVisible={selected}
        color="#00a6f4"
        lineStyle={{ borderWidth: 1 }}
        handleStyle={{
          width: 5,
          height: 5,
          borderRadius: 0,
          backgroundColor: "#00a6f4",
          border: "#000",
        }}
      />

      <div
        ref={contentRef}
        className="shadow-md/5 box-border flex flex-col"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className="bg-menu-bg text-menu-icon flex flex-row border border-menu-border">
          <button
            onClick={() => handleClick("file")}
            className="flex items-center justify-center h-[32px] w-[32px] hover:bg-[#fafafa] transition-all duration-300"
          >
            <CPlusPlus className="h-[18px] w-[18px]" />
          </button>
          <button className="bg-menu-bg text-menu-icon px-3 border-x-1 flex items-center justify-between text-xs italic border-menu-border hover:bg-[#fafafa] transition-all duration-300">
            <p>hello_world.cpp</p>
          </button>
        </div>

        {/* Body */}
        <textarea
          spellCheck="false"
          className={
            isClicked
              ? `${textareaStyles} hover:bg-[#fafafa] transition-all duration-300`
              : `${textareaStyles} hover:bg-[#fafafa] transition-all duration-300`
          }
        />
        <MyHandle />
      </div>
    </>
  );
}

export default MyTextNode;
