import React from "react";
import {
  FormFieldsComponent,
  ImageComponent,
  LottieImage,
  TableContainer,
} from "../../../CommonComponent";
import "../ProductPOSList/productPOSList.scss";
import { isEmpty } from "../../../Utils";
import { noDataFound, searchIcon } from "../../../assest";
import { POS_PRODUCT_LIST_COLUMN } from "../../../Constant/TableConst";
import Keyboard from "react-simple-keyboard";
import Draggable from "react-draggable";
import { LoadingOutlined } from "@ant-design/icons";

const ProductPOSListView = ({
  isLoading,
  productToCart,
  handleRemoveItem,
  handleAddItem,
  handleDeleteItem,
  searchValue,
  handleSearchChange,
  handleKeyDown,
  handleChange,
  systemSettingDetails,
  handleBlur,
  getMixMatchDetails,
  handleFocusSearchInput,
  handleKeyboardInput,
  onKeyPress,
  layoutName,
  keyboardToggle,
  isKeyboard,
  setIsKeyboard,
  isOnScreenRightKeyboard,
}) => {

  return (
    <div className="pos-list-table-main">
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
        handleChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        handleBlur={() => {}}
        handleOnFocus={handleFocusSearchInput}
        inputIcon={
          isLoading && (
            <div className="code-loader">
              <LoadingOutlined />
            </div>
          )
        }
      />
      <div className="pos-list-main">
        {isEmpty(productToCart) ? (
          <div className="no-data-main">
            <LottieImage
              lottieImage={noDataFound}
              lottieText={"No Products In Cart"}
              divClassName={"page-not-found-main"}
              textClassName={"not-found-text"}
              imageClassName={"page-not-found-icon"}
            />
          </div>
        ) : (
          <TableContainer
            {...{
              column: POS_PRODUCT_LIST_COLUMN(
                false,
                systemSettingDetails,
                handleRemoveItem,
                handleAddItem,
                handleDeleteItem,
                handleChange,
                handleBlur,
                getMixMatchDetails
              ),
              dataSource: productToCart?.map((obj, index) => {
                return {
                  ...obj,
                  index,
                };
              }),
              // setShowSuggestionList: () => {},
            }}
            classNames={"Product-added-table-main"}
          />
        )}
      </div>

      {keyboardToggle && isKeyboard && isOnScreenRightKeyboard && (
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
  );
};

export default ProductPOSListView;
