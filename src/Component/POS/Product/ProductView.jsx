import React from "react";
import {
  FormFieldsComponent,
  ImageComponent,
  LottieImage,
  ProductCardComponent,
} from "../../../CommonComponent";
import { loader, noDataFound, searchIcon } from "../../../assest";
import { Col, Pagination, Row } from "antd";
import "../Product/product.scss";
import { ProductPackedSelectModalContainer } from "../../Model";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";
import Keyboard from "react-simple-keyboard";
import Draggable from "react-draggable";

const ProductView = ({
  currentPage,
  total,
  limit,
  productData,
  productValueObj,
  handleProductClick,
  handleSearchChange,
  handleKeyDown,
  searchValue,
  filterDropDownValue,
  handleSelectChange,
  systemSettingDetails,
  handlePageChange,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  suggestionList,
  listRef,
  departments,
  handleKeyboardInput,
  onKeyPress,
  layoutName,
  keyboardToggle,
  isKeyboard,
  isOnScreenLeftKeyboard,
  setIsKeyboard,
  handleOnFocusChange,
  setIsDropKeyboard,
  isDropKeyboard,
  isOnScreenDropKeyboard,
}) => {
  return (
    <React.Fragment>
      <div className="category-main">
        <div ref={listRef} className="category-input-main">
          <FormFieldsComponent
            name={"type"}
            type={"select"}
            placeholder={"Search product by code"}
            value={filterDropDownValue}
            options={departments}
            handleSelectChange={handleSelectChange}
            handleBlur={() => {}}
            handleOnFocusChange={handleOnFocusChange}
            handleSearchChange={handleSearchChange}
            keyboardToggle={keyboardToggle}
            setIsDropKeyboard={setIsDropKeyboard}
            isDropKeyboard={isDropKeyboard}
            isOnScreenDropKeyboard={isOnScreenDropKeyboard}
          />
          <div className="pos-search-product">
            <FormFieldsComponent
              name={"Product"}
              type={"text"}
              placeholder={"Search product by code"}
              inputClass={"choose-product-search"}
              inputMain={"input-main"}
              prefix={
                <ImageComponent
                  imageSrc={searchIcon}
                  imageAlt={"search-icon"}
                  imageClassName={"search-icon"}
                />
              }
              value={searchValue}
              handleBlur={() => {}}
              handleOnFocus={handleFocusSearchInput}
              handleChange={handleSearchChange}
              handleKeyDown={handleKeyDown}
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
            {keyboardToggle && isKeyboard && isOnScreenLeftKeyboard && (
              <Draggable>
                <div style={{ position: "absolute", zIndex: 1000 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      backgroundColor: "#f1f1f1",
                      height: "30px",
                      width: "100%",
                      borderRadius: "0.5rem 0.5rem 0 0",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      padding: "0 0.625rem",
                      position: "relative",
                    }}
                  >
                    <div
                      onClick={() => setIsKeyboard(false)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "1.25rem",
                        color: "#888",
                        cursor: "pointer",
                        padding: "0",
                        position: "absolute",
                        top: "50%",
                        right: "0.625rem",
                        transform: "translateY(-50%)",
                      }}
                    >
                      x
                    </div>
                  </div>
                  <div style={{ marginTop: "0" }}>
                    <Keyboard
                      onChange={(newInput) => handleKeyboardInput(newInput)}
                      onKeyPress={onKeyPress}
                      layoutName={layoutName}
                      display={{
                        "{bksp}": "⌫",
                        "{tab}": "Tab",
                        "{shift}": "Shift",
                        "{lock}": "CapsLock",
                        "{enter}": "Enter",
                        "{space}": "  ",
                      }}
                    />
                  </div>
                </div>
              </Draggable>
            )}
          </div>
        </div>
        {!productValueObj?.isLoading && productData?.length > 0 ? (
          <div className="pos-product-cards-main">
            <Row gutter={[10, 10]} className="products-main">
              {productData?.map((productObj) => (
                <Col
                  span={6}
                  xxl={4}
                  xl={4}
                  lg={6}
                  md={6}
                  sm={8}
                  xs={24}
                  key={productObj?.productId}
                >
                  <ProductCardComponent
                    {...{
                      handleProductClick,
                      productObj,
                      systemSettingDetails,
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ) : productValueObj?.isLoading ? (
          <div className="loader-animation-wrap">
            <LottieImage
              lottieImage={loader}
              lottieText={""}
              divClassName={"loader-animation-main"}
              imageClassName={"loader-animation"}
            />
          </div>
        ) : (
          <div className="no-data-main">
            <LottieImage
              lottieImage={noDataFound}
              lottieText={"No Product found"}
              divClassName={"page-not-found-main"}
              textClassName={"not-found-text"}
              imageClassName={"page-not-found-icon"}
            />
          </div>
        )}
      </div>
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={total}
        showSizeChanger={true}
        onChange={handlePageChange}
        className="pagination"
      />
      <ProductPackedSelectModalContainer />
    </React.Fragment>
  );
};

export default ProductView;
