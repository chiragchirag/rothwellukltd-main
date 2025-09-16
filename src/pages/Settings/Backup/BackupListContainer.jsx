import React, { useState } from "react";
import BackupListView from "./BackupListView";
import { OpenNotificationComponent } from "../../../CommonComponent";

const BackupListContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenCustomerModal = () => {
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const openNotificationWithIcon = () => {
    OpenNotificationComponent(
      "Your product is deleted from the list.",
      "error"
    );
  };
  return (
    <BackupListView
      {...{
        handleOpenCustomerModal,
        handleModalCancel,
        isModalOpen,
        openNotificationWithIcon,
      }}
    />
  );
};

export default BackupListContainer;
