import React from "react";
import { ImageComponent } from "../../CommonComponent";
import { profileAvatar } from "../../assest";
import "./userprofileimage.scss"

const UserProfileImage = ({
  profileImage,
  firstName,
  lastName,
  handleProfileOnClick,
  classNames,
  ImageClassName,
  characterClassName,
}) => {
  const getCharacter = () => {
    let nameLetters;
    // eslint-disable-next-line no-unused-expressions
    firstName && lastName
      ? (nameLetters =
          firstName?.charAt(0).toUpperCase() +
          lastName?.charAt(0).toUpperCase())
      : firstName
        ? (nameLetters = firstName?.charAt(0).toUpperCase())
        : lastName
          ? (nameLetters = lastName?.charAt(0).toUpperCase())
          : "";

    return nameLetters;
  };

  return (
    <div className="navbar-profile-main">
      {profileImage ? (
        <div className={`${"user-profile-images"} ${classNames}`}>
          <ImageComponent
            imageSrc={profileImage}
            imageAlt={`${firstName} ${lastName}`}
            imageClassName={`${"dashboard-screenshot-image"} ${ImageClassName}`}
            handleClick={handleProfileOnClick}
          />
        </div>
      ) : firstName || lastName ? (
        <div
          onClick={handleProfileOnClick}
          className={`${!classNames && "profile-name-character"} ${
            characterClassName ? characterClassName : ""
          }`}
        >
          {getCharacter()}
        </div>
      ) : (
        <ImageComponent
          imageSrc={profileAvatar}
          imageAlt="profile"
          imageClassName={`${"dashboard-screenshot-image"} ${ImageClassName}`}
          handleClick={handleProfileOnClick}
        />
      )}
    </div>
  );
};

export default UserProfileImage;
