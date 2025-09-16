import React from "react";
import PackageStockDetailsView from "./PackageStockDetailsView";

const PackageStockDetailsContainer = ({ isStatusInput, barcodeId }) => {
  return <PackageStockDetailsView {...{ isStatusInput, barcodeId }} />;
};

export default PackageStockDetailsContainer;
