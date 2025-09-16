import React from "react";
import WholeSalePaymentModelView from "./WholeSalePaymentModelView";
import { WHOLE_SALE_PAYMENT_SCHEMA } from "../../../FormSchema/wholeSaleSchema";

const WholeSalePaymentModelContainer = (props) => {
  const {
    isWholesale,
    isViewPayment,
    isMultiPayment,
    isViewWholeSalePayment,
    wholeSaleValues,
    customerList,
    paymentMode,
    productToCart,
    systemSettingDetails,
    isStatus,
    handleSelectChange,
    handlePayment,
    handleCancelPaymentModal,
    handleDuePaymentModelOpen,
    showTotalError,
    setShowTotalError,
    mainError,
    setMainError,
  } = props;
  const formFelids = WHOLE_SALE_PAYMENT_SCHEMA;
  return (
    <React.Fragment>
      <WholeSalePaymentModelView
        {...{
          isWholesale,
          isMultiPayment,
          isViewPayment,
          isViewWholeSalePayment,
          formFelids,
          wholeSaleValues,
          customerList,
          paymentMode,
          productToCart,
          systemSettingDetails,
          isStatus,
          handleSelectChange,
          handlePayment,
          handleCancelPaymentModal,
          handleDuePaymentModelOpen,
          showTotalError,
          setShowTotalError,
          mainError,
          setMainError,
        }}
      />
    </React.Fragment>
  );
};

export default WholeSalePaymentModelContainer;
