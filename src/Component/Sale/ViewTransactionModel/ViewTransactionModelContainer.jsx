import React, { useEffect, useState } from "react";
import ViewTransactionModelView from "./ViewTransactionModelView";
import { useDispatch, useSelector } from "react-redux";
import { settingSelector } from "../../../Redux/Reducers/Slices";
import { imageValidation, isEmpty } from "../../../Utils";
import { updateWholeSaleDeliveryNote } from "../../../Redux/Actions/SaleAction/SaleAction";

const ViewTransactionModelContainer = (props) => {
  const {
    viewTransactionData,
    searchValueJson,
    isTransactionModel,
    handleTransactionModel,
    productsTaxTotal,
    subTotal,
  } = props;

  const dispatch = useDispatch();
  const { systemSettingDetails } = useSelector(settingSelector);
  const [productError, setProductError] = useState("");
  const [image, setImage] = useState({});
  const [deliveryNoteModel, setDeliveryNoteModel] = useState(false);
  const [imgBtnLoading, setImgBtnLoading] = useState(false);
  useEffect(() => {
    if (!isEmpty(viewTransactionData?.deliveryImg)) {
      setImage({ deliveryNoteImg: viewTransactionData?.deliveryImg });
    }
  }, [viewTransactionData]);

  const handleImageChange = (e) => {
    if (e?.fileList?.length === 0) return;
    const error = imageValidation(e);
    setProductError(error);
    if (error) return;
    const userImage = e.file.originFileObj;
    const productObj = {
      deliveryNoteImg: userImage,
    };
    setImage(productObj);
  };

  const handleDeleteSelectImage = () => {
    setProductError("");
    setImage({});
  };

  const handleSubmitDeliveryNote = async () => {
    setImgBtnLoading(true)
    const referenceId = viewTransactionData?.referenceId;
    const formData = new FormData();
    // Append the image to the FormData object
    if (image?.deliveryNoteImg) {
      formData.append("deliveryImg", image.deliveryNoteImg);
    }
    await dispatch(updateWholeSaleDeliveryNote(formData, referenceId));
    setImgBtnLoading(false);
  };

  const handleDeliveryNoteModel = () => {
    setDeliveryNoteModel(false);
  };
  const handleOpenDeliveryNoteModel = () => {
    setDeliveryNoteModel(true);
  };

  return (
    <ViewTransactionModelView
      {...{
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
        handleSubmit: handleSubmitDeliveryNote,
        deliveryNoteModel,
        handleDeliveryNoteModel,
        handleOpenDeliveryNoteModel,
        imgBtnLoading
      }}
    />
  );
};

export default ViewTransactionModelContainer;
