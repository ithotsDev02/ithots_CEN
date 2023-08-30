import React from "react";
import { notification } from "antd";

const errorNotification = (message, dataKeySuffix) =>
  notification.error({
    message: <span>{message}</span>,
  });

export default errorNotification;
