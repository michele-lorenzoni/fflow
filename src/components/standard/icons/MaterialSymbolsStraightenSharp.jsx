import { iconStyles } from "../../styles/classNames";

export default function MaterialSymbolsStraightenSharp(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        className={iconStyles}
        d="M21 6H3v12h18V6zm-2 10h-2v-4h-2v4h-2v-4h-2v4H9v-4H7v4H5V8h14v8z"
      ></path>
    </svg>
  );
}
