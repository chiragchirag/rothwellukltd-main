import React from "react";
import {
  POSReceiptSettingContainer,
  SystemSettingsContainer,
} from "../../../Component";
import "../System-Settings/systemSetting.scss";

const SystemSettingsView = () => {
  return (
    <div className="system-setting-main">
      <SystemSettingsContainer />
      <POSReceiptSettingContainer />
    </div>
  );
};

export default SystemSettingsView;
