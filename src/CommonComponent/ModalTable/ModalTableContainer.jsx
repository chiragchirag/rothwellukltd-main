import React from "react";
import ModalTableView from "./ModalTableView";

const ModalTableContainer = ({ column, dataSource, classNames }) => {
  return <ModalTableView {...{ column, dataSource, classNames }} />;
};

export default ModalTableContainer;
