import { Modal } from "antd";
import React from "react";
import { isEmpty } from "../../Utils";

const ModalComponent = ({
  modalOpen,
  children,
  handleModalCancel,
  modalClass,
  modalWidth,
  modalTitle,
  modalZIndex,
  footer,
  closeIcon,
  maskClosable,
}) => {
  return (
    <Modal
      open={modalOpen}
      footer={footer ? footer : false}
      onCancel={handleModalCancel}
      className={modalClass}
      width={modalWidth}
      title={modalTitle}
      zIndex={modalZIndex}
      closeIcon={!isEmpty(closeIcon) ? closeIcon : true}
      centered={true}
      maskClosable={!isEmpty(maskClosable) ? maskClosable : true}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
