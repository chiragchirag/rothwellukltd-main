import React from "react";
import {
  // OTHER_DETAILS_FOR_SALE_RETURN,
  PRODUCT_FOR_SALE_RETURN,
} from "../../../Constant/TableConst";
import "../NewSalesReturn/NewSalesReturn.scss";
import { Col, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
// import { isEmpty } from "../../../Utils";
import { SaleReturnProductListContainer } from "../../../Component";
import { searchIcon } from "../../../assest";
import { saleReturnFormInitialValues } from "../../../FormSchema/newSaleReturnSchema";
import { SEARCH_OPTIONS_SALE_RETURN } from "../../../Constant/non-primitive";
import {
  capitalizeFirstLetter,
  convertDateToDDMMYYYY,
  isEmpty,
} from "../../../Utils";
const NewSalesReturnView = ({
  loading,
  saleReturnProductOfList,
  setSearchValue,
  searchValue,
  formFelids,
  saleReturnProductData,
  systemSettingDetails,
  isBtnDisabled,
  isSaleReturnModel,
  setIsSaleReturnModel,
  handleSearchChange,
  handleKeyDown,
  handleCheckBoxChange,
  handleSaleReturnModel,
  handleSaleReturnCancelModel,
  searchBy,
  handleSearchByChange,
  setIsReturnModel,
  isPosReturn,
}) => {
  const isRetailSale =
    saleReturnProductData?.productSolds?.length > 0 ? true : false;
  return (
    <div className="new-sales-return-wrap">
      <div className="sales-return-new-main">
        <Row gutter={[20, 20]} className="sales-details-main">
          <Col
            span={24}
            xxl={isPosReturn ? 13 : 14}
            xl={isPosReturn ? 13 : 14}
            lg={isPosReturn ? 13 : 14}
            md={12}
            sm={24}
            xs={24}
          >
            <div className="new-sales-return-form">
              <Row gutter={[20, 16]}>
                {Object?.keys(formFelids)?.map((field) => {
                  const { label, name, placeholder, type, disabled } =
                    formFelids[field];
                  return (
                    <Col
                      span={24}
                      xxl={24}
                      xl={24}
                      lg={24}
                      md={24}
                      sm={24}
                      xs={24}
                      key={name}
                      className="return-date"
                    >
                      <FormFieldsComponent
                        {...{
                          type,
                          name,
                          placeholder,
                          disabled,
                          label,
                          handleKeyDown,
                          handleBlur: () => {},
                          value: saleReturnFormInitialValues[name],
                        }}
                      />
                    </Col>
                  );
                })}

                <Col
                  span={24}
                  xxl={isPosReturn ? 10 : 8}
                  xl={isPosReturn ? 10 : 8}
                  lg={isPosReturn ? 10 : 8}
                  md={12}
                  sm={12}
                  xs={24}
                >
                  <FormFieldsComponent
                    {...{
                      type: "select",
                      label: "Search By",
                      placeholder: `Search by ${searchBy === "referenceNumber" ? "Reference Number" : "Bill Number"}`,
                      handleSelectChange: handleSearchByChange,
                      handleKeyDown,
                      handleBlur: () => {},
                      value: searchBy,
                      options: SEARCH_OPTIONS_SALE_RETURN,
                    }}
                  />
                </Col>
                <Col
                  span={24}
                  xxl={isPosReturn ? 14 : 16}
                  xl={isPosReturn ? 14 : 16}
                  lg={isPosReturn ? 14 : 16}
                  md={12}
                  sm={12}
                  xs={24}
                >
                  <FormFieldsComponent
                    {...{
                      type: "text",
                      label: " Ref No / Bill No",
                      placeholder: "Search by Reference Number/Bill Number",
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
            </div>
          </Col>
          {!isEmpty(saleReturnProductData) && (
            <Col
              span={24}
              xxl={isPosReturn ? 11 : 10}
              xl={isPosReturn ? 11 : 10}
              lg={isPosReturn ? 11 : 10}
              md={12}
              sm={24}
              xs={24}
            >
              <div className="other-details-main">
                <div className="other-details">
                  <div className="other-details-title">Customer name :</div>
                  <div className="other-details-name">
                    {capitalizeFirstLetter(
                      saleReturnProductData?.CustomerModel?.customerName
                    )}
                  </div>
                </div>
                <div className="other-details">
                  <div className="other-details-title">Date of order :</div>
                  <div className="other-details-name">
                    {convertDateToDDMMYYYY(saleReturnProductData?.createdAt)}
                  </div>
                </div>
                <div className="other-details">
                  <div className="other-details-title">Grand total :</div>
                  <div className="other-details-name">
                    {systemSettingDetails?.currency}
                    {parseFloat(
                      saleReturnProductData?.transactionTables?.[0]
                        ?.grandTotal || 0
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="other-details">
                  <div className="other-details-title">Transaction type :</div>
                  <div className="other-details-name">
                    {saleReturnProductData?.transactionTables?.[0]
                      ?.transactionType === "0"
                      ? "Retail"
                      : "Wholesale"}
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
        <div className="new-sales-return-table-main">
          <TableContainer
            {...{
              tableTitle: "Products For Sales Return",
              // setShowSuggestionList: () => {},
              column: PRODUCT_FOR_SALE_RETURN(
                isRetailSale,
                systemSettingDetails,
                handleCheckBoxChange,
                saleReturnProductData?.transactionTables?.[0]?.transactionType,
                saleReturnProductOfList
              ),
              dataSource:
                saleReturnProductData?.productSolds?.length > 0
                  ? saleReturnProductData?.productSolds
                  : saleReturnProductData?.wholeSaleSolds?.length > 0
                    ? saleReturnProductData?.wholeSaleSolds
                    : [],
              loading: loading,
            }}
            classNames="sales-return-table"
          />
        </div>
        {/* <Row gutter={[20, 0]} className="sales-order-main">
            <Col
              span={20}
              xxl={isPosReturn ? 12 : 6}
              xl={isPosReturn ? 12 : 8}
              lg={isPosReturn ? 12 : 8}
              md={12}
              sm={12}
              className="sales-return-bill-wrap"
            >
              <div className="sales-return-bill-main">
                <div className="grand-total-main">
                  <h1 className="order-tax-title ">GRAND TOTAL :</h1>
                  <p className="order-tax-title ">
                    {parseFloat(
                      saleReturnProductData?.transactionTables?.[0]?.total || 0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </Col>
          </Row> */}
      </div>
      <div className="btn-fixed">
        <ButtonComponent
          btnName={"Save"}
          btnClass={"sales-return-save-btn"}
          btnDisabled={isBtnDisabled()}
          handleClick={handleSaleReturnModel}
        />
      </div>
      {isSaleReturnModel && (
        <ModalComponent
          modalOpen={isSaleReturnModel}
          modalTitle={"Return Product List"}
          modalClass={"return-product-modal"}
          modalWidth={870}
          handleModalCancel={handleSaleReturnCancelModel}
        >
          <SaleReturnProductListContainer
            {...{
              setIsSaleReturnModel,
              setSearchValue,
              setIsReturnModel,
              isPosReturn,
            }}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default NewSalesReturnView;
