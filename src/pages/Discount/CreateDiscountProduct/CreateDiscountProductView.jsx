import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
  TableContainer,
} from "../../../CommonComponent";
import { DISCOUNT_COLUMN_PRODUCT } from "../../../Constant/TableConst";
import { loader } from "../../../assest";
import "./CreateDiscountProductView.scss";
import { Col, Row } from "antd";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";

const CreateDiscountProductView = (props) => {
  const {
    id,
    loading,
    formFields,
    isSubmitDiscountLoading,
    isLoading,
    searchValueJson,
    discountProductData,
    discountValues,
    isBtnDisable,
    handleChange,
    handleSelectDate,
    handleProductChange,
    handleSubmitDiscount,
    disabledPreviousDate,
    suggestionList,
    showSuggestionList,
    setShowSuggestionList,
    suggestionListLoading,
    handleFocusSearchInput,
    getSearchedProduct,
    listRef,
    handleDeleteItem,
  } = props;
  return (
    <div className="create-disc-product-main">
      {loading ? (
        <LottieImage
          lottieImage={loader}
          lottieText={""}
          divClassName={"loader-animation-main"}
          imageClassName={"loader-animation"}
        />
      ) : (
        <React.Fragment>
          <Row gutter={[20, 0]}>
            {Object.keys(formFields).map((ele) => {
              const { label, name, type, placeholder, disabled, format } =
                formFields[ele];
              return (
                <Col
                  span={24}
                  xxl={6}
                  xl={6}
                  lg={6}
                  md={12}
                  sm={24}
                  key={name}
                  className="discount-product-inputs"
                >
                  <FormFieldsComponent
                    {...{
                      format,
                      type,
                      label,
                      name,
                      placeholder,
                      disabled,
                      value: discountValues[name],
                      handleChange: handleSelectDate,
                      handleBlur: () => {},
                      handleKeyDown: () => {},
                      disabledDate:
                        type === "datepicker"
                          ? name === "endDate"
                            ? (current) =>
                                disabledPreviousDate(
                                  current,
                                  discountValues.startDate
                                )
                            : name === "startDate"
                              ? (current) =>
                                  disabledPreviousDate(
                                    current,
                                    null,
                                    discountValues.endDate
                                  )
                              : undefined
                          : undefined,
                    }}
                  />
                </Col>
              );
            })}
          </Row>
          <div ref={listRef} className="discount-search-input-main">
            <FormFieldsComponent
              {...{
                type: "text",
                name: "searchedKeyWord",
                label: "Search Products",
                placeholder:
                  "Search By Product Number / Barcode / Product Name / Product Code",
                value: searchValueJson?.searchedKeyWord,
                handleChange,
                handleKeyDown: () => {},
                handleOnFocus: () => {
                  handleFocusSearchInput();
                },
                handleBlur: () => {},
              }}
              mainDiv={"discount-search-input"}
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
          <div className="discount-product-list-main">
            <TableContainer
              {...{
                loading: isLoading,
                column: DISCOUNT_COLUMN_PRODUCT(
                  handleProductChange,
                  handleDeleteItem
                ),
                dataSource: discountProductData,
                isSuggestionListVisible: true,
                showSuggestionList,
                setShowSuggestionList,
                suggestionListLoading,
                handleFocusSearchInput,
                getSearchedProduct,
                suggestionList,
                listRef,
              }}
              classNames={"discount-product-list"}
            />
          </div>
          <div className="btn-fixed">
            <ButtonComponent
              type="submit"
              btnName={id ? "Update" : "Save"}
              btnDisabled={isBtnDisable()}
              handleClick={handleSubmitDiscount}
              isStatus={isSubmitDiscountLoading}
              btnClass={"save-btn"}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CreateDiscountProductView;
