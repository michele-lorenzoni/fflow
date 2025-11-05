import { Handle, Position } from "@xyflow/react";
import { handleStyles } from "./styles/classNames";

function MyHandle() {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <>
      <Handle
        type="source"
        position={Position.Top}
        className={handleStyles}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className={handleStyles}
      />
      <Handle
        type="source"
        position={Position.Left}
        className={handleStyles}
      />
      <Handle
        type="target"
        position={Position.Right}
        className={handleStyles}
      />
    </>
  );
}

export default MyHandle;
