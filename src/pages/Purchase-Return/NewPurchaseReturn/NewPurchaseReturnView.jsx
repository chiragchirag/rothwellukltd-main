import React from "react";
import {
  // OTHER_DETAILS_FOR_PURCHASE_RETURN,
  PRODUCT_FOR_PURCHASE_RETURN,
} from "../../../Constant/TableConst";
import "../NewPurchaseReturn/NewPurchaseReturn.scss";
import { Col, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import {
  PURCHASE_RETURN_FORM_SCHEMA,
  purchaseReturnInitialState,
} from "../../../FormSchema/PurchaseSchema";
import { searchIcon } from "../../../assest";
import { PurchaseReturnModelContainer } from "../../../Component";
import {
  capitalizeFirstLetter,
  convertDateToDDMMYYYY,
  isEmpty,
} from "../../../Utils";

const NewPurchaseReturnView = (props) => {
  const {
    isLoading,
    isModelOpen,
    searchValue,
    systemSettingDetails,
    listOfPurchaseReturnProduct,
    purchaseReturnData,
    setSearchValue,
    isBtnDisabled,
    handleSearchChange,
    handleCheckBoxChange,
    handleKeyDown,
    handleClickOpenModel,
    handleClickCloseModel,
  } = props;
  return (
    <div className="new-purchase-return-wrap">
      <div className="purchase-return-new-main">
        <Row gutter={[20, 0]} className="new-purchase-return-form">
          <Col span={24} xxl={14} xl={14} lg={14} md={12} sm={24} xs={24}>
            <Row gutter={[20, 0]}>
              {Object.keys(PURCHASE_RETURN_FORM_SCHEMA)?.map((field) => {
                const { label, name, placeholder, type, disabled } =
                  PURCHASE_RETURN_FORM_SCHEMA[field];
                return (
                  <Col
                    key={name}
                    span={24}
                    // xxl={field?.label === "Choose Product" ? 24 : 8}
                    // xl={field?.label === "Choose Product" ? 24 : 8}
                    // lg={field?.label === "Choose Product" ? 24 : 8}
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={24}
                    xs={24}
                  >
                    <FormFieldsComponent
                      {...{
                        label,
                        name,
                        placeholder,
                        type,
                        disabled,
                        value: purchaseReturnInitialState?.[name],
                      }}
                    />
                  </Col>
                );
              })}
              <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <FormFieldsComponent
                  {...{
                    type: "text",
                    label: "Invoice Number",
                    placeholder: "Search by Invoice Number",
                    handleChange: handleSearchChange,
                    handleKeyDown,
                    handleBlur: () => {},
                    prefix: (
                      <ImageComponent
                        imageSrc={searchIcon}
                        imageAlt={"search-icon"}
                        imageClassName={"search-icon"}
                      />
                    ),
                    value: searchValue,
                  }}
                />
              </Col>
            </Row>
          </Col>
          {!isEmpty(purchaseReturnData) && (
            <Col
              span={24}
              xxl={10}
              xl={10}
              lg={10}
              md={12}
              sm={18}
              xs={24}
              className="other-details-wrap"
            >
              <div className="other-details-main">
                <div className="other-details">
                  <div className="other-details-title">Supplier Name :</div>
                  <div className="other-details-name">
                    {capitalizeFirstLetter(
                      purchaseReturnData?.SupplierModel?.supplierName
                    )}
                  </div>
                </div>
                <div className="other-details">
                  <div className="other-details-title">Date of Purchase :</div>
                  <div className="other-details-name">
                    {convertDateToDDMMYYYY(purchaseReturnData?.purchaseDate)}
                  </div>
                </div>
                <div className="other-details">
                  <div className="other-details-title">Grand total :</div>
                  <div className="other-details-name">
                    {systemSettingDetails?.currency}
                    {
                      purchaseReturnData?.purchaseTransactionTables?.[0]
                        ?.grandTotal
                    }
                  </div>
                </div>
                {/* <TableContainer
                {...{
                  loading: isLoading,
                  tableTitle: "Details",
                  column: OTHER_DETAILS_FOR_PURCHASE_RETURN(),
                  dataSource: isEmpty(purchaseReturnData)
                    ? []
                    : [purchaseReturnData],
                  // setShowSuggestionList: () => {},
                  bordered: true,
                }}
                classNames="details-table"
              /> */}
              </div>
            </Col>
          )}
        </Row>
        <div className="purchase-return-table-main">
          <TableContainer
            {...{
              loading: isLoading,
              tableTitle: "Selected Products For Purchase Return",
              column: PRODUCT_FOR_PURCHASE_RETURN(
                systemSettingDetails,
                listOfPurchaseReturnProduct,
                handleCheckBoxChange
              ),
              // setShowSuggestionList: () => {},
              dataSource: purchaseReturnData?.purchaseProducts || [],
            }}
            classNames="purchase-return-table"
          />
        </div>
        <Row gutter={[30, 0]} className="purchase-return-order-table-main">
          {/* <Col span={24} xxl={18} xl={16} lg={16} md={24} sm={24}>
            <Row gutter={[30, 0]}>
              {NEW_QUOTATION_SECOND_INPUT_FIELDS?.map((field) => (
                <Col
                  span={24}
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={24}
                  key={field?.name}
                >
                  <FormFieldsComponent
                    type={field?.type}
                    placeholder={field?.placeHolder}
                    name={field?.name}
                    label={field?.label}
                    options={field?.options}
                    defaultValue={field?.defaultValue}
                    suffix={field?.suffix}
                  />
                </Col>
              ))}
            </Row>
          </Col> */}
          {/* <Col
            span={20}
            xxl={6}
            xl={8}
            lg={8}
            md={16}
            sm={20}
            className="purchase-return-bill-wrap"
          >
            <div className="purchase-return-bill-main">
              <div className="grand-total-main">
                <h1 className="order-tax-title">GRAND TOTAL :</h1>
                <p className="order-tax-title">{grandTotal}</p>
              </div>
            </div>
          </Col> */}
        </Row>
      </div>
      <div className="btn-fixed">
        <ButtonComponent
          btnName={"Save"}
          btnClass={"save-btn"}
          btnDisabled={isBtnDisabled()}
          handleClick={handleClickOpenModel}
        />
      </div>
      {isModelOpen && (
        <ModalComponent
          modalOpen={isModelOpen}
          handleModalCancel={handleClickCloseModel}
          // modalWidth={1000}
          modalClass={"purchase-return-product"}
          modalTitle={"Purchase Return"}
          modalWidth={870}
        >
          <PurchaseReturnModelContainer
            {...{ setSearchValue, handleClickCloseModel }}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default NewPurchaseReturnView;
