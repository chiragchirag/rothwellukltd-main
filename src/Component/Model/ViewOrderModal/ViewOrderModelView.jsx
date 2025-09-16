import React from "react";
import {
  ModalComponent,
  ViewOrderPosComponent,
} from "../../../CommonComponent";
import DeleteModalComponent from "../DeleteModal/DeleteModalComponent";

const ViewOrderModalView = ({
  handleCloseModal,
  isAllModalOpen,
  deleteModal,
  handleConfirmDeleteHoldRecord,
  handleCancelDeleteHoldRecord,
  isStatus,
  handleOpenDeleteModal,
  handleOpenHoldData,
  handleClickViewMore,
  isEndPage,
  handleSearchChange,
  viewOrderModal,
  handleSearchKeyDown,
  posOrderHistoryInfo,
  handleOpenViewOrderCollapse,
  posUserHoldProductDetails,
  productReferenceId,
  activeKey,
  posUserProductDetails,
  loading,
}) => {
  return (
    <React.Fragment>
      <ModalComponent
        modalOpen={isAllModalOpen?.isViewOrder}
        modalTitle={"Holds"}
        modalClass={"view-order-modal-main"}
        handleModalCancel={handleCloseModal}
        modalWidth={870}
      >
        <ViewOrderPosComponent
          {...{
            handleOpenDeleteModal,
            handleOpenHoldData,
            handleClickViewMore,
            isEndPage,
            handleSearchChange,
            viewOrderModal,
            handleSearchKeyDown,
            posOrderHistoryInfo,
            handleOpenViewOrderCollapse,
            posUserHoldProductDetails,
            productReferenceId,
            activeKeys: activeKey,
            posUserProductDetails,
            loading,
          }}
        />
      </ModalComponent>
      {deleteModal?.isDeleteModal && (
        <DeleteModalComponent
          {...{
            handleCancelDeleteRecord:handleCancelDeleteHoldRecord,
            isDeleteModalLoading:isStatus,
            handleModalCancel :handleCancelDeleteHoldRecord,
            handleSaveDeleteRecord:handleConfirmDeleteHoldRecord,
            isModalOpen: deleteModal?.isDeleteModal,
            }}
        />
      )}
    </React.Fragment>
  );
};

export default ViewOrderModalView;
