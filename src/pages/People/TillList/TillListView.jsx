import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { TILL_LIST_COLUMN } from "../../../Constant/TableConst";
import { DeleteModalComponent } from "../../../Component/Model";
import "./TillList.scss";

const TillListView = (props) => {
  const {
    isDeleteLoading,
    isLoading,
    isTillLoading,
    isCreateTillModel,
    formFields,
    tillValues,
    tillErrors,
    tillListData,
    deleteModel,
    handleOpenCreateTillModel,
    handleChange,
    handleBlur,
    handleSaveTill,
    handleOpenDeleteTillModel,
    handleCancelDeleteRecord,
    handleSaveDeleteRecord,
    handleSelectChange,
  } = props;
  return (
    <div className="till-list-main">
      <TableContainer
        {...{
          loading: isLoading,
          column: TILL_LIST_COLUMN(
            handleOpenDeleteTillModel,
            handleSelectChange
          ),
          dataSource: tillListData,
          isTableHeader: true,
          btnTitle: "Till",
          handleClickAddNewFunctionality: handleOpenCreateTillModel,
        }}
        classNames="till-table"
      />
      {isCreateTillModel && (
        <ModalComponent
          modalTitle={"New Till"}
          footer={
            <div className="modal-buttons-main">
              <ButtonComponent
                {...{
                  btnName: "Cancel",
                  handleClick: handleOpenCreateTillModel,
                  btnDisabled: isTillLoading && true,
                }}
                btnClass="filter-cancel-btn"
              />
              <ButtonComponent
                {...{
                  btnName: "Save",
                  handleClick: handleSaveTill,
                  isStatus: isTillLoading,
                }}
                btnClass="filter-button"
              />
            </div>
          }
          modalOpen={isCreateTillModel}
          handleModalCancel={handleOpenCreateTillModel}
          modalClass="new-till-modal"
          modalWidth={780}
        >
          {Object.keys(formFields).map((ele) => {
            const { type, name, label, placeholder } = formFields[ele];
            return (
              <React.Fragment key={name}>
                <FormFieldsComponent
                  {...{
                    type,
                    name,
                    label,
                    placeholder,
                    value: tillValues?.[name],
                    error: tillErrors?.[name],
                    handleChange,
                    handleBlur,
                  }}
                />
              </React.Fragment>
            );
          })}
        </ModalComponent>
      )}

      {deleteModel?.isDeleteModel && (
        <DeleteModalComponent
          {...{
            isModalOpen: deleteModel?.isDeleteModel,
            isDeleteModalLoading: isDeleteLoading,
            handleSaveDeleteRecord: handleSaveDeleteRecord,
            handleCancelDeleteRecord,
          }}
        />
      )}
    </div>
  );
};

export default TillListView;
