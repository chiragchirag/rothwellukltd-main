import React from "react";
import { ModalComponent, ImageComponent } from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";

const UserInfoModel = ({ userInfoModel, handleViewModalClose, tableData }) => {
  return (
    <ModalComponent
      modalTitle={"User Details"}
      modalOpen={userInfoModel}
      handleModalCancel={handleViewModalClose}
      modalClass={"user-list-view-modal"}
      modalWidth={750}
    >
      <div className="user-list-table-wrap">
        <ul className="user-list-details-main">
          {Object.keys(tableData)?.map((userField) => {
            let country;
            if (
              userField === "profileImg" &&
              !isEmpty(userInfoModel[userField])
            ) {
              return (
                <ImageComponent
                  key={userInfoModel?.userId}
                  imageAlt="user-image"
                  imageSrc={userInfoModel[userField]}
                  imageClassName={"user-image-main"}
                />
              );
            }
            if (
              userField === "password" ||
              userField === "image" ||
              userField === "profileImg"
            )
              return;
            if (userField === "phoneNumber") {
              country = COUNTRY_LIST_PHONE_CODE?.find(
                (ele) => ele?.isoCode === userInfoModel?.countryCode
              );
            }
            return (
              <li key={userInfoModel?.userId}>
                <p className="user-details-title">
                  {tableData[userField]?.label}
                </p>
                <p className="user-details">
                  {userField === "roleId"
                    ? userInfoModel?.role?.roleName ||
                      userInfoModel?.role ||
                      userInfoModel[userField]
                    : userField === "phoneNumber"
                      ? `${country?.code}-${userInfoModel[userField]}`
                      : userInfoModel[userField]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </ModalComponent>
  );
};

export default UserInfoModel;
