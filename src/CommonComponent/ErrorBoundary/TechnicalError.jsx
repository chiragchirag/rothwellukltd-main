import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { DASHBOARD, LOG_IN, TILLS } from "../../Constant/routeConstant";
import "../../CommonComponent/ErrorBoundary/technicalError.scss";
import ButtonComponent from "../Button/ButtonComponent";
import Lottie from "react-lottie-player";
import { oops } from "../../assest";
import { isEmpty } from "../../Utils";

const errorCodeList = ["ReferenceError", "TypeError", "Error"];

const TechnicalError = (props) => {
  const location = useLocation();
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorFromDashboard, setIsErrorFromDashboard] = useState(false);
  const tillData = JSON.parse(localStorage.getItem("tillData"));
  const roleName = localStorage.getItem("roleName");

  useEffect(() => {
    if (location?.pathname.includes("dashboard")) {
      setIsErrorFromDashboard(true);
    }
    const getCode = (error) => {
      const index = errorCodeList.findIndex(
        (x) => x.toLowerCase() === error.toLowerCase()
      );
      if (index !== -1) {
        return `0${index + 1}`;
      }
      return 100;
    };
    setErrorCode(getCode(props?.error?.name));
    setErrorMessage(props?.error?.message);
  }, []);

  const handleLogOut = () => {
    window.location.href = isEmpty(tillData)
      ? roleName === "admin"
        ? LOG_IN
        : TILLS
      : LOG_IN;
    sessionStorage.removeItem("sidebarTitle");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("sidebarHeaderTitle");
    sessionStorage.removeItem("authToken");
  };

  return (
    <div className="technical-error-page-main">
      <div className="technical-details-wrap">
        <div className="technical-main">
          <div>
            <Lottie animationData={oops} className={"oops-image-main"} play />
          </div>
          <div>
            <p className="experiencing-text">
              Sorry, We're experiencing technical difficulties.{" "}
            </p>
            <h6 className="experiencing-detail">
              (as in you are experiencing them, we are working hard to fix them)
            </h6>
            <hr />
            <p className="technical-code">
              Tech Code: {errorCode}, {errorMessage}
            </p>
            <p className="error-links">{props?.errorInfo?.componentStack}</p>
            <div className="link-text">
              <ButtonComponent
                btnClass={"click-here"}
                btnName={`Click here
            ${isErrorFromDashboard ? " to logout" : " to go back"}`}
                handleClick={() => {
                  // if error in dasbhard that it redirect to signOut page
                  if (isErrorFromDashboard) {
                    handleLogOut();
                  } else {
                    window.location.pathname = DASHBOARD;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TechnicalError;
