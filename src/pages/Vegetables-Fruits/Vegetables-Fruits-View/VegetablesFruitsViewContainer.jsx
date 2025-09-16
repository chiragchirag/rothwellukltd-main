import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByIdVegFruitList } from "../../../Redux/Actions";
import VegetablesFruitsView from "./VegetablesFruitsView";
import { VegetablesFruitsSelector } from "../../../Redux/Reducers/Slices";
import { STALE_TIME } from "../../../Constant/primitive";
import { useQuery } from "@tanstack/react-query";

const VegetablesFruitsViewContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getByIdVegFruitData } = useSelector(VegetablesFruitsSelector);
  const handleSingleData = async () => {
    await dispatch(getByIdVegFruitList(id));
  };
  const { isLoading } = useQuery({
    queryKey: ["FruitVegData"],
    queryFn: handleSingleData,
    staleTime: STALE_TIME,
  });
  // useEffect(() => {
  //   handleSingleData();
  // }, [id]);
  return <VegetablesFruitsView {...{ getByIdVegFruitData, isLoading }} />;
};

export default VegetablesFruitsViewContainer;
