import React from "react";

export const Image = ({ src, ...props }: any) => {
  return React.createElement("img", { src, ...props });
};
