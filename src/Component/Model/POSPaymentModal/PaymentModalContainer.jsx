import React, { useEffect, useState } from "react";
import PaymentModalView from "./PaymentModalView";
import { useDispatch, useSelector } from "react-redux";
import { getProductData, getReferenceId } from "../../../Redux/Actions";
import {
  getProduct,
  peopleSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";

const PaymentModalContainer = ({
  handleCloseModal,
  handlePayment,
  paymentModal,
  handlePrint,
  componentRef,
  isOpenPaymentMethod,
  paymentSuccessDetails,
  setPaymentModal,
  setRedeem,
  setPound,
}) => {
  const dispatch = useDispatch();
  const {
    ReferenceNumber,
    grandTotal,
    customerId,
    paymentMode,
    productToCart,
    paymentCashSubTotal,
    productsTaxTotal,
    paymentBankSubTotal,
    bankDetailsInfo,
    discountTotal,
    mixMatchDiscountTotal,
  } = useSelector(posSelector);

  const { PosCustomerName, addProductToPOSCart, paymentMethod } = posAction;
  const { posReceiptSetting, systemSettingDetails } =
    useSelector(settingSelector);
  const { customerData } = useSelector(peopleSelector);
  const [isStatus, setIsStatus] = useState(false);
  const handleNextOrder = async () => {
    setIsStatus(true);

    await dispatch(getReferenceId());
    const payload = {
      searchedKeyWord: "",
    };
    const response = await dispatch(getProductData(payload, 1, 100, "pos"));
    if (response?.status === 200) {
      dispatch(getProduct(response?.data));
    }
    dispatch(paymentMethod("cash"));
    const findUser = (id) => {
      for (let i = 0; i < customerData?.length; i++) {
        if (customerData[i]?.customerId === id) return customerData[i];
      }
      const customerRecord = customerData?.find(
        (ele) => ele?.customerType === "system"
      );

      return customerRecord;
    };
    const defaultName = findUser(systemSettingDetails?.customer);

    dispatch(PosCustomerName(defaultName?.customerId || ""));
    dispatch(addProductToPOSCart([]));
    setIsStatus(false);
    setRedeem(false);
    setPound(0);
    handleCloseModal();
  };

  // const handleGetPosSetting = async () => {
  //   const response = await dispatch(getPosSetting());
  //   return response;
  // };

  // const { isLoading: isCategoryLoading } = useQuery({
  //   queryKey: ["posSetting"],
  //   queryFn: () => handleGetPosSetting(),
  //   staleTime: STALE_TIME,
  // });

  // const handleGetSettingData = async () => {
  //   await dispatch(getSystemSetting());
  // };

  // const { isLoading: isSystemSettingLoading } = useQuery({
  //   queryKey: ["systemSetting"],
  //   queryFn: () => handleGetSettingData(),
  //   staleTime: STALE_TIME,
  // });

  useEffect(() => {
    let timer;
    if (paymentModal?.isOpen) {
      timer = setTimeout(async () => {
        setPaymentModal({ ...paymentModal, isOpen: false });
        await handleNextOrder();
      }, 5000); // 30 seconds
    }
    return () => clearTimeout(timer);
  }, [paymentModal?.isOpen]);

  return (
    <PaymentModalView
      {...{
        paymentModal,
        bankDetailsInfo,
        handlePayment,
        handleNextOrder,
        isStatus,
        handlePrint,
        ReferenceNumber,
        grandTotal,
        discountTotal,
        mixMatchDiscountTotal,
        customerId,
        paymentMode,
        productToCart,
        componentRef,
        isOpenPaymentMethod,
        paymentSuccessDetails,
        paymentCashSubTotal,
        paymentBankSubTotal,
        productsTaxTotal,
        posReceiptSetting,
        systemSettingDetails,
      }}
    />
  );
};

export default PaymentModalContainer;
