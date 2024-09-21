import { type FC } from "react";

const ArrowIcon: FC<any> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 3L13.1274 9.03533C13.5893 9.42642 13.6006 10.1349 13.1515 10.5406L6 17"
        stroke="#2E628C"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowIcon;
