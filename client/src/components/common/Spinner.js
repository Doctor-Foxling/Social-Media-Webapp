import React from "react";
import spinnerGif from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinnerGif}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
