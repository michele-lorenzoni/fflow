import { useRef, useEffect, useState } from "react";
import { NodeResizer } from "@xyflow/react";
import { textareaStyles } from "./styles/classNames";

import { DiJsBadge } from "react-icons/di";
import MyHandle from "./MyHandle";

function MyTextNode(props) {
  const { selected, data } = props;
  const contentRef = useRef(null);
  const [minDimensions, setMinDimensions] = useState({
    width: 224,
    height: 124,
  });

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
        {/* Title */}
        <div className="bg-menu-bg text-menu-icon h-[32px] flex flex-row border-1 border-b-0 border-menu-border">
          <div className="flex items-center justify-center h-[32px] w-[32px]">
            <DiJsBadge className="h-[18px] w-[18px]" />
          </div>
          <div className="bg-menu-bg text-menu-icon h-[32px] px-3 flex items-center justify-between border-x-1 border-menu-border text-xs italic">
            <p>hello_world.js</p>
          </div>
        </div>

        {/* Body */}
        <textarea
          className={textareaStyles}
          defaultValue="Lorem Ipsum"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
        ></textarea>
        <MyHandle />
      </div>
    </>
  );
}

export default MyTextNode;
