import React from "react";
import { UNIT_PERMISSION_COLUMN } from "../../../Constant/TableConst";
import "../Unit/unitlist.scss";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";
import { DeleteModalComponent } from "../../../Component/Model";

const UnitListView = ({
  handleOpenUnitModal,
  handleModalCancel,
  isModalOpen,
  handleDeleteModal,
  isUnitLoading,
  allUnitData,
  formFieldData,
  unitErrors,
  handleBlur,
  handleChange,
  unitsData,
  handleSubmit,
  isUnitPending,
  isDeleteModal,
  handleCancelDeleteRecord,
  handleSaveDeleteRecord,
  handleEditOpenUnitModal,
  isEdit,
  handleSelectChange,
  myPermissions,
}) => {
  return (
    <div className="unit-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          column: UNIT_PERMISSION_COLUMN(
            handleEditOpenUnitModal,
            handleDeleteModal,
            myPermissions
          ),
          dataSource: unitsData,
          loading: isUnitLoading,
          btnTitle:
            (myPermissions?.["D-019"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Unit",
          handleClickAddNewFunctionality: handleOpenUnitModal,
        }}
        classNames="unit-list-table"
      />
      {isModalOpen && (
        <ModalComponent
          modalOpen={isModalOpen}
          modalTitle={isEdit ? "Edit Unit" : "Create Unit"}
          handleModalCancel={handleModalCancel}
          modalClass={"unit-modal-main"}
          modalWidth={870}
          footer={
            <ButtonComponent
              btnName={
                isUnitPending ? <LoadingOutlined /> : isEdit ? "Update" : "Save"
              }
              btnClass={"create-button"}
              btnType={"submit"}
              btnDisabled={isUnitPending && true}
              handleClick={handleSubmit}
            />
          }
        >
          <Row gutter={[16, 0]} className="unit-modal-input-main">
            {Object.keys(formFieldData)?.map((fieldName) => {
              const {
                label,
                name,
                placeholder,
                validation,
                type,
                disabled,
                defaultValue,
              } = formFieldData[fieldName];
              return (
                <Col
                  key={name}
                  span={24}
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={24}
                >
                  <FormFieldsComponent
                    {...{
                      type,
                      name,
                      placeholder,
                      label,
                      handleBlur,
                      handleChange,
                      handleSelectChange,
                      disabled,
                      defaultValue,
                      error: unitErrors[name],
                      value: isEmpty(allUnitData[name])
                        ? ""
                        : allUnitData[name],
                      ...(validation?.maxLength && {
                        maxLength: validation?.maxLength,
                      }),
                    }}
                    inputMain={"unit-list-input-main"}
                    inputClass={"unit-list-input"}
                  />
                </Col>
              );
            })}
          </Row>
        </ModalComponent>
      )}
      {isDeleteModal?.isOpen && (
        <DeleteModalComponent
          {...{
            isModalOpen: isDeleteModal?.isOpen,
            handleCancelDeleteRecord,
            isDeleteModalLoading: isDeleteModal?.isLoading,
            handleSaveDeleteRecord,
            name: `Unit`,
          }}
        />
      )}
    </div>
  );
};

export default UnitListView;
