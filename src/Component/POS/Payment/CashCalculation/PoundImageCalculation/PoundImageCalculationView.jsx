import React from "react";
import { CASH_NOTES_IMAGES } from "../../../../../Constant/non-primitive";
import { ImageComponent } from "../../../../../CommonComponent";

const PoundImageCalculationView = ({ handleSelectPound }) => {
  return (
    <div className="cash-notes-main">
      <div className="cash-notes">
        {CASH_NOTES_IMAGES?.map((ele) => (
          <ImageComponent
            imageSrc={ele?.image}
            key={ele?.alt}
            alt={ele?.alt}
            handleClick={() => handleSelectPound(ele?.value, ele?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PoundImageCalculationView;
