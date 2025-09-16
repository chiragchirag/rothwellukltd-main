import React from "react";
import "./viewTransaction.scss";
import {
  ModalComponent,
  TableContainer,
  ImageComponent,
  ButtonComponent,
  // ButtonComponent,
} from "../../../CommonComponent";
import {
  TRANSACTION_WHOLE_SALE_DETAILS,
  VIEW_WHOLE_SALE_TRANSACTION,
} from "../../../Constant/TableConst";
import { Col, Row, Tag, Upload } from "antd";
import { convertDate } from "../../../Utils";
import { uploadFiles } from "../../../assest";
import { CloseOutlined, EyeOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const ViewTransactionModelView = (props) => {
  const {
    viewTransactionData,
    systemSettingDetails,
    searchValueJson,
    isTransactionModel,
    handleTransactionModel,
    productsTaxTotal,
    subTotal,
    handleImageChange,
    productError,
    image,
    handleDeleteSelectImage,
    handleSubmit,
    deliveryNoteModel,
    handleDeliveryNoteModel,
    handleOpenDeliveryNoteModel,
    imgBtnLoading,
  } = props;
  const draggerProps = {
    name: "file",
    showUploadList: false,
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(e) {
      handleImageChange(e);
    },
  };
  return (
    <div>
      <Row className="purchase-modal-content wholesale_modal_wrap">
        {searchValueJson?.transactionType === 1 ? (
          <React.Fragment>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              className="purchase-modal-body wholesale-view-main"
            >
              <h6 className="header-titles invoice_title">Invoice Details:</h6>
              <p className="purchase-info">
                <span>{convertDate(viewTransactionData?.createdAt)}</span>
              </p>
              <p className="purchase-info">
                <span>
                  {viewTransactionData?.transactionTables?.[0]?.billNumber}
                </span>
              </p>

              <p className="purchase-info">
                <span>
                  {viewTransactionData?.CustomerModel
                    ? viewTransactionData?.CustomerModel?.customerName
                    : "WIC"}
                </span>
              </p>
              {viewTransactionData?.CustomerModel &&
                viewTransactionData?.CustomerModel?.customerName !==
                  "Walk In Customer" && (
                  <React.Fragment>
                    <p className="purchase-info">
                      <span>{viewTransactionData?.CustomerModel?.phoneNo}</span>
                    </p>
                    <p className="purchase-info">
                      <span className="add-tooltip">
                        <div>
                          {viewTransactionData?.CustomerModel?.houseNo}-
                          {viewTransactionData?.CustomerModel?.street},{" "}
                          {viewTransactionData?.CustomerModel?.landMark} ,
                          {viewTransactionData?.CustomerModel?.city}-
                          {viewTransactionData?.CustomerModel?.postalCode}{" "}
                          {viewTransactionData?.CustomerModel?.country}
                        </div>
                        <span className="tooltip-text">
                          {" "}
                          {viewTransactionData?.CustomerModel?.houseNo}-
                          {viewTransactionData?.CustomerModel?.street},{" "}
                          {viewTransactionData?.CustomerModel?.landMark} ,
                          {viewTransactionData?.CustomerModel?.city}-
                          {viewTransactionData?.CustomerModel?.postalCode}{" "}
                          {viewTransactionData?.CustomerModel?.country}
                        </span>
                      </span>
                    </p>
                  </React.Fragment>
                )}
              <p className="purchase-info">
                <Tag color="green">
                  {viewTransactionData?.status === "complete"
                    ? "Paid"
                    : "Non Paid"}
                </Tag>
              </p>
            </Col>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              className="purchase-modal-body wholesale-view-main"
            >
              <h6 className="header-titles company_title">Company info:</h6>
              <p className="company-info purchase-info">
                <span>{systemSettingDetails?.companyName}</span>
              </p>
              <p className="company-info purchase-info">
                <span>{systemSettingDetails?.emailId}</span>
              </p>
              <p className="company-info purchase-info">
                <span>{systemSettingDetails?.companyPhoneNumber}</span>
              </p>
              <p className="company-info purchase-info">
                <span>{systemSettingDetails?.address}</span>
              </p>
            </Col>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              className="purchase-modal-body"
            >
              <h6>Invoice Details:</h6>
              <p className="purchase-info">
                DATE :{" "}
                <span>{convertDate(viewTransactionData?.createdAt)}</span>
              </p>
              <p className="purchase-info">
                BILL NUMBER :{" "}
                <span>
                  {viewTransactionData?.transactionTables?.[0]?.billNumber}
                </span>
              </p>
              <p className="purchase-info">
                REFERENCE : <span>{viewTransactionData?.referenceNumber}</span>
              </p>
              <p className="purchase-info">
                PAYMENT STATUS :{" "}
                <Tag color="green">
                  {viewTransactionData?.status === "complete"
                    ? "Paid"
                    : "Non Paid"}
                </Tag>
              </p>
              <p className="purchase-info">
                CUSTOMER NAME :{" "}
                <span>
                  {viewTransactionData?.CustomerModel
                    ? viewTransactionData?.CustomerModel?.customerName
                    : "WIC"}
                </span>
              </p>
              {viewTransactionData?.CustomerModel &&
                viewTransactionData?.CustomerModel?.customerName !==
                  "Walk In Customer" && (
                  <React.Fragment>
                    <p className="purchase-info">
                      PHONE :{" "}
                      <span>{viewTransactionData?.CustomerModel?.phoneNo}</span>
                    </p>
                    <p className="purchase-info">
                      ADDRESS <span>:</span>
                      <span className="add-tooltip">
                        <div>
                          {viewTransactionData?.CustomerModel?.houseNo}-
                          {viewTransactionData?.CustomerModel?.street},{" "}
                          {viewTransactionData?.CustomerModel?.landMark} ,
                          {viewTransactionData?.CustomerModel?.city}-
                          {viewTransactionData?.CustomerModel?.postalCode}{" "}
                          {viewTransactionData?.CustomerModel?.country}
                        </div>
                        <span className="tooltip-text">
                          {" "}
                          {viewTransactionData?.CustomerModel?.houseNo}-
                          {viewTransactionData?.CustomerModel?.street},{" "}
                          {viewTransactionData?.CustomerModel?.landMark} ,
                          {viewTransactionData?.CustomerModel?.city}-
                          {viewTransactionData?.CustomerModel?.postalCode}{" "}
                          {viewTransactionData?.CustomerModel?.country}
                        </span>
                      </span>
                    </p>
                  </React.Fragment>
                )}
            </Col>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              className="purchase-modal-body"
            >
              <h6>Company info:</h6>
              <p className="company-info ">
                NAME : <span>{systemSettingDetails?.companyName}</span>
              </p>
              <p className="company-info ">
                MAIL : <div>{systemSettingDetails?.emailId}</div>
              </p>
              <p className="company-info ">
                PHONE : <span>{systemSettingDetails?.companyPhoneNumber}</span>
              </p>
              <p className="company-info ">
                ADDRESS : <div>{systemSettingDetails?.address}</div>
              </p>
            </Col>
          </React.Fragment>
        )}
      </Row>

      {isTransactionModel && (
        <ModalComponent
          modalOpen={isTransactionModel}
          handleModalCancel={handleTransactionModel}
          modalClass={"transaction-list-modal"}
          modalTitle={"Transaction List"}
          modalWidth={870}
        >
          <TableContainer
            {...{
              isPagination: false,
              isTableHeader: false,
              column: VIEW_WHOLE_SALE_TRANSACTION(),
              dataSource: viewTransactionData?.transactionTables || [],
              bordered: true,
              // setShowSuggestionList: () => {},
            }}
            classNames={"transaction-table"}
          />
        </ModalComponent>
      )}
      <div className="modal-table-main">
        <TableContainer
          {...{
            isPagination: false,
            isTableHeader: false,
            column: TRANSACTION_WHOLE_SALE_DETAILS,
            dataSource:
              viewTransactionData?.wholeSaleSolds?.length > 0
                ? viewTransactionData?.wholeSaleSolds
                : viewTransactionData?.productSolds?.length > 0
                  ? viewTransactionData?.productSolds
                  : [],
            btnTitle: "Product",
            bordered: true,
            // setShowSuggestionList: () => {},
          }}
          classNames={"table-first"}
        />
        <div className="this">
          <div className="table-sec">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>Sub Total : </div>
            <div>
              {systemSettingDetails?.currency}
              {parseFloat(subTotal).toFixed(2)}
            </div>
          </div>
          <div className="table-sec">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>Tax (%) : </div>
            <div>{productsTaxTotal}</div>
          </div>
          <div className="table-sec">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>Discount : </div>
            <div>
              {systemSettingDetails?.currency}
              {viewTransactionData?.transactionTables[0]?.discountPrice}
            </div>
          </div>
          <div className="table-sec">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>Grand Total : </div>
            <div>
              {systemSettingDetails?.currency}
              {viewTransactionData?.transactionTables[0]?.total}
            </div>
          </div>
          <div className="multiple-images-main">
            <h3 className="multiple-image-title">Upload Delivery Note</h3>
            <div className="upload-images-box-main">
              <Dragger {...draggerProps} accept="image/*">
                <div className="ant-upload-drag-icon">
                  <ImageComponent
                    imageSrc={uploadFiles}
                    imageAlt={"upload-files"}
                    imageClassName=""
                  />
                </div>
                <p className="ant-upload-hint">
                  Drag & Drop Image here or{" "}
                  <span className="select-text">Select</span>
                </p>
                {productError && (
                  <p className="upload-image-error">{productError}</p>
                )}
              </Dragger>

              {image?.deliveryNoteImg && (
                <div
                  className="uploaded-image-wrap"
                  key={image?.deliveryNoteImg?.File?.uid}
                >
                  <ImageComponent
                    imageSrc={
                      typeof image?.deliveryNoteImg === "string"
                        ? image?.deliveryNoteImg
                        : URL.createObjectURL(image?.deliveryNoteImg)
                    }
                    imageAlt={"upload-image"}
                    imageClassName={"upload-image"}
                  />
                  <div className="close-button-main">
                    <CloseOutlined onClick={() => handleDeleteSelectImage()} />
                  </div>
                  <div
                    className="overlay-view"
                    onClick={handleOpenDeliveryNoteModel}
                  >
                    <EyeOutlined />
                  </div>
                </div>
              )}
            </div>
            <ButtonComponent
              btnName={"Submit"}
              isStatus={imgBtnLoading}
              btnClass={"payment-button"}
              btnType={"submit"}
              handleClick={handleSubmit}
            />
          </div>
        </div>
      </div>

      {deliveryNoteModel && (
        <ModalComponent
          modalOpen={deliveryNoteModel}
          handleModalCancel={handleDeliveryNoteModel}
          modalClass={"transaction-image-modal"}
          modalTitle={"Transaction List"}
          modalWidth={707}
        >
          <ImageComponent
            imageSrc={
              image?.deliveryNoteImg &&
              typeof image?.deliveryNoteImg === "object"
                ? URL.createObjectURL(image?.deliveryNoteImg)
                : viewTransactionData?.deliveryImg
            }
            imageAlt={"deliveryNote"}
            imageClassName={"upload-image"}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default ViewTransactionModelView;
