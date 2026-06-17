import { Fragment } from "react";
import { Handle, Position } from "@xyflow/react";
import { handleStyles } from "./styles/classNames";

const sides = [
  { position: Position.Top, key: "top" },
  { position: Position.Right, key: "right" },
  { position: Position.Bottom, key: "bottom" },
  { position: Position.Left, key: "left" },
];

function MyHandle() {
  return (
    <>
      {sides.map(({ position, key }) => (
        <Fragment key={key}>
          <Handle
            id={`${key}-source`}
            type="source"
            position={position}
            className={handleStyles}
          />
          <Handle
            id={`${key}-target`}
            type="target"
            position={position}
            className={handleStyles}
          />
        </Fragment>
      ))}
    </>
  );
}

export default MyHandle;
