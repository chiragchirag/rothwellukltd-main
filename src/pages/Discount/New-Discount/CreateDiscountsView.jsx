import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
} from "../../../CommonComponent";
import DiscountProductDetailContainer from "../../../Component/Discount/Product-Detail/DiscountProductDetailContainer";
import { Col, Row } from "antd";
import { VegetableFruitPacketDetails } from "../../../Component";
import { VEGETABLE_FRUIT_DISCOUNT_TYPE } from "../../../FormSchema/DiscountSchema";
import "./createDiscounts.scss";
import { isEmpty } from "../../../Utils";
import { loader, noDataFound } from "../../../assest";
import { SEARCH_OPTIONS_CREATE_DISCOUNT_FOR_FRUIT_VEG } from "../../../Constant/non-primitive";

const CreateDiscountsView = ({
  loading,
  searchValue,
  formValues,
  formFields,
  productData,
  isStatusInput,
  isEdit,
  isSubmitDiscountLoading,
  handleSearchChange,
  handleKeyDown,
  handleChange,
  handleSubmit,
  checkButtonDisabled,
  handleDiscountTypeChange,
  packetId,
  setPacketId,
  formValuesForPacket,
  discountType,
  disabledPreviousDate,
  handleSearchByChange,
  searchBy,
}) => {
  return (
    <div className="create-discount-main">
      <div className="search-input-main">
        <FormFieldsComponent
          {...{
            type: "select",
            label: `Search by ${searchBy === "packageBarCodeId" ? "Package Bar CodeId" : "all"}`,
            placeholder: "",
            handleSelectChange: handleSearchByChange,
            handleKeyDown,
            handleBlur: () => {},
            value: searchBy,
            options: SEARCH_OPTIONS_CREATE_DISCOUNT_FOR_FRUIT_VEG,
            mainDiv: "search-dropdown",
          }}
        />
        <FormFieldsComponent
          name="Search"
          label="Search"
          type="text"
          value={searchValue}
          placeholder={`Search by ${searchBy === "packageBarCodeId" ? "Package Bar CodeId" : "all"}`}
          handleChange={handleSearchChange}
          handleKeyDown={handleKeyDown}
          handleBlur={() => {}}
          inputClass="table-header-search-bar"
          inputMain="table-header-search-bar-main"
          labelClass="table-header-search-bar-label"
        />
      </div>
      <div className="discount-details-main">
        <h1 className="discount-details-title-first discount-details-title">
          Products Details
        </h1>
        {loading ? (
          <LottieImage
            lottieImage={loader}
            lottieText={""}
            divClassName={"loader-animation-main"}
            imageClassName={"loader-animation"}
          />
        ) : (
          <>
            {isEmpty(productData) ? (
              <div className="no-data-main">
                <LottieImage
                  lottieImage={noDataFound}
                  lottieText={"No Product found"}
                  divClassName={"page-not-found-main"}
                  textClassName={"not-found-text"}
                  imageClassName={"page-not-found-icon"}
                />
              </div>
            ) : (
              <>
                {(productData?.productType === 2 ||
                  productData?.productType === 0) && (
                  <DiscountProductDetailContainer
                    isStatusInput={isStatusInput}
                    productValues={productData}
                  />
                )}
                {productData &&
                  !productData?.VegAndFruitsPackage &&
                  (productData?.productType === 2 ||
                    productData?.productType === 0) && (
                    <>
                      <h4 className="discount-details-title">
                        {isEdit ? "Update" : "Add"} discount for loose items
                      </h4>
                      <Row
                        gutter={[20, 0]}
                        className="disc-details-Products-input"
                      >
                        {Object.keys(formFields).map((key) => {
                          const {
                            name,
                            label,
                            type,
                            placeholder,
                            options,
                            discountType,
                            format,
                          } = formFields[key];
                          
                          const option =
                            productData?.type === "1"
                              ? VEGETABLE_FRUIT_DISCOUNT_TYPE
                              : options;
                          const getDisabledDate = () => {
                            if (name === "startDate") {
                              return (current) =>
                                disabledPreviousDate(
                                  current,
                                  null,
                                  formValues.endDate
                                );
                            }
                            if (name === "endDate") {
                              return (current) =>
                                disabledPreviousDate(
                                  current,
                                  formValues.startDate,
                                  null
                                );
                            }
                            return (current) =>
                              disabledPreviousDate(current, null, null);
                          };

                          const isVisible =
                            (name === "discount" &&
                              discountType === formValues?.discountType) ||
                            ((name === "buy" || name === "offer") &&
                              discountType === formValues?.discountType) ||
                            !(
                              name === "discount" ||
                              name === "buy" ||
                              name === "offer"
                            );
                          return (
                            <Col
                              key={name}
                              span={24}
                              xxl={8}
                              xl={8}
                              lg={8}
                              md={8}
                              sm={12}
                              className="discount-input-wrap"
                              style={{ display: isVisible ? "block" : "none" }}
                            >
                              <FormFieldsComponent
                                name={name}
                                type={type}
                                label={label}
                                placeholder={placeholder}
                                format={format}
                                options={option}
                                value={formValues[name]}
                                handleSelectChange={(value) =>
                                  handleDiscountTypeChange(
                                    value,
                                    name,
                                    "",
                                    "looseItem"
                                  )
                                }
                                handleChange={(e) =>
                                  handleChange(
                                    e,
                                    type,
                                    name,
                                    "",
                                    "looseItem",
                                    formValues.startDate,
                                    formValues.endDate
                                  )
                                }
                                handleKeyDown={handleKeyDown}
                                handleBlur={() => {}}
                                disabledDate={getDisabledDate()}
                                inputClass="table-header-search-bar"
                                inputMain="table-header-search-bar-main"
                                labelClass="table-header-search-bar-label"
                              />
                            </Col>
                          );
                        })}
                      </Row>
                      <ButtonComponent
                        type="submit"
                        btnName={isEdit ? "Update" : "Save"}
                        isStatus={
                          discountType === "loose" && isSubmitDiscountLoading
                        }
                        btnClass="save-button"
                        handleClick={() => handleSubmit("loose")}
                        btnDisabled={checkButtonDisabled("loose")}
                      />
                    </>
                  )}
                {productData &&
                  (productData?.productType === 1 ||
                    productData?.productType === 0) &&
                  productData?.VegAndFruitsPackages?.length > 0 && (
                    <React.Fragment>
                      <VegetableFruitPacketDetails
                        {...{
                          productData,
                          formValuesForPacket,
                          formFields,
                          isEdit,
                          isSubmitDiscountLoading,
                          handleSubmit,
                          checkButtonDisabled,
                          handleDiscountTypeChange,
                          handleChange,
                          handleKeyDown,
                          packetId,
                          setPacketId,
                          discountType,
                          disabledPreviousDate,
                        }}
                      />
                    </React.Fragment>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateDiscountsView;
