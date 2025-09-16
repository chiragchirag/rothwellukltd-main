import React, { useEffect, useState } from "react";
import "../Footer/footer.scss";
import { settingSelector } from "../../Redux/Reducers/Slices";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CODEBRAIN_WEBSITE_LINK } from "../../Constant/routeConstant";

const Footer = () => {
  const [systemSettingData, setSystemSettingData] = useState({});
  const { systemSettingDetails } = useSelector(settingSelector);
  useEffect(() => {
    setSystemSettingData(systemSettingDetails);
  }, [systemSettingDetails]);
  return (
    <div className="footer-main">
      <p className="copy-right-details">
        {systemSettingData?.footer}
        <span className="hi-bootstrap-text"></span>{" "}
      </p>
      <p className="copy-right-details">
        <span>Developed By&nbsp;</span>
        <span className="copy-right-logo">
          <Link
            className="copy-right-logo"
            target="_blank"
            to={CODEBRAIN_WEBSITE_LINK}
          >
            {systemSettingData?.developedBy}
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Footer;
