import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import "../Category/category.scss";
import { CATEGORY_PERMISSION_COLUMN } from "../../../Constant/TableConst";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DeleteModalComponent } from "../../../Component/Model";
import { loader } from "../../../assest";

const CategoryView = ({
  handleOpenCategoryModal,
  handleModalCancel,
  isModalOpen,
  handleDeleteModal,
  allCategoryData,
  isCategoryLoading,
  handleBlur,
  handleChange,
  formFieldData,
  categoryErrors,
  categoryData,
  handleSubmit,
  isBrandPending,
  isDeleteModal,
  handleCancelDeleteRecord,
  handleSaveDeleteRecord,
  handleEditOpenCategoryModal,
  isEdit,
  brandDataList,
  handleSelectChange,
  categoryDataList,
  handlePageChange,
  total,
  limit,
  currentPage,
  handleSearchChange,
  departmentDataList,
  brandDisabled,
  myPermissions,
  dataLoading,
  brandFilterList,
  brandNameValue,
  handleFilterSelectChange,
}) => {
  return (
    <div className="category-table-modal-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          isFilterDropDown: true,
          column: CATEGORY_PERMISSION_COLUMN(
            handleEditOpenCategoryModal,
            handleDeleteModal,
            myPermissions,
            departmentDataList
          ),
          handleSearchChange,
          dataSource: categoryData,
          searchPlaceholder: "Search By Category Name",
          btnTitle:
            (myPermissions?.["D-017"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Category",
          handleClickAddNewFunctionality: handleOpenCategoryModal,
          loading: isCategoryLoading,
          handlePageChange,
          total,
          limit,
          currentPage,
          isTableSearch: true,
          name: "brandName",
          options: brandFilterList || [],
          searchValueJson: { brandName: brandNameValue },
          handleFilterSelectChange,
          placeholder: "Select Brand",
          // setShowSuggestionList: () => {},
        }}
        classNames="category-table"
      />
      {isModalOpen && (
        <ModalComponent
          modalOpen={isModalOpen}
          modalTitle={isEdit ? "Edit Category" : "Create Category"}
          handleModalCancel={handleModalCancel}
          modalClass={"category-modal-main"}
          modalWidth={870}
          footer={
            dataLoading && isEdit ? (
              <></>
            ) : (
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
            )
          }
        >
          {isEdit && dataLoading ? (
            <LottieImage
              lottieImage={loader}
              lottieText=""
              imageClassName="loader-icon"
            />
          ) : (
            <Row gutter={[16, 0]} className="category-modal-input-main">
              {Object.keys(formFieldData)?.map((fieldName) => {
                const {
                  label,
                  name,
                  placeholder,
                  validation,
                  type,
                  defaultValue,
                  options,
                  maxLength,
                } = formFieldData[fieldName];
                return (
                  <Col
                    key={name}
                    span={24}
                    xxl={type === "textarea" ? 24 : 12}
                    xl={type === "textarea" ? 24 : 12}
                    lg={type === "textarea" ? 24 : 12}
                    md={type === "textarea" ? 24 : 12}
                    sm={type === "textarea" ? 24 : 12}
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
                        defaultValue,
                        disabled: name === "brandId" && brandDisabled,
                        maxLength,
                        options:
                          name === "brandId"
                            ? brandDataList || []
                            : name === "categoryName"
                              ? categoryDataList
                              : name === "departmentType"
                                ? departmentDataList
                                : options,
                        error: categoryErrors[name],
                        value:
                          name === "brandId"
                            ? allCategoryData?.brandId
                            : allCategoryData[name],
                        ...(validation?.maxLength && {
                          maxLength: validation?.maxLength,
                        }),
                      }}
                      inputClass={"category-input"}
                      SelectClassNames={"category-dropdown"}
                      TextareaClassNames={"category-text-area"}
                      inputMain={"category-input-wrap"}
                      autoCompleteClassNames="category-dropdown"
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </ModalComponent>
      )}

      {isDeleteModal?.isOpen && (
        <DeleteModalComponent
          {...{
            isModalOpen: isDeleteModal?.isOpen,
            handleCancelDeleteRecord,
            isDeleteModalLoading: isDeleteModal?.isLoading,
            handleSaveDeleteRecord,
            name: `Category`,
          }}
        />
      )}
    </div>
  );
};

export default CategoryView;
