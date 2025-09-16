import React, { useMemo } from "react";
import StockDetailsView from "./StockDetailsView";
import { useParams } from "react-router-dom";
import { getProductDataByStockId } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../Utils";
import { StockSelector } from "../../../Redux/Reducers/Slices";
import { DEPARTMENT_TYPE, PRODUCT_TYPE } from "../../../Constant/non-primitive";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../../Constant/primitive";

const StockDetailsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { stockInfo } = useSelector(StockSelector);

  const handleGetProductStockById = async (stockId) => {
    if (!isEmpty(stockId)) {
      await dispatch(getProductDataByStockId(stockId));
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["stockDetails"],
    queryFn: () => handleGetProductStockById(id),
    staleTime: STALE_TIME,
  });

  const typeName = useMemo(() => {
    let typeNameData;
    const type =
      stockInfo?.ProductModel?.type ||
      stockInfo?.VegAndFruitsPackage?.ProductModel?.type;
    if (!isEmpty(stockInfo)) {
      typeNameData = DEPARTMENT_TYPE?.find((ele) => ele?.value === type);
    }
    return typeNameData?.label;
  }, [stockInfo]);

  const productTypeName = useMemo(() => {
    let typeNameData;
    if (!isEmpty(stockInfo)) {
      const type = isEmpty(stockInfo?.VegAndFruitsPackage)
        ? stockInfo?.ProductModel?.productType
        : stockInfo?.VegAndFruitsPackage?.ProductModel?.productType;
      typeNameData = PRODUCT_TYPE?.find((ele) => ele?.value === type);
    }
    return typeNameData?.label;
  }, [stockInfo]);

  return (
    <StockDetailsView
      {...{ stockInfo, typeName, productTypeName, isLoading }}
    />
  );
};

export default StockDetailsContainer;
