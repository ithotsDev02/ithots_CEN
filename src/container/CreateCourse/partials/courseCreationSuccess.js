import React from "react";
import { ScheduleCourse } from "../index";
import { Button, notification } from "antd";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};
export const courseCreationSuccess = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        ScheduleCourse();
        notification.close(key);
      }}
    >
      Schedule Now
    </Button>
  );
  const args = {
    message: <span>Schedule Course</span>,
    description: (
      <span>
        Do you want to schedule the course created now, or you can schedule at
        anytime from dashboard.
      </span>
    ),
    btn,
    key,
    onClose: close,
    duration: 0,
  };
  notification.open(args);
};
// const successNotification = (message, dataKeySuffix) =>
//   notification.success({
//     message: <span>{message}</span>,
//   });

// export default successNotification;
