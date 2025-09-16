import { Modal } from "antd";
import React, { useEffect } from "react";
import { successImage } from "../../assest";
import LottieImage from "../LottieImage/LottieImage";

import "../SuccessModal/successmodal.scss";

const SuccessModal = ({
  isSuccessModal,
  setIsSuccessModal,
  descriptionText,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccessModal(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Modal
        open={isSuccessModal}
        closeIcon={false}
        footer={false}
        className={"success-modal-main"}
        centered={true}
        modalWidth={350}
      >
        <div className="success-animation-image-main">
          <LottieImage
            lottieImage={successImage}
            imageClassName={"success-image-main"}
          />
          <h1 className={"success-image-text"}>{descriptionText}</h1>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default SuccessModal;
