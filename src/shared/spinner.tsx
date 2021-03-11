import React from "react";
import { Spin } from "antd";

export const Spinner: React.FunctionComponent<{}> = () => {
  return (
    <Spin
      size="large"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    />
  );
};
