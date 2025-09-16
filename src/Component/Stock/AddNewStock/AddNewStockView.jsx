import AddNewStockProduct from "./AddNewStockProduct";
import AddNewStockVegFruit from "./AddNewStockVegFruit";

const AddNewStockView = ({
  handleChange,
  newStockErrors,
  newStockValues,
  handleBlur,
  handleStockSubmit,
  isStockPending,
  formFieldData,
  barcodeId,
  disabledPreviousDate,
  isEditPrice,
  setIsEditPrice,
  btnDisabled,
  setBtnDisabled,
  productType,
  newStockInfo,
}) => {
  return (
    <div className="stock-quantity-main">
      {newStockInfo?.type === "0" ? (
        <AddNewStockProduct
          {...{
            handleChange,
            newStockErrors,
            newStockValues,
            handleBlur,
            handleStockSubmit,
            isStockPending,
            formFieldData,
            barcodeId,
            disabledPreviousDate,
            isEditPrice,
            setIsEditPrice,
            btnDisabled,
            setBtnDisabled,
            productType,
            newStockInfo,
          }}
        />
      ) : newStockInfo?.type === "1" ? (
        <AddNewStockVegFruit
          {...{
            handleChange,
            newStockErrors,
            newStockValues,
            handleBlur,
            handleStockSubmit,
            isStockPending,
            formFieldData,
            barcodeId,
            disabledPreviousDate,
            isEditPrice,
            setIsEditPrice,
            btnDisabled,
            setBtnDisabled,
            productType,
            newStockInfo,
          }}
        />
      ) : null}
    </div>
  );
};

export default AddNewStockView;
