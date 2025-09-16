import React, { useRef, useState } from "react";
import TransactionModalView from "./TransactionModalView";
import { useDebounce } from "../../../hooks/useDebounce";
import isEmpty from "../../../Utils/isEmpty/isEmpty";
import { MAX_50_CHAR } from "../../../Constant/primitive";
// import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { posSelector, settingSelector } from "../../../Redux/Reducers/Slices";

const TransactionModalContainer = ({
  posOrderHistoryInfo,
  transactionModal,
  transactionModalData,
  setTransactionModalData,
  handleOpenModal,
  handleCloseModal,
  handleModalOpenViewUserProduct,
  getTransactionInfo,
  handlePrint,
  handleSendMailReceiptLink,
  handleDateChange,
  selectedDate,
}) => {
  const [error, setError] = useState("");
  const componentRef = useRef(null);
  const {
    ReferenceNumber,
    grandTotal,
    paymentMode,
    productToCart,
    paymentCashSubTotal,
    productsTaxTotal,
  } = useSelector(posSelector);
  const { posReceiptSetting, systemSettingDetails } =
    useSelector(settingSelector);
  const handlePageChange = async (page, pageSize) => {
    setTransactionModalData({
      ...transactionModalData,
      page: page,
      limit: pageSize,
      isLoading: true,
    });
    await getTransactionInfo(
      page,
      pageSize,
      transactionModalData?.searchKeyword
    );
  };

  const handleSearchChange = (e) => {
    const { value, name } = e.target;
    setTransactionModalData({
      ...transactionModalData,
      [name]: value?.slice(0, 50),
      page: 1,
    });
    if (isEmpty(value)) {
      setTransactionModalData({
        ...transactionModalData,
        isLoading: true,
      });
      getTransactionInfo(
        transactionModalData?.page,
        transactionModalData?.limit,
        ""
      );
    } else {
      value.length <= 50 ? setError("") : setError(MAX_50_CHAR);
    }
  };

  const handleSearchData = () => {
    !isEmpty(transactionModalData?.searchKeyword) &&
      setTransactionModalData({
        ...transactionModalData,
        isLoading: true,
        page: 1,
      });
    getTransactionInfo(
      1,
      transactionModalData?.limit,
      transactionModalData?.searchKeyword
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchData();
    }
  };

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  useDebounce(transactionModalData.searchKeyword, handleSearchData);
  const changeSubTotal = parseFloat(paymentCashSubTotal - grandTotal).toFixed(
    2
  );

  return (
    <TransactionModalView
      {...{
        error,
        transactionModalData,
        posOrderHistoryInfo,
        transactionModal,
        handleOpenModal,
        handleCloseModal,
        handlePageChange,
        handleModalOpenViewUserProduct,
        handleSearchChange,
        handleKeyDown,
        handleSearchData,
        handlePrint,
        ReferenceNumber,
        paymentMode,
        productToCart,
        componentRef,
        paymentCashSubTotal,
        productsTaxTotal,
        changeSubTotal,
        posReceiptSetting,
        systemSettingDetails,
        handleSendMailReceiptLink,
        selectedDate,
        handleDateChange,
      }}
    />
  );
};

export default TransactionModalContainer;
