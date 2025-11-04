import { Handle, Position } from "@xyflow/react";

function MyHandle() {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <>
      {/* <Handle type="source" position={Position.Top} className="!rounded-none !border-menu-border !bg-[#fafafa] !h-[5px] !w-[5px]" /> */}
      <Handle
        type="target"
        position={Position.Bottom}
        className="!rounded-none !border-menu-border !bg-[#fafafa] !h-[5px] !w-[5px]"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!rounded-none !border-menu-border !bg-[#fafafa] !h-[5px] !w-[5px]"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="!rounded-none !border-menu-border !bg-[#fafafa] !h-[5px] !w-[5px]"
      />
    </>
  );
}

export default MyHandle;
