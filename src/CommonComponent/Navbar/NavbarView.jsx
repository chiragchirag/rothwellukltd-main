import React from "react";
import ImageComponent from "../Image/ImageComponent";
import { Link } from "react-router-dom";
import { Popover, Switch } from "antd";
import "../Navbar/navbar.scss";
import { menuIcon, zoomScreenIcon } from "../../assest";
import {
  DASHBOARD,
  LOG_IN,
  MY_PROFILE,
  POS,
  SYSTEM_SETTINGS,
} from "../../Constant/routeConstant";
import { UserProfileImage } from "../../Utils";
import { posAction } from "../../Redux/Reducers/Slices";
import { useDispatch } from "react-redux";

const NavbarView = ({
  openFullscreen,
  isFullScreenState,
  closeFullscreen,
  handleCloseSidebar,
  handleSetHeaderTitle,
  handleLogOut,
  handleClickPos,
  handleCloseTab,
  myPermissions,
  profileData,
  systemSettingData,
  isPopoverOpen,
  setIsPopoverOpen,
}) => {
  const dispatch = useDispatch();
  const { keyboardToggle } = posAction;
  const isPosRoute = window.location.pathname === POS;
  const onChange = (checked) => {
    dispatch(keyboardToggle(checked));
  };
  return (
    <div className="navbar-wrap">
      <div className="nav-main">
        <div className="logo-img-wrap">
          {systemSettingData?.websiteLogo &&
            (window.location.pathname === POS ? (
              <div className="logo-img-main">
                <ImageComponent
                  imageSrc={systemSettingData?.websiteLogo}
                  imageAlt="company-logo"
                  imageClassName="company-logo"
                />
              </div>
            ) : (
              <Link className="logo-img-main" to={DASHBOARD}>
                <ImageComponent
                  imageSrc={systemSettingData?.websiteLogo}
                  imageAlt="company-logo"
                  imageClassName="company-logo"
                />
              </Link>
            ))}

          {window.location.pathname !== POS && (
            <div className="menu-icon-main">
              <ImageComponent
                imageSrc={menuIcon}
                imageAlt={"menu-icon"}
                imageClassName="menu-icon"
                imageWidth={25}
                imageHeight={25}
                handleClick={handleCloseSidebar}
              />
            </div>
          )}
        </div>
        <div className="navbar-list-wrap">
          {isPosRoute && <Switch onChange={onChange} className="switch-main" />}
          <div className="print-screen-btn-main">
            <Link
              to={"http://watermarkimg.codebraininfotech.com/"}
              className="print-screen-btn logo-btn"
              target="_blank"
            >
              LOGO
            </Link>
          </div>
          {window?.location?.pathname !== POS &&
            (myPermissions?.allAllowed ||
              myPermissions["D-004"]?.hasAllPermission ||
              myPermissions["D-004"]?.["P-005"]) && (
              <React.Fragment>
                <div
                  className="print-screen-btn-main"
                  onClick={() => handleClickPos()}
                >
                  <p className="print-screen-btn">POS</p>
                </div>
                <div className="zoom-screen-icon-main">
                  {isFullScreenState ? (
                    <ImageComponent
                      imageSrc={zoomScreenIcon}
                      imageAlt={"zoomScreenIcon"}
                      imageClassName="zoom-screen-icon"
                      handleClick={closeFullscreen}
                    />
                  ) : (
                    <ImageComponent
                      imageSrc={zoomScreenIcon}
                      imageAlt={"zoomScreenIcon"}
                      imageClassName="zoom-screen-icon"
                      handleClick={openFullscreen}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
          {window?.location?.pathname === POS ? (
            <div className="profile-popover-wrap profile-popover-pos-wrap">
              <UserProfileImage
                profileImage={profileData?.profileImg}
                firstName={profileData?.firstName}
                lastName={profileData?.lastName}
              />
              <div className="profile-details-main">
                <h2 className="profile-name">
                  {profileData?.firstName} {profileData?.lastName}
                </h2>
                <h2 className="profile-data">{profileData?.role?.roleName}</h2>
              </div>
            </div>
          ) : (
            <Popover
              content={
                <div className="profile-menu-main">
                  <Link
                    to={MY_PROFILE}
                    className="menu-list"
                    onClick={() => handleSetHeaderTitle("My Profile")}
                  >
                    My Profile
                  </Link>
                  <Link
                    to={SYSTEM_SETTINGS}
                    className="menu-list"
                    onClick={() => handleSetHeaderTitle("System Settings")}
                  >
                    Settings
                  </Link>
                  <Link
                    to={LOG_IN}
                    className="menu-list log-out-btn"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </Link>
                </div>
              }
              title="Title"
              trigger="click"
              className="profile-popover-wrap"
              overlayClassName="profile-menu-popover"
              open={isPopoverOpen}
              onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <div className="profile-photo-main">
                <UserProfileImage
                  profileImage={profileData?.profileImg}
                  firstName={profileData?.firstName}
                  lastName={profileData?.lastName}
                />
                <div className="profile-details-main">
                  <h2 className="profile-name">
                    {profileData?.firstName} {profileData?.lastName}
                  </h2>
                  <h2 className="profile-data">
                    {profileData?.role?.roleName}
                  </h2>
                </div>
              </div>
            </Popover>
          )}
          {window?.location?.pathname === POS && (
            <div className="print-screen-btn-main" onClick={handleCloseTab}>
              <p className="print-screen-btn">Quit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarView;
