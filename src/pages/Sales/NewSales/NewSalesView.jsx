import React, { useMemo } from "react";
import { PRODUCTS_FOR_WHOLE_SALE } from "../../../Constant/TableConst";
import "../NewSales/NewSales.scss";
import { Col, InputNumber, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  // LottieImage,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { customerAdd, searchIcon } from "../../../assest";
import {
  DuePaymentModel,
  WholeSalePaymentModelContainer,
  WholeSalePrintReceipt,
} from "../../../Component";
import { isEmpty } from "../../../Utils";
import CreateCustomerModal from "../../../Component/Model/CreateCustomerModal/CreateCustomerModal";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";

const NewSalesView = (props) => {
  const {
    id,
    discountTotal,
    customerData,
    dueAmount,
    paymentMode,
    subTotal,
    customerAddress,
    productsTaxTotal,
    transactionData,
    quotationError,
    isStatus,
    componentRef,
    searchValue,
    quotationNoValue,
    paymentModel,
    grandTotal,
    systemSettingDetails,
    isSearchLoading,
    productToCart,
    wholeSaleValues,
    customerList,
    formFelids,
    isWholeSaleLoading,
    isUpdateModelLoading,
    handleProductChange,
    handleKeyDown,
    handleRemoveItem,
    handleAddItem,
    handleCloseModel,
    // handlePaymentModelOpen,
    handlePayment,
    handleSelectChange,
    isBtnDisable,
    handlePrint,
    handleNextOrder,
    handleDeleteItem,
    handleChange,
    handleDuePaymentModelOpen,
    handleQuotationChange,
    handleQuotationKeyDown,
    handleChangeDiscount,
    handleCloseDueModel,
    newPurchaseValue,
    handleSelect,
    totalError,
    advanceAmountError,
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
  } = props;
  const customer = useMemo(() => {
    return customerData?.find(
      (ele) => ele?.customerId === transactionData?.customerId
    );
  }, [customerData, transactionData]);
  return (
    <div className="new-sales-wrap">
      <FormFieldsComponent
        {...{
          type: "text",
          placeholder: "Search by Quotation No",
          name: "Product",
          label: "Quotation No",
          value: quotationNoValue,
          error: quotationError,
          prefix: (
            <ImageComponent
              imageSrc={searchIcon}
              imageAlt={"search-icon"}
              imageClassName={"search-icon"}
            />
          ),
          handleChange: handleQuotationChange,
          handleKeyDown: handleQuotationKeyDown,
          handleBlur: () => {},
        }}
        inputClass="wholesale-search-input"
        mainDiv="wholesale-input-main"
      />
      <div className="sales-new-main">
        <Row gutter={[20, 0]} className="new-sales-form">
          {Object.keys(formFelids)?.map((field) => {
            const { label, name, placeholder, type, disabled, showSearch } =
              formFelids[field];
            const options =
              name === "customerName"
                ? customerList
                : formFelids[field]?.options;
            return (
              <React.Fragment key={name}>
                <Col
                  span={24}
                  xxl={
                    name === "referenceNumber" ||
                    name === "customerName" ||
                    name === "wholeSaleDate"
                      ? 7
                      : 8
                  }
                  xl={
                    name === "referenceNumber" ||
                    name === "customerName" ||
                    name === "wholeSaleDate"
                      ? 7
                      : 8
                  }
                  lg={
                    name === "referenceNumber" ||
                    name === "customerName" ||
                    name === "wholeSaleDate"
                      ? 7
                      : 8
                  }
                  md={
                    name === "referenceNumber" ||
                    name === "customerName" ||
                    name === "wholeSaleDate"
                      ? 7
                      : 12
                  }
                  sm={name === "customerName" ? 20 : 12}
                  xs={name === "customerName" ? 18 : 24}
                >
                  {name === "terms" ? (
                    <Row>
                      <Col
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
                            options,
                            type,
                            placeholder,
                            name,
                            label,
                            disabled,
                            value: wholeSaleValues[name],
                            handleSelectChange,
                            handleBlur: () => {},
                          }}
                        />
                      </Col>
                      <Col
                        span={24}
                        xxl={12}
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={24}
                        className="term-number-input-main"
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          onChange={(e) => handleChange(e, "termNumber")}
                          value={wholeSaleValues?.termNumber}
                          min={0}
                          className="term-number-input"
                          decimalSeparator=""
                        />
                      </Col>
                    </Row>
                  ) : (
                    <React.Fragment>
                      <FormFieldsComponent
                        {...{
                          options,
                          type,
                          placeholder,
                          name,
                          label,
                          showSearch,
                          disabled:
                            name === "customerName"
                              ? !isEmpty(quotationNoValue)
                                ? true
                                : false
                              : disabled,
                          value: wholeSaleValues[name],
                          handleSelectChange,
                          handleBlur: () => {},
                        }}
                      />
                    </React.Fragment>
                  )}
                </Col>
                {name === "customerName" && (
                  <Col
                    span={24}
                    xxl={3}
                    xl={3}
                    lg={3}
                    md={3}
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
              </React.Fragment>
            );
          })}
          {!isEmpty(customerAddress) &&
            customerAddress?.customerName !== "Walk In Customer" && (
              <Col span={24} xxl={10} xl={10} lg={10} md={12} sm={12} xs={24}>
                <FormFieldsComponent
                  TextareaClassNames="customer-textarea"
                  {...{
                    disabled: true,
                    type: "textarea",
                    label: "Address",
                    value: `${customerAddress?.houseNo}-${customerAddress?.street}, ${customerAddress?.landMark} ,${customerAddress?.city}-${customerAddress?.postalCode} ${customerAddress?.country}`,
                  }}
                />
              </Col>
            )}
        </Row>
        <div className="sales-search-product" ref={listRef}>
          <FormFieldsComponent
            {...{
              type: "text",
              placeholder:
                "Search by Product Code / Product Number / Product Name / Barcode",
              name: "Product",
              label: "Choose Product",
              value: searchValue,
              prefix: (
                <ImageComponent
                  imageSrc={searchIcon}
                  imageAlt={"search-icon"}
                  imageClassName={"search-icon"}
                />
              ),
              handleOnFocus: handleFocusSearchInput,
              handleChange: handleProductChange,
              handleKeyDown,
              handleBlur: () => {},
            }}
            inputClass="wholesale-search-input"
            mainDiv="wholesale-input-main"
          />
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
        </div>
        <div className="sales-table-main">
          <TableContainer
            {...{
              tableTitle: "Selected Products For Sales",
              column: PRODUCTS_FOR_WHOLE_SALE(
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
              dataSource: productToCart,
              loading: isSearchLoading,
            }}
            classNames="sales-table"
          />
        </div>
        <Row gutter={[30, 0]} className="sales-order-table-main">
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
          <Col
            span={24}
            xxl={6}
            xl={8}
            lg={12}
            md={18}
            sm={24}
            className="sales-bill-wrap"
          >
            <div className="sales-bill-main">
              <div className="order-tax-main">
                <h1 className="order-tax-title">SUB TOTAL :</h1>
                <p className="order-tax-title ">{subTotal}</p>
              </div>
              <div className="order-tax-main">
                <h1 className="order-tax-title">TOTAL TAX :</h1>
                <p className="order-tax-title ">{productsTaxTotal}</p>
              </div>
              <div className="order-tax-main">
                <h1 className="order-tax-title">DISCOUNT :</h1>
                <p className="order-tax-title ">{discountTotal}</p>
              </div>
              {/* <div className="order-tax-main">
                <h1 className="order-tax-title">SHIPPING :</h1>
                <p className="order-tax-title ">$50.00</p>
              </div> */}
              <div className="grand-total-main">
                <h1 className="order-tax-title ">GRAND TOTAL :</h1>
                <p className="order-tax-title ">
                  {systemSettingDetails?.currency}
                  {grandTotal}
                </p>
              </div>
              {id && (
                <div className="grand-total-main">
                  <h1 className="order-tax-title ">DUE AMOUNT :</h1>
                  <p className="order-tax-title ">
                    {systemSettingDetails?.currency}
                    {parseFloat(dueAmount).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
        {/* <FormFieldsComponent
          type={"textarea"}
          placeholder={"Add a note"}
          name={"notes"}
          label={"Notes"}
          rows={5}
          TextareaClassNames={"sales-notes-textarea"}
        /> */}
      </div>
      <div className="new-sales-btn-main btn-fixed">
        {id && (
          <ButtonComponent
            isStatus={isUpdateModelLoading}
            btnName={id ? "Update" : "Advance"}
            btnClass={"save-payment-btn"}
            handleClick={() => handleDuePaymentModelOpen("hold")}
            btnDisabled={isBtnDisable()}
          />
        )}
        {!id && (
          <ButtonComponent
            btnName={"Save"}
            btnClass={"save-payment-btn"}
            handleClick={() => handlePayment("hold")}
            btnDisabled={isBtnDisable()}
            isStatus={isWholeSaleLoading}
          />
        )}
      </div>
      {paymentModel?.isPaymentModel && (
        <ModalComponent
          modalOpen={paymentModel?.isPaymentModel}
          handleModalCancel={handleCloseModel}
          modalTitle={"Payment Method"}
          modalClass={"sales-payment-modal"}
          modalWidth={870}
        >
          <WholeSalePaymentModelContainer
            {...{
              isStatus: isWholeSaleLoading,
              wholeSaleValues,
              customerList,
              paymentMode,
              productToCart,
              systemSettingDetails,
              handlePayment,
              handleCancelPaymentModal: handleCloseModel,
              handleSelectChange,
              isWholeSaleLoading,
              handleDuePaymentModelOpen,
              isWholesale: true,
            }}
          />
        </ModalComponent>
      )}
      {paymentModel?.isDuePaymentModel && (
        <ModalComponent
          modalOpen={paymentModel?.isDuePaymentModel}
          handleModalCancel={handleCloseDueModel}
          modalTitle={"Advance Amount"}
          modalClass={"advance-amount-modal"}
          modalWidth={650}
        >
          <DuePaymentModel
            {...{
              isStatus,
              id,
              isLoading: isWholeSaleLoading,
              status: "hold",
              handleChange,
              handleCloseModel,
              handlePayment,
              handleSelectChange,
              handleCloseDueModel,
              newPurchaseValue,
              handleSelect,
              totalError,
              advanceAmountError,
            }}
          />
        </ModalComponent>
      )}

      {paymentModel?.isPrintReceipt && (
        <ModalComponent
          modalOpen={paymentModel?.isPrintReceipt}
          modalTitle={""}
          closeIcon={false}
          modalWidth={360}
          modalClass={"Payment-completed-receipt"}
          footer={
            <div className="payment-complete-btn">
              <ButtonComponent
                btnName={"Print Receipt"}
                btnClass={"print-receipt"}
                handleClick={handlePrint}
              />
              <ButtonComponent
                handleClick={handleNextOrder}
                btnDisabled={isStatus && true}
                isStatus={isStatus}
                btnName={"Next Order"}
                btnClass={"next-order"}
              />
            </div>
          }
        >
          <div className="payment-complete-modal-main">
            <WholeSalePrintReceipt
              {...{
                name: "Sales",
                componentRef,
                productToCart,
                systemSettingDetails,
                grandTotal,
                customerRecord: customer,
                transactionData,
                wholeSaleValues,
                subTotal,
                productsTaxTotal,
                discountTotal,
              }}
            />
          </div>
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

export default NewSalesView;
