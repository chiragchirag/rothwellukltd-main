import React, { useEffect, useState } from "react";
import ProductPackedSelectModalView from "./ProductPackedSelectModalView";
import { posAction, posSelector } from "../../../Redux/Reducers/Slices";
import { useDispatch, useSelector } from "react-redux";
import { OpenNotificationComponent } from "../../../CommonComponent";

const ProductPackedSelectModalContainer = () => {
  const [change, setChange] = useState(false);
  const { posUnpackedProduct, posPackedProduct, isPosProductModal } =
    useSelector(posSelector);
  const { mixMatch } = useSelector((state) => state?.mixMatch);
  const { productToCart } = useSelector(posSelector);
  const dispatch = useDispatch();

  const handleModalCancel = () => {
    dispatch(posAction?.isPosProductModal(false));
    dispatch(posAction?.posUnpackedProduct({}));
    dispatch(posAction?.posPackedProduct([]));
  };

  useEffect(() => {
    if (change) {
      dispatch(posAction?.mixMatchDiscount({ mixMatch, productToCart }));
      dispatch(posAction?.bulkItemDiscount({ mixMatch, productToCart }));
      setChange(false);
    }
  }, [change]);

  const handlePOSProductClick = (productObj) => {
    if (
      productObj?.newStocks?.length <= 0 ||
      productObj?.newStocks[0]?.remainingQuantity === 0
    ) {
      OpenNotificationComponent("Stock not available", "warning");
    } else {
      dispatch(
        posAction.addProductToPOSCart({
          ...productObj,
          isPacked: true,
        })
      );
      setChange(true);
      dispatch(posAction?.isPosProductModal(false));
    }
  };

  const handleProductClickUnpacked = (productObj) => {
    if (
      productObj?.newStocks?.length <= 0 ||
      productObj?.newStocks[0]?.remainingQuantity === 0
    ) {
      OpenNotificationComponent("Stock not available", "warning");
    } else {
      dispatch(
        posAction.addProductToPOSCart({
          ...productObj,
        })
      );
      dispatch(posAction?.isPosProductModal(false));
      setChange(true);
    }
  };

  return (
    <ProductPackedSelectModalView
      {...{
        isPosProductModal,
        handleModalCancel,
        handlePOSProductClick,
        posPackedProduct,
        posUnpackedProduct,
        handleProductClickUnpacked,
      }}
    />
  );
};

export default ProductPackedSelectModalContainer;
