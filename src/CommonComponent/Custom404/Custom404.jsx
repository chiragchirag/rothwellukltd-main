import React, { useEffect } from "react";
import "./custom404.scss";
import { pageNoFound } from "../../assest";
import LottieImage from "../LottieImage/LottieImage";

const Custom404 = () => {
  useEffect(() => {
    sessionStorage.setItem("sidebarHeaderTitle", "");
  }, []);
  return (
    <div className="page-not-found">
      <LottieImage
        lottieImage={pageNoFound}
        lottieText={"Page not Found"}
        divClassName={"page-not-found-img"}
        textClassName={"page-not-found-text"}
      />
    </div>
  );
};

export default Custom404;
