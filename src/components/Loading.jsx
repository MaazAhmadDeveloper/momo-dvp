import React from "react";
import LoadingIcon from "../assets/loading-icon.svg";

const Loading = ({ size = 24}) => {
  return (
    <img
      className="inline-block"  
      src={LoadingIcon}
      alt="loading"
      width={size}
      height={size}
      style={{
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default Loading;