import React from "react";
import { notification } from "antd";

const successNotification = (message, dataKeySuffix) =>
  notification.success({
    message: <span>{message}</span>,
  });

export default successNotification;
