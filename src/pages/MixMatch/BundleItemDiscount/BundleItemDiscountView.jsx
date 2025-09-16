import React from "react";
import { Col, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
  TableContainer,
} from "../../../CommonComponent";
import { PRODUCT_LIST_BUNDLE_DISCOUNT } from "../../../Constant/TableConst";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";
import { MIX_MATCH_CREATE_SCHEMA } from "../../../FormSchema/DiscountSchema";
import { loader } from "../../../assest";
import "./BundleItemDiscount.scss";

const BundleItemDiscountView = ({
  id,
  isDataLoading,
  handleChange,
  handleProductOnBlur,
  mixMatch,
  handleSubmit,
  isStatus,
  handleAddProduct,
  product,
  productData,
  handleRemoved,
  // totalPrice,
  loading,
  suggestionList,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  listRef,
  mixMatchError,
  disabledPreviousDate,
  handleAddItem,
  handleRemoveItem,
  handleProductChange,
}) => {
  return (
    <div className="bundle-item-main">
      {isDataLoading ? (
        <LottieImage lottieImage={loader} imageClassName="loader-icon" />
      ) : (
        <React.Fragment>
          <Row gutter={[20, 0]}>
            {Object.keys(MIX_MATCH_CREATE_SCHEMA)?.map((ele) => {
              const { label, name, type, format, placeholder } =
                MIX_MATCH_CREATE_SCHEMA[ele];
              return (
                <Col
                  key={label}
                  span={24}
                  xxl={name === "product" || name === "offerName" ? 6 : 4}
                  xl={name === "product" || name === "offerName" ? 6 : 4}
                  lg={name === "product" ? 8 : 4}
                  md={name === "product" ? 12 : 8}
                  sm={name === "product" ? 12 : 8}
                  xs={24}
                  className="create-bundle-item-inputs"
                >
                  <div ref={listRef} className="input-main">
                    <FormFieldsComponent
                      name={name}
                      value={name === "product" ? product : mixMatch[name]}
                      type={type}
                      format={format}
                      handleChange={handleChange}
                      placeholder={placeholder}
                      disabled={
                        name === "product" && productData.length > 0
                          ? true
                          : false
                      }
                      label={label}
                      inputClass={
                        name === "productNumber" ? "disable-input" : ""
                      }
                      TextareaClassNames={"product-notes-textarea"}
                      error={mixMatchError?.[name]}
                      handleBlur={handleProductOnBlur}
                      handleKeyDown={handleAddProduct}
                      handleOnFocus={() => {
                        handleFocusSearchInput(name);
                      }}
                      disabledDate={
                        name === "endDate"
                          ? (current) =>
                              disabledPreviousDate(current, mixMatch?.startDate)
                          : name === "startDate"
                            ? (current) =>
                                disabledPreviousDate(
                                  current,
                                  null,
                                  mixMatch?.endDate
                                )
                            : undefined
                      }
                    />
                    {name === "product" && (
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
              );
            })}
          </Row>
          <div className="create-bundle-item-wrap">
            <TableContainer
              {...{
                loading,
                isTableHeader: true,
                column: PRODUCT_LIST_BUNDLE_DISCOUNT(
                  handleRemoved,
                  handleAddItem,
                  handleRemoveItem,
                  handleProductChange
                ),
                dataSource: productData,
                isSuggestionListVisible: true,
                showSuggestionList,
                setShowSuggestionList,
                suggestionListLoading,
                handleFocusSearchInput,
                getSearchedProduct,
                suggestionList,
                listRef,
              }}
              classNames={"create-bundle-item-table"}
            />
          </div>
          <div className="btn-fixed">
            <ButtonComponent
              btnName={id ? "Update" : "Save"}
              btnClass="save-btn"
              btnType={"submit"}
              handleClick={handleSubmit}
              isStatus={isStatus}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default BundleItemDiscountView;
