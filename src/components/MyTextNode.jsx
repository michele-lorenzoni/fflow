import { useRef, useState } from "react";
import { NodeResizer } from "@xyflow/react";
import { CPlusPlus } from "developer-icons";
import MyHandle from "./MyHandle";

function MyTextNode(props) {
  const { selected } = props;
  const contentRef = useRef(null);
  const [minDimensions] = useState({ width: 224, height: 140 });

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
        className="shadow-md/5 box-border flex flex-col w-full h-full bg-menu-bg border border-menu-border text-menu-icon"
      >
        {/* Header */}
        <div className="flex items-center h-[32px] border-b border-menu-border">
          <div className="flex items-center justify-center h-full w-[32px] border-r border-menu-border">
            <CPlusPlus className="h-[14px] w-[14px]" />
          </div>
          <div className="flex-1 flex items-center h-full px-3 text-xs italic">
            hello_world.cpp
          </div>
        </div>

        {/* Body */}
        <textarea
          spellCheck="false"
          placeholder="// scrivi qui…"
          className="flex-1 bg-menu-bg text-menu-icon px-3 py-2 text-xs outline-0 resize-none placeholder:text-menu-icon/60"
        />

        {/* Footer */}
        <div className="flex items-center justify-between h-[20px] px-3 border-t border-menu-border text-[10px]">
          <span>C++</span>
          <span>UTF-8 · LF</span>
        </div>

        <MyHandle />
      </div>
    </>
  );
}

export default MyTextNode;
