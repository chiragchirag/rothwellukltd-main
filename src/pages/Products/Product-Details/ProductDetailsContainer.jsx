import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDataById } from "../../../Redux/Actions";
import ProductDetailsView from "./ProductDetailsView";

const ProductDetailsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.Product);

  useEffect(() => {
    const handleSingleData = async () => {
      setIsLoading(true);
      await dispatch(getProductDataById(id));
      setIsLoading(false);
    };
    handleSingleData();
  }, [id]);
  return <ProductDetailsView {...{ isLoading, productDetails }} />;
};

export default ProductDetailsContainer;
