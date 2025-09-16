import React from "react";
import {
  ButtonComponent,
  LottieImage,
  ModalComponent,
} from "../../../CommonComponent";
import { LoadingOutlined } from "@ant-design/icons";
import "../DeleteModal/deletemodal.scss";
import { deleteAnimation } from "../../../assest";
const DeleteModalComponent = ({
  isModalOpen,
  handleCancelDeleteRecord,
  isDeleteModalLoading,
  handleSaveDeleteRecord,
  name,
}) => {

  return (
    <div>
      <ModalComponent
        modalOpen={isModalOpen}
        handleModalCancel={handleCancelDeleteRecord}
        modalClass={"delete-modal"}
        modalWidth={385}
      >
        <div className="delete-animation-image-main">
          <LottieImage lottieImage={deleteAnimation} />
          <p className="delete-details">
            Are you sure want to delete this {name} ?
          </p>
        </div>
        <div className="delete-main">
          <ButtonComponent
            btnName={"Cancel"}
            btnClass={"cancel-btn"}
            handleClick={handleCancelDeleteRecord}
          />
          <ButtonComponent
            btnName={isDeleteModalLoading ? <LoadingOutlined /> : "Delete"}
            btnClass={"confirm-btn"}
            btnDisabled={isDeleteModalLoading && true}
            handleClick={handleSaveDeleteRecord}
          />
        </div>
      </ModalComponent>
    </div>
  );
};

export default DeleteModalComponent;
