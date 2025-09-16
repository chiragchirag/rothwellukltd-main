import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { DEPARTMENT_LIST_COLUMN } from "../../../Constant/TableConst";
import "./Department.scss";
import { Col, Row } from "antd";

const DepartmentView = (props) => {
  const {
    isEdit,
    isModelOpen,
    isDepartmentLoading,
    isDepartmentPending,
    formFieldData,
    departmentValues,
    departmentError,
    departmentInfo,
    myPermissions,
    total,
    currentPage,
    limit,
    handleOpenDepartmentModel,
    handleCloseDepartmentModel,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handlePageChange,
    handleOpenEditDepartmentModel,
  } = props;
  return (
    <div className="department-list-main">
      <TableContainer
        {...{
          loading: isDepartmentLoading,
          isPagination: true,
          isTableHeader: true,
          btnTitle:
            (myPermissions?.["D-021"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Department",
          column: DEPARTMENT_LIST_COLUMN(
            handleOpenEditDepartmentModel,
            myPermissions
          ),
          dataSource: departmentInfo || [],
          total,
          currentPage,
          limit,
          handlePageChange,
          handleClickAddNewFunctionality: handleOpenDepartmentModel,
        }}
        classNames="department-list-table"
      />
      {isModelOpen && (
        <ModalComponent
          modalOpen={isModelOpen}
          modalTitle={`${isEdit ? "Update" : "Create"} Department`}
          footer={
            <div className="btn-main">
              <ButtonComponent
                btnName={"Cancel"}
                handleClick={handleCloseDepartmentModel}
                btnDisabled={isDepartmentPending && true}
                btnClass={"cancel-btn"}
              />
              <ButtonComponent
                btnName={isEdit ? "Update" : "Save"}
                handleClick={handleSubmit}
                isStatus={isDepartmentPending}
                btnClass={"save-btn"}
              />
            </div>
          }
          modalClass={"department-list-modal"}
          modalWidth={870}
          handleModalCancel={handleCloseDepartmentModel}
        >
          <Row className="department-list-input" gutter={[20]}>
            {Object.keys(formFieldData).map((ele) => {
              const { name, type, options, label, placeholder } =
                formFieldData[ele];
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
                      name,
                      type,
                      options,
                      label,
                      disabled: name === "type" && isEdit ? true : false,
                      placeholder,
                      value: departmentValues?.[name],
                      error: departmentError?.[name],
                      handleChange,
                      handleSelectChange,
                      handleBlur: () => {},
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </ModalComponent>
      )}
    </div>
  );
};

export default DepartmentView;
