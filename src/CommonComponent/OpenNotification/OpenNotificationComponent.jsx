import { notification } from "antd";
import "../OpenNotification/opennotification.scss";

const OpenNotificationComponent = (message, status) => {
  notification[status]({
    message: message,
    duration: 3,
  });
};

export default OpenNotificationComponent;
