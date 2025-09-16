/* eslint-disable react/no-array-index-key */
import React from "react";
import ButtonComponent from "../Button/ButtonComponent";
import FormFieldsComponent from "../FormFields/FormFieldsComponent";
import { convertDate, getPosHoldTotalPrice, isEmpty } from "../../Utils";
import { Col, Collapse, Row } from "antd";
import { loader, noDataFound, searchIcon } from "../../assest";
import LottieImage from "../LottieImage/LottieImage";
import ImageComponent from "../Image/ImageComponent";

const ViewOrderPosComponent = ({
  handleOpenDeleteModal,
  handleOpenHoldData,
  handleClickViewMore,
  isEndPage,
  handleSearchChange,
  viewOrderModal,
  handleSearchKeyDown,
  posOrderHistoryInfo,
  handleOpenViewOrderCollapse,
  posUserHoldProductDetails,
  posUserProductDetails,
  activeKeys,
  loading,
}) => {
  const VIEW_MODAL_ITEMS = [
    {
      key: "1",
      label: "Click to customer recheck product once.",
      children: (
        <div className="modal-product-list">
          {loading ? (
            <LottieImage
              lottieImage={loader}
              lottieText={""}
              divClassName={"loader-animation-main"}
              imageClassName={"hold-product-loader"}
            />
          ) : posUserProductDetails?.length > 0 ? (
            posUserProductDetails?.map((ele) => {
              return (
                <div key={ele?.image} className="modal-product">
                  <div className="modal-image-main">
                    {ele?.productImage &&
                      ele?.productImage?.map((img) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div
                          className="modal-product-image-main"
                          key={img?.imageUrl}
                        >
                          <ImageComponent
                            imageSrc={img?.imageUrl}
                            imageAlt={ele?.productName}
                          />
                        </div>
                      ))}
                    <div className="modal-product-content">
                      {!isEmpty(ele?.ProductModel?.barCodeId) && (
                        <h3 className="product-id">
                          {ele?.ProductModel?.barCodeId}
                        </h3>
                      )}
                      <span className="product-name">{ele?.productName}</span>
                    </div>
                  </div>
                  {(ele?.ProductModel?.productType === 1 ||
                    ele?.ProductModel?.productType === 0) && (
                    <h3 className="product-price">{ele?.price}</h3>
                  )}
                  {(ele?.ProductModel?.productType === 2 ||
                    ele?.ProductModel?.productType === 0) && (
                    <h3 className="product-price">{ele?.retailPrice}</h3>
                  )}
                  <div className="product-price-main">
                    <h3 className="product-quantity">{ele?.quantity}</h3>
                    <h3 className="product-price">{ele?.subtotal}</h3>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-product-main">
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
      ),
    },
  ];
  return (
    <div className="order-modal-wrap">
      <FormFieldsComponent
        type={"text"}
        handleKeyDown={handleSearchKeyDown}
        handleChange={handleSearchChange}
        placeholder={"Search"}
        suffix={
          <ImageComponent
            imageSrc={searchIcon}
            imageAlt={"search-icon"}
            imageClassName={"search-icon"}
          />
        }
        inputClass={"order-modal-search"}
        inputMain={"order-modal-input-main"}
        handleBlur={() => {}}
        value={viewOrderModal?.searchKeyword}
      />
      <div className="view-order-details-main">
        {viewOrderModal?.isLoading ? (
          <LottieImage
            lottieImage={loader}
            lottieText={""}
            divClassName={"loader-animation-main"}
            imageClassName={"view-order-loader-animation"}
          />
        ) : !isEmpty(posOrderHistoryInfo) ? (
          posOrderHistoryInfo?.map((ele) => {
            return (
              <React.Fragment key={ele?.referenceNumber}>
                <Row gutter={[30, 0]}>
                  <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24}>
                    <p className="order-id-information">
                      Cashier : {ele?.referenceNumber}
                    </p>
                  </Col>
                  <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24}>
                    <p className="order-id-information">
                      Total : {getPosHoldTotalPrice(ele?.productSolds)}
                    </p>
                  </Col>
                  <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24}>
                    <p className="order-id-information">
                      Customer :{" "}
                      {isEmpty(ele?.CustomerModel)
                        ? "Walk In Customer"
                        : ele?.CustomerModel?.customerName}
                    </p>
                  </Col>
                  <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24}>
                    <p className="order-id-information">
                      Date : {convertDate(ele?.updatedAt)}
                    </p>
                  </Col>
                </Row>
                <Collapse
                  onChange={(e) =>
                    handleOpenViewOrderCollapse(e, ele?.referenceId)
                  }
                  activeKey={activeKeys[ele?.referenceId]}
                  items={VIEW_MODAL_ITEMS}
                  className="cresol-main"
                  expandIconPosition={"end"}
                />
                <div className="order-id-button-main">
                  <ButtonComponent
                    btnName={"Open"}
                    btnClass="open-btn"
                    handleClick={() =>
                      handleOpenHoldData(
                        ele,
                        posUserHoldProductDetails[ele?.referenceId]
                      )
                    }
                  />
                  <ButtonComponent
                    btnName={"Delete"}
                    btnClass="delete-btn"
                    handleClick={() =>
                      handleOpenDeleteModal(ele, ele?.referenceId)
                    }
                  />
                </div>
              </React.Fragment>
            );
          })
        ) : (
          isEmpty(posOrderHistoryInfo) &&
          viewOrderModal?.isLoading === false && (
            <LottieImage
              lottieImage={noDataFound}
              lottieText={"No Product found"}
              divClassName={"no-data-found-main"}
              textClassName={"no-data"}
            />
          )
        )}
      </div>
      {!isEmpty(posOrderHistoryInfo) && (
        <div className="view-more-btn-main">
          {!isEndPage ? (
            <p className="view-more-btn">End of Data</p>
          ) : (
            <p className="view-more-btn" onClick={() => handleClickViewMore()}>
              View More
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewOrderPosComponent;
