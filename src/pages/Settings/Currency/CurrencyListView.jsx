import React from "react";
import { CURRENCY_PERMISSION_COLUMN } from "../../../Constant/TableConst";
import "../Currency/currencylist.scss";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { DeleteModalComponent } from "../../../Component/Model";

const CurrencyListView = ({
  handleOpenCurrencyModal,
  handleModalCancel,
  isModalOpen,
  handleDeleteModal,
  isCurrencyLoading,
  allCurrencyData,
  formFieldData,
  currencyErrors,
  handleBlur,
  handleChange,
  currencyData,
  handleSubmit,
  isBrandPending,
  isDeleteModal,
  handleCancelDeleteRecord,
  handleSaveDeleteRecord,
  handleSelectChange,
  handlePageChange,
  total,
  limit,
  handleSearchChange,
  currentPage,
  myPermissions,
}) => {
  return (
    <div className="currency-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          loading: isCurrencyLoading,
          column: CURRENCY_PERMISSION_COLUMN(handleDeleteModal, myPermissions),
          handleClickAddNewFunctionality: handleOpenCurrencyModal,
          searchPlaceholder: "Search By Country Name",
          dataSource: currencyData,
          btnTitle:
            (myPermissions?.["D-018"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Currency",
          isTableSearch: true,
          handlePageChange,
          total,
          limit,
          handleSearchChange,
          currentPage,
        }}
        classNames="currency-list-table"
      />
      {isModalOpen && (
        <ModalComponent
          modalOpen={isModalOpen}
          modalTitle={"Create Currency"}
          handleModalCancel={handleModalCancel}
          modalClass={"create-currency-modal"}
          modalWidth={870}
          footer={
            <ButtonComponent
              btnName={isBrandPending ? <LoadingOutlined /> : "Save"}
              btnClass={"save-button"}
              btnType={"submit"}
              btnDisabled={isBrandPending && true}
              handleClick={handleSubmit}
            />
          }
        >
          <Row gutter={[16, 0]}>
            {Object.keys(formFieldData)?.map((fieldName) => {
              const { label, name, placeholder, validation, type, disabled } =
                formFieldData[fieldName];
              return (
                <Col
                  span={24}
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={24}
                  key={name}
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
                      error: currencyErrors[name],
                      value: isEmpty(allCurrencyData[name])
                        ? ""
                        : allCurrencyData[name],
                      ...(validation?.maxLength && {
                        maxLength: validation?.maxLength,
                      }),
                    }}
                    inputClass={"customer-input-main"}
                    SelectClassNames={"customer-select-main"}
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
            name: `Currency`,
          }}
        />
      )}
    </div>
  );
};

export default CurrencyListView;
