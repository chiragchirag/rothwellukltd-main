import React from "react";
import { CASH_CENT_IMAGES } from "../../../../../Constant/non-primitive";
import { ImageComponent } from "../../../../../CommonComponent";

const PennyImageCalculationView = ({ handleSelectPenny }) => {
  return (
    <div className="cash-coin-main">
      <div className="cash-coin">
        {CASH_CENT_IMAGES?.map((ele) => (
          <ImageComponent
            imageSrc={ele?.image}
            key={ele?.alt}
            alt={ele?.alt}
            handleClick={() => handleSelectPenny(ele?.value, ele?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PennyImageCalculationView;
