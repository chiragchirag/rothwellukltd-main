import React, { useEffect, useState } from "react";
import HeaderView from "./HeaderView";
import { HEADER_ALLOW_LIST } from "../../Constant/non-primitive";

const HeaderContainer = () => {
  const [title, setTitle] = useState({
    mailTitle: "",
    subTitle: "",
    titleLink: "",
  });

  const allowTitle = HEADER_ALLOW_LIST?.find((ele) => {
    const newVal = window.location.href.split("/")?.includes(ele);
    return newVal;
  });

  useEffect(() => {
    const subTitle = sessionStorage.getItem("sidebarHeaderTitle");
    const mainTitle = sessionStorage.getItem("subTitle");
    const titleLink = sessionStorage.getItem("subTitleLink");
    setTitle({
      ...title,
      subTitle: subTitle,
      mailTitle: mainTitle,
      titleLink: titleLink,
    });
  }, [window.location.pathname]);

  const handleClickChangeRoute = (obj) => {
    sessionStorage.setItem("sidebarHeaderTitle", obj);
  };

  return <HeaderView {...{ title, allowTitle, handleClickChangeRoute }} />;
};

export default HeaderContainer;
