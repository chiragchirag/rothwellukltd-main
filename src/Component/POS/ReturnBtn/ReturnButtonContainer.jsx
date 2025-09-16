import React, { useState } from "react";
import ReturnButtonView from "./ReturnButtonView";

const ReturnButtonContainer = () => {
  const [isReturnModel, setIsReturnModel] = useState(false);

  const handleOpenReturnModel = () => {
    setIsReturnModel(!isReturnModel);
  };

  return (
    <React.Fragment>
      <ReturnButtonView
        {...{ isReturnModel, setIsReturnModel, handleOpenReturnModel }}
      />
    </React.Fragment>
  );
};

export default ReturnButtonContainer;
