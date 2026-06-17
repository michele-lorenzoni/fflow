import { NodeResizer } from "@xyflow/react";
import MyHandle from "./MyHandle";

function MyAnnotationNode({ selected }) {
  return (
    <>
      <NodeResizer
        minWidth={150}
        minHeight={75}
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

      <div className="shadow-md/5 box-border flex flex-col w-full h-full bg-menu-bg border border-menu-border text-menu-icon">
        <div className="h-[10px] shrink-0 border-b border-menu-border bg-menu-light cursor-move" />
        <textarea
          spellCheck="false"
          placeholder="// annotazione…"
          className="flex-1 bg-transparent text-menu-icon px-3 py-2 text-xs outline-0 resize-none placeholder:text-menu-icon/60 nodrag"
        />
        <MyHandle />
      </div>
    </>
  );
}

export default MyAnnotationNode;
