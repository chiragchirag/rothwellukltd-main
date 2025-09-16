import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from "../Image/ImageComponent";
import "../Sidebar/SideNavBar.scss";
import isEmpty from "../../Utils/isEmpty/isEmpty";
import { DASHBOARD } from "../../Constant/routeConstant";
import { SIDEBAR_LIST } from "../../Constant/sidebarConst";
const { Sider } = Layout;
const SideNavBarView = ({
  sideBarName,
  handleOnMouseLeave,
  isActiveLiMenu,
  isSideBarOpen,
  handleSidebarOpen,
  handleClickChangeRoute,
  isSidebar,
  setIsSidebar,
  sidebarMenuOpen,
  sidebarTitle,
  myPermissions,
}) => {
  return (
    <div className="sidebar-menu-main">
      <div onMouseLeave={handleOnMouseLeave}>
        <Sider
          className="sidebar-menu-wrap"
          collapsible
          collapsedWidth={0}
          breakpoint="md"
          width={window.innerWidth < 991 || isSidebar ? "85vw" : "250"}
          collapsed={isSidebar}
          trigger={null}
          onBreakpoint={(broken) => {
            if (broken) {
              setIsSidebar(true);
            }
          }}
        >
          <Menu
            mode="inline"
            className={`sidebar-menu`}
            defaultSelectedKeys={[
              window.location.pathname === DASHBOARD
                ? "Dashboard"
                : sidebarTitle,
            ]}
            items={SIDEBAR_LIST(myPermissions)?.map((ele) => {
              const key = ele?.name;
              if (!key) return;
              return {
                key,
                label:
                  ele?.name === "Dashboard" ? (
                    <Link
                      to={ele?.link}
                      onClick={() => handleSidebarOpen(key)}
                      className={`${isActiveLiMenu && key === sidebarTitle ? "sidebar-active-menu" : !isSideBarOpen[key] ? "sidebar-inactive" : ""} sidebar-link`}
                    >
                      <ImageComponent
                        imageSrc={ele?.icon}
                        imageAlt={key}
                        imageClassName={"sidebar-image"}
                      />
                      <p className="sidebar-title">{key}</p>
                    </Link>
                  ) : (
                    <div
                      onClick={() => handleSidebarOpen(key)}
                      className={`${isActiveLiMenu && key === sidebarTitle ? "sidebar-active-menu" : !isSideBarOpen[key] ? "sidebar-inactive" : ""} sidebar-link`}
                    >
                      <ImageComponent
                        imageSrc={ele?.icon}
                        imageAlt={key}
                        imageClassName={"sidebar-image"}
                      />
                      <p className="sidebar-title">{key}</p>
                    </div>
                  ),
              };
            })}
          />
        </Sider>
        {!isEmpty(sideBarName) && isSideBarOpen && sidebarMenuOpen && (
          <div className="sidebar-menu-hover">
            {sideBarName?.map(
              (ele) =>
                !isEmpty(ele) && (
                  <div
                    key={ele?.name}
                    className="sidebar-menu-hover-main"
                    onClick={() => handleClickChangeRoute(ele)}
                  >
                    {ele?.name === "POS (Retail)" ? (
                      <div className="pages-links">
                        <ImageComponent
                          imageSrc={ele?.icon}
                          imageAlt={ele?.name}
                        />
                        <span className="menu-item">{ele?.name}</span>
                      </div>
                    ) : (
                      <Link to={ele?.link} className="pages-links">
                        <ImageComponent
                          imageSrc={ele?.icon}
                          imageAlt={ele?.name}
                        />
                        <span className="menu-item">{ele?.name}</span>
                      </Link>
                    )}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavBarView;
