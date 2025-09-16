import React from "react";
import {
  PRODUCTS_FOR_QUOTATION_ALERT,
  PRODUCTS_FOR_QUOTATION_ALERT_MODEL,
} from "../../../Constant/TableConst";
import "../NewQuotation/NewQuotation.scss";
import { Col, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import CreateCustomerModal from "../../../Component/Model/CreateCustomerModal/CreateCustomerModal";
import { customerAdd } from "../../../assest";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";

const NewQuotationView = ({
  discountTotal,
  isModelOpen,
  productsTaxTotal,
  formFields,
  isMailSendQuotationLoading,
  grandTotal,
  subTotal,
  newQuotationJson,
  customerList,
  isSearchLoading,
  isQuotationLoading,
  newQuotationCartData,
  systemSettingDetails,
  handleSelectChange,
  handleSearchChange,
  handleKeyDown,
  handleAddItem,
  handleRemoveItem,
  handleDeleteItem,
  isBtnDisable,
  handleSaveOpenModel,
  handleSubmit,
  handleSendMail,
  handleChangeDiscount,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  suggestionList,
  listRef,
  isCustomerModel,
  customerDetails,
  customerError,
  tableData,
  countryList,
  phoneMaxLength,
  isCustomerAddLoading,
  handleOpenCreateCustomerModel,
  handleModalCancel,
  handleSearchCountry,
  handleSelectCustomerChange,
  handleInputChange,
  handleBlur,
  handleSubmitCustomerInfo,
  disabledPreviousDate,
}) => {
  const getSpan = (label) => {
    if (label === "Choose Product") return 24;
    if (label === "Reference Number") return 5;
    if (label === "Wholesale Customer Name") return 8;
    return 4;
  };
  const getMdSpan = (label) => {
    if (label === "Wholesale Customer Name" || label === "Expiry Date")
      return 10;
    if (label === "Choose Product") return 24;
    return 12;
  };
  const getXsSpan = (label) => {
    if (label === "Wholesale Customer Name") return 18;
    return 24;
  };

  return (
    <div className="new-quotation-wrap">
      <div className="quotation-new-main">
        <Row gutter={[20, 0]} className="new-quotation-form">
          {Object.keys(formFields)?.map((field) => {
            const {
              label,
              name,
              placeholder,
              type,
              disabled,
              prefix,
              showSearch,
              format,
            } = formFields[field];
            const options =
              name === "customerName"
                ? customerList
                : formFields[field]?.options;
            return (
              <>
                <Col
                  span={24}
                  xxl={getSpan(label)}
                  xl={getSpan(label)}
                  lg={getSpan(label)}
                  md={getMdSpan(label)}
                  sm={getMdSpan(label)}
                  xs={getXsSpan(label)}
                  key={name}
                >
                  <div className="quotation-search-product" ref={listRef}>
                    <FormFieldsComponent
                      {...{
                        type,
                        name,
                        label,
                        placeholder,
                        options,
                        disabled,
                        disabledDate: disabledPreviousDate,
                        prefix,
                        showSearch,
                        format,
                        value: newQuotationJson[name],
                        handleSelectChange,
                        handleChange: handleSearchChange,
                        handleKeyDown,
                        handleOnFocus:
                          name === "searchedKeyWord"
                            ? handleFocusSearchInput
                            : () => {},
                        handleBlur: () => {},
                      }}
                    />
                    {name === "searchedKeyWord" && (
                      <SuggestionListContainer
                        {...{
                          listRef,
                          showSuggestionList,
                          suggestionList,
                          suggestionListLoading,
                          setShowSuggestionList,
                          getSearchedProduct,
                        }}
                      />
                    )}
                  </div>
                </Col>
                {name === "customerName" && (
                  <Col
                    span={24}
                    xxl={3}
                    xl={3}
                    lg={3}
                    md={4}
                    sm={4}
                    xs={6}
                    className="add-customer"
                  >
                    <ButtonComponent
                      btnName={""}
                      btnIcon={
                        <ImageComponent
                          imageSrc={customerAdd}
                          imageAlt={"add-customer"}
                          imageClassName={"add-customer"}
                          imageHeight={19}
                          imageWidth={19}
                        />
                      }
                      isFrontIcon={true}
                      btnClass={"add-customer-btn"}
                      handleClick={handleOpenCreateCustomerModel}
                    />
                  </Col>
                )}
              </>
            );
          })}
        </Row>
        <div className="quotation-table-main">
          <TableContainer
            {...{
              tableTitle: "Selected Products For Quotation",
              column: PRODUCTS_FOR_QUOTATION_ALERT(
                systemSettingDetails,
                handleAddItem,
                handleRemoveItem,
                handleDeleteItem,
                handleChangeDiscount
              ),
              isSuggestionListVisible: true,
              showSuggestionList,
              setShowSuggestionList,
              suggestionListLoading,
              handleFocusSearchInput,
              getSearchedProduct,
              suggestionList,
              listRef,
              dataSource: newQuotationCartData,
              loading: isSearchLoading,
            }}
            classNames="quotation-table"
          />
        </div>
        <Row gutter={[30, 0]} className="quotation-order-table-main">
          {/* <Col span={24} xxl={18} xl={16} lg={16} md={24} sm={24}>
            <Row gutter={[30, 0]}>
              {NEW_QUOTATION_SECOND_INPUT_FIELDS?.map((field) => (
                <Col
                  span={24}
                  xxl={field?.type === "textarea" ? 24 : 12}
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
          <Col
            span={24}
            xxl={8}
            xl={9}
            lg={9}
            md={12}
            sm={18}
            className="quotation-bill-wrap"
          >
            <div className="quotation-bill-main">
              {/* <div className="order-tax-main">
                <h1 className="order-tax-title">ORDER TAX :</h1>
                <p className="order-tax-title">{EURO_SYMBOL}00.00</p>
              </div>
              <div className="order-tax-main">
                <h1 className="order-tax-title">DISCOUNT :</h1>
                <p className="order-tax-title">{EURO_SYMBOL}150.00</p>
              </div>
              <div className="order-tax-main">
                <h1 className="order-tax-title">SHIPPING :</h1>
                <p className="order-tax-title">{EURO_SYMBOL}50.00</p>
              </div> */}
              <div className="grand-total-main">
                <h1 className="order-tax-title">SUB TOTAL :</h1>
                <p className="order-tax-title">
                  {systemSettingDetails?.currency}
                  {parseFloat(subTotal).toFixed(2)}
                </p>
              </div>
              <div className="grand-total-main">
                <h1 className="order-tax-title">TOTAL TAX :</h1>
                <p className="order-tax-title">
                  {systemSettingDetails?.currency}
                  {parseFloat(productsTaxTotal).toFixed(2)}
                </p>
              </div>
              <div className="grand-total-main">
                <h1 className="order-tax-title">DISCOUNT :</h1>
                <p className="order-tax-title">
                  {systemSettingDetails?.currency}
                  {parseFloat(discountTotal).toFixed(2)}
                </p>
              </div>
              <div className="grand-total-main">
                <h1 className="order-tax-title">GRAND TOTAL :</h1>
                <p className="order-tax-title">
                  {systemSettingDetails?.currency}
                  {parseFloat(grandTotal).toFixed(2)}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        {/* <FormFieldsComponent
          type={"textarea"}
          placeholder={"Add a note"}
          name={"notes"}
          label={"Notes"}
          rows={5}
          TextareaClassNames={"quotation-notes-textarea"}
        /> */}
      </div>
      <div className="btn-fixed">
        <ButtonComponent
          btnName={"Save"}
          btnClass={"save-btn"}
          btnDisabled={isBtnDisable()}
          handleClick={handleSaveOpenModel}
        />
      </div>

      {isModelOpen && (
        <ModalComponent
          modalOpen={isModelOpen}
          modalTitle={"Quotation Product List"}
          modalClass={"product-view-list"}
          handleModalCancel={handleSaveOpenModel}
          modalWidth={870}
          footer={
            <div className="btn-main">
              <ButtonComponent
                btnName={"Cancel"}
                btnClass={"cancel-btn"}
                btnDisabled={
                  (isQuotationLoading || isMailSendQuotationLoading) && true
                }
                handleClick={handleSaveOpenModel}
              />
              <ButtonComponent
                btnName={"Save"}
                isStatus={isQuotationLoading}
                btnClass={"save-btn"}
                btnDisabled={
                  (isQuotationLoading || isMailSendQuotationLoading) && true
                }
                handleClick={handleSubmit}
              />
              <ButtonComponent
                btnName={"Mail"}
                isStatus={isMailSendQuotationLoading}
                btnClass={"mail-btn"}
                btnDisabled={
                  (isMailSendQuotationLoading || isQuotationLoading) && true
                }
                handleClick={handleSendMail}
              />
            </div>
          }
        >
          <TableContainer
            {...{
              column: PRODUCTS_FOR_QUOTATION_ALERT_MODEL(systemSettingDetails),
              dataSource: newQuotationCartData,
              isSuggestionListVisible: true,
              showSuggestionList,
              setShowSuggestionList,
              suggestionListLoading,
              handleFocusSearchInput,
              getSearchedProduct,
              suggestionList,
              listRef,
            }}
            classNames={"product-list-table"}
          />
        </ModalComponent>
      )}

      {isCustomerModel && (
        <CreateCustomerModal
          {...{
            countryList,
            phoneMaxLength,
            tableData,
            customerData: customerDetails,
            isCustomerAdd: isCustomerAddLoading,
            isModalOpen: isCustomerModel,
            customerError,
            handleModalCancel,
            handleSearchCountry,
            handleSelectChange: handleSelectCustomerChange,
            handleInputChange,
            handleBlur,
            handleSubmitCustomerInfo,
          }}
        />
      )}
    </div>
  );
};

export default NewQuotationView;
