import React, { useEffect, useState } from "react";
import ViewOrderModelView from "./ViewOrderModelView";
import { useDispatch, useSelector } from "react-redux";
import {
  getHoldSubTotalPriceDiscount,
  isEmpty,
  priceToPercentageCalculation,
} from "../../../Utils";
import { useDebounce } from "../../../hooks/useDebounce";
import { posAction, posSelector } from "../../../Redux/Reducers/Slices";
import {
  deleteHoldRecord,
  getOrderHistoryProducts,
} from "../../../Redux/Actions";

const ViewOrderModalContainer = ({
  handleCloseModal,
  isAllModalOpen,
  handleClickViewMore,
  setViewOrderModal,
  viewOrderModal,
  handleGetViewOrderInfo,
  setIsAllModalOpen,
}) => {
  const [deleteModal, setIsDeleteModal] = useState({
    isDeleteModal: false,
    record: {},
    recordId: "",
  });
  const [change, setChange] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productReferenceId, setProductReferenceId] = useState("");
  const [activeKey, setActiveKey] = useState([]);
  const dispatch = useDispatch();
  const {
    deleteProductFromOrderHistory,
    addPosReferenceNumber,
    PosCustomerName,
    addProductToPOSCart,
    paymentMethod,
    posOrderHistoryUserProductData,
  } = posAction;
  const {
    posOrderHistoryInfo,
    posUserHoldProductDetails,
    posUserProductDetails,
  } = useSelector(posSelector);
  const { mixMatch } = useSelector((state) => state?.mixMatch);
  const { productToCart } = useSelector(posSelector);
  const handleOpenDeleteModal = (obj, id) => {
    setIsDeleteModal((prev) => ({
      ...prev,
      isDeleteModal: true,
      record: obj,
      recordId: id,
    }));
  };

  useEffect(() => {
    if (change) {
      dispatch(posAction?.mixMatchDiscount({ mixMatch, productToCart }));
      dispatch(posAction?.bulkItemDiscount({ mixMatch, productToCart }));
      setChange(false);
    }
  }, [change]);

  const handleConfirmDeleteHoldRecord = async () => {
    setIsStatus(true);
    const response = await dispatch(deleteHoldRecord(deleteModal?.recordId));
    if (response?.status === 201) {
      dispatch(deleteProductFromOrderHistory(deleteModal?.record));
    }
    setIsDeleteModal((prev) => ({ ...prev, isDeleteModal: false, record: {} }));
    setIsStatus(false);
  };

  const handleCancelDeleteHoldRecord = () => {
    setIsDeleteModal((prev) => ({ ...prev, isDeleteModal: false }));
  };

  const handleOpenHoldData = async (ele) => {
    ele?.transactionTables?.map(async (obj) => {
      await dispatch(paymentMethod(obj?.paymentMode));
    });
    await dispatch(addPosReferenceNumber(ele?.referenceNumber));
    await dispatch(PosCustomerName(ele?.CustomerModel?.customerId || "WIC"));
    const response = await dispatch(
      getOrderHistoryProducts("admin", "hold", ele?.referenceId)
    );
    const productsInPOS =
      response?.status === 200
        ? response?.data?.data
        : posUserHoldProductDetails;
    const products = productsInPOS?.map((product) => {
      const newTax = product?.ProductModel?.newStocks[0]?.tax?.replace("%", "");
      // const taxTotal = parseFloat(
      //   (product?.ProductModel?.newStocks[0]?.purchasePrice * newTax) / 100
      // );
      const productObj = {
        ...product?.ProductModel,
        tax: product?.ProductModel?.newStocks[0]?.tax,
        productName: product?.productName,
        productUnit: product?.unit?.productUnit,
        quantity: product?.quantity,
        price: product?.ProductModel?.newStocks[0]?.price,
        retailPrice: priceToPercentageCalculation(
          product?.ProductModel?.newStocks?.[0],
          "retailPricePercentage"
        ),
        imageUploads: product?.productImage,
        productNumber: product?.ProductModel?.productNumber,
        productSubTotal:
          product?.ProductModel?.productType === 1
            ? parseFloat(
                product?.quantity * product?.ProductModel?.newStocks[0]?.price
              )
            : getHoldSubTotalPriceDiscount(
                product?.ProductModel,
                product?.discount
              ),
        taxTotal: newTax,
        discount: product?.discount,
      };
      return productObj;
    });
    await dispatch(addProductToPOSCart(products));
    setIsAllModalOpen((prev) => ({ ...prev, isViewOrder: false }));
    setChange(true);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setViewOrderModal((prev) => ({ ...prev, searchKeyword: value }));
    if (isEmpty(value)) {
      handleGetViewOrderInfo(1, "");
    }
  };

  const handleSearchData = () => {
    !isEmpty(viewOrderModal?.searchKeyword) &&
      handleGetViewOrderInfo(1, viewOrderModal?.searchKeyword);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchData();
    }
  };

  useDebounce(viewOrderModal?.searchKeyword, handleSearchData);

  const handleOpenViewOrderCollapse = async (e, referenceId) => {
    if (e?.length !== 0) {
      setLoading(true);
      dispatch(posOrderHistoryUserProductData([]));
      setActiveKey({ [referenceId]: e });
      setProductReferenceId(referenceId);
      await dispatch(getOrderHistoryProducts("admin", "hold", referenceId));
      setLoading(false);
    } else {
      setActiveKey({ [referenceId]: "" });
    }
  };

  return (
    <ViewOrderModelView
      {...{
        handleCloseModal,
        isAllModalOpen,
        handleOpenDeleteModal,
        deleteModal,
        handleConfirmDeleteHoldRecord,
        handleCancelDeleteHoldRecord,
        isStatus,
        handleOpenHoldData,
        handleClickViewMore,
        handleSearchChange,
        viewOrderModal,
        handleSearchKeyDown,
        posOrderHistoryInfo: posOrderHistoryInfo?.data,
        handleOpenViewOrderCollapse,
        posUserHoldProductDetails,
        posUserProductDetails,
        isEndPage: posOrderHistoryInfo?.isNext,
        productReferenceId,
        activeKey,
        loading,
      }}
    />
  );
};

export default ViewOrderModalContainer;
