import React from "react";
import {
  ButtonComponent,
  ImageComponent,
  ModalComponent,
} from "../../../CommonComponent";
import { reset } from "../../../assest";
import { NewSalesReturnContainer } from "../../../pages";
import "./ReturnBtn.scss"

const ReturnButtonView = (props) => {
  const { isReturnModel, setIsReturnModel, handleOpenReturnModel } = props;
  return (
    <div className="reset-btn-main">
      <ButtonComponent
        btnIcon={
          <ImageComponent
            imageSrc={reset}
            imageAlt={"reset-page"}
            imageClassName={"reset-page"}
            imageHeight={16}
            imageWidth={16}
          />
        }
        handleClick={handleOpenReturnModel}
        btnClass="reset-button"
        btnName={"Return"}
        isFrontIcon={true}
      />
      {isReturnModel && (
        <ModalComponent
          modalOpen={isReturnModel}
          handleModalCancel={handleOpenReturnModel}
          modalTitle={"Sales Return"}
          modalClass={"sales-return-modal-main"}
          modalWidth={870}
        >
          <NewSalesReturnContainer
            {...{ isPosReturn: true, setIsReturnModel }}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default ReturnButtonView;
