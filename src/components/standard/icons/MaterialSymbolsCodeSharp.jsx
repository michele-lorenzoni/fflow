import { iconStyles } from "../../styles/classNames";

export default function MaterialSymbolsCodeSharp(props) {
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
        d="M9.4 16.6L4.8 12L9.4 7.4L8 6l-6 6l6 6zm5.2 0l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6z"
      ></path>
    </svg>
  );
}
