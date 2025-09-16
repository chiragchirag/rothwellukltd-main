import { message } from "antd";
import { TEXT_COPY_FAILED, TEXT_COPY_SUCCESS } from "../Constant/primitive";

export const handleCopyToClick = (value, text) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      message.success(`${text} ${TEXT_COPY_SUCCESS}`);
    })
    .catch(() => {
      message.error(TEXT_COPY_FAILED);
    });
};
