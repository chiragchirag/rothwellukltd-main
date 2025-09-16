import React, { useEffect } from "react";
import MixMatchDetailView from "./MixMatchDetailView";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMixMatchById } from "../../../Redux/Actions/MixMatchAction/MixMatchAction";

const MixMatchDetailContainer = () => {
  const dispatch = useDispatch();
  let { mixMatchById } = useSelector((state) => state?.mixMatch);

  const { id } = useParams();

  mixMatchById = mixMatchById?.mixMatchProducts?.map((product)=> {
    return product?.ProductModel
  })

  useEffect(() => {
    dispatch(getMixMatchById(id))
  },[]);

  return <MixMatchDetailView mixMatchById={mixMatchById} />;
};

export default MixMatchDetailContainer;
