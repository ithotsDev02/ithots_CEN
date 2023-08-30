import React from "react";
import { Popover, Button } from "antd";

function CustomPopover({ title, content, bodyContent, maxheight, maxWidth }) {
  return (
    <Popover
      placement="right"
      title={title}
      overlayStyle={{
        width: "30vw",
      }}
      content={content}
      // trigger="click"
    >
      <div>{bodyContent}</div>
    </Popover>
  );
}

export default CustomPopover;
