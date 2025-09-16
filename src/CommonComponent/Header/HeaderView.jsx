import React from "react";
import "../Header/header.scss";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { DASHBOARD } from "../../Constant/routeConstant";

const HeaderView = ({ title, allowTitle, handleClickChangeRoute }) => {
  return (
    <div className="header-main">
      <h1 className="header-title">{title?.subTitle}</h1>
      <div className="dashboard-bread-crumb-main">
        {window.location.href.split("/").includes(allowTitle) ? (
          <Breadcrumb
            items={[
              {
                title: <Link to={DASHBOARD}>Dashboard</Link>,
              },
              {
                title: (
                  <Link
                    to={title?.titleLink}
                    onClick={() => handleClickChangeRoute(title?.mailTitle)}
                  >
                    {title?.mailTitle}
                  </Link>
                ),
              },
              {
                title: title?.subTitle,
              },
            ]}
          />
        ) : (
          <Breadcrumb
            items={[
              {
                title: <Link to={DASHBOARD}>Dashboard</Link>,
              },
              {
                title: title?.subTitle,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderView;
