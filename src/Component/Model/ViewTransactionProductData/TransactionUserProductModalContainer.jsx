import React from "react";
import TransactionUserProductModalView from "./TransactionUserProductModalView";
import { useSelector } from "react-redux";
import { posSelector, settingSelector } from "../../../Redux/Reducers/Slices";

const TransactionUserProductModalContainer = (props) => {
  const {
    viewUserProductModal,
    setViewUserProductModal,
    handleCloseUserProductView,
  } = props;
  const { posUserProductDetails, posOrderHistoryInfo } =
    useSelector(posSelector);
  const { systemSettingDetails } = useSelector(settingSelector);

  return (
    <div>
      <TransactionUserProductModalView
        {...{
          viewUserProductModal,
          setViewUserProductModal,
          handleCloseUserProductView,
          posUserProductDetails,
          posOrderHistoryInfo,
          systemSettingDetails,
        }}
      />
    </div>
  );
};

export default TransactionUserProductModalContainer;
