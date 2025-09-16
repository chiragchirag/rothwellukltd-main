import React from "react";
import { ButtonComponent, ImageComponent } from "../../../CommonComponent";
import { addCart } from "../../../assest";
import { ViewOrderModalContainer } from "../../Model";

const ViewOrderButtonView = ({
  handleOpenModal,
  handleCloseModal,
  isAllModalOpen,
  handleClickViewMore,
  setViewOrderModal,
  viewOrderModal,
  handleGetViewOrderInfo,
  setIsAllModalOpen,
}) => {
  return (
    <div>
      <ButtonComponent
        handleClick={handleOpenModal}
        btnIcon={
          <ImageComponent
            imageSrc={addCart}
            imageAlt={"view-order"}
            imageClassName={"view-order"}
            imageHeight={16}
            imageWidth={16}
          />
        }
        btnName={"Hold List"}
        btnClass="view-order-button"
        isFrontIcon={true}
      />
      {isAllModalOpen?.isViewOrder && (
        <ViewOrderModalContainer
          {...{
            handleCloseModal,
            isAllModalOpen,
            handleClickViewMore,
            setViewOrderModal,
            viewOrderModal,
            handleGetViewOrderInfo,
            setIsAllModalOpen,
          }}
        />
      )}
    </div>
  );
};

export default ViewOrderButtonView;
