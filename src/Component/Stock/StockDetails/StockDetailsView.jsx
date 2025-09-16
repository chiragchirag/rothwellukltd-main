import { Col, Row } from "antd";
import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
} from "../../../CommonComponent";
import { loader } from "../../../assest";
import { NEW_STOCK_INPUT_FIELDS } from "../../../Constant/non-primitive";
import { isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";

const StockDetailsView = ({
  isStatusInput,
  isEdit,
  isStockEdit,
  handleUpdateChange,
  handleSubmitEditStock,
  disabledPreviousDate,
  handleEditStock,
  barcodeId,
  isStatus,
  handleStockDetailsOnBlur,
  editStockError,
}) => {
  return (
    <div className="stock-details-main">
      <h1 className="stock-details-title">Stock Details</h1>
      <Row
        gutter={[25, 0]}
        className={`stock-details-form-main ${isStatusInput ? "loader-main" : ""}`}
      >
        {isStatusInput ? (
          <LottieImage
            lottieImage={loader}
            lottieText={""}
            imageClassName={"loader-icon"}
          />
        ) : (
          NEW_STOCK_INPUT_FIELDS?.map((ele) => (
            <Col
              key={ele?.name}
              span={24}
              xxl={6}
              xl={6}
              lg={6}
              md={12}
              sm={24}
              xs={24}
            >
              <FormFieldsComponent
                disabled={isEdit ? ele?.disabled : true}
                name={ele?.name}
                value={isStockEdit && isStockEdit[ele?.name]}
                type={ele?.type}
                format={"DD-MM-YYYY"}
                placeholder={ele?.placeHolder}
                options={ele?.options}
                defaultValue={ele?.defaultValue}
                disabledDate={
                  ele?.name === "expiryDate" ? disabledPreviousDate : ""
                }
                error={editStockError[ele?.name]}
                label={ele?.label}
                suffix={ele?.suffix}
                inputMain={"product-stock-input-main"}
                inputClass={"product-unit-input"}
                dateClassNames={"product-unit-date-picker"}
                handleKeyDown={() => {}}
                handleChange={handleUpdateChange}
                handleBlur={handleStockDetailsOnBlur}
              />
            </Col>
          ))
        )}
      </Row>
      <ButtonComponent
        btnClass={"edit-stock-btn"}
        btnName={isEdit ? isStatus ? <LoadingOutlined /> : "Update" : "Edit"}
        btnType={"button"}
        handleClick={isEdit ? handleSubmitEditStock : handleEditStock}
        btnDisabled={(isEmpty(barcodeId?.barCodeId) || isStatus) && true}
      />
    </div>
  );
};

export default StockDetailsView;
