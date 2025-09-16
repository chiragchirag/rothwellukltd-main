import React from "react";
import { BRAND_PERMISSION_COLUMN } from "../../../Constant/TableConst";
import "../Brand/brand.scss";
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

const BrandView = ({
  handleOpenBrandModal,
  handleModalCancel,
  isModalOpen,
  openNotificationWithIcon,
  allBrandData,
  isBrandLoading,
  handleBlur,
  handleChange,
  formFieldData,
  brandErrors,
  brandData,
  handleSubmit,
  isBrandPending,
  isDeleteModal,
  handleCancelDeleteRecord,
  handleSaveDeleteRecord,
  handleEditOpenBrandModal,
  isEdit,
  handleSelectChange,
  handlePageChange,
  total,
  limit,
  handleSearchChange,
  currentPage,
  departmentDataList,
  handleBrandListSort,
  myPermissions,
}) => {
  return (
    <div className="brand-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          column: BRAND_PERMISSION_COLUMN(
            handleEditOpenBrandModal,
            openNotificationWithIcon,
            myPermissions,
            departmentDataList
          ),
          dataSource: brandData,
          searchPlaceholder: "Search By Brand Name",
          btnTitle:
            (myPermissions?.["D-016"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Brand",
          handleClickAddNewFunctionality: handleOpenBrandModal,
          loading: isBrandLoading,
          isTableSearch: true,
          handlePageChange,
          total,
          limit,
          handleSort: handleBrandListSort,
          handleSearchChange,
          currentPage,
          // setShowSuggestionList: () => {},
        }}
        classNames="brand-table"
      />
      {isModalOpen && (
        <ModalComponent
          modalOpen={isModalOpen}
          modalTitle={isEdit ? "Edit Brand" : "Create Brand"}
          handleModalCancel={handleModalCancel}
          modalClass={"brand-modal-main"}
          modalWidth={870}
          footer={
            <ButtonComponent
              btnName={
                isBrandPending ? (
                  <LoadingOutlined />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Save"
                )
              }
              btnClass={"save-button"}
              btnType={"submit"}
              btnDisabled={isBrandPending && true}
              handleClick={handleSubmit}
            />
          }
        >
          <Row gutter={[16, 0]} className="brand-modal-input-main">
            {Object.keys(formFieldData)?.map((fieldName) => {
              const {
                label,
                name,
                placeholder,
                validation,
                type,
                disabled,
                options,
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
                      error: brandErrors[name],
                      value: isEmpty(allBrandData[name])
                        ? ""
                        : allBrandData[name],
                      ...(validation?.maxLength && {
                        maxLength: validation?.maxLength,
                      }),
                      options:
                        name === "departmentType"
                          ? departmentDataList
                          : options,
                    }}
                    inputClass={"brand-input"}
                    SelectClassNames={"brand-input"}
                    inputMain={"brand-input-wrap"}
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
            name: `Brand`,
          }}
        />
      )}
    </div>
  );
};

export default BrandView;
