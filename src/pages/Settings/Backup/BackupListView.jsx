import React from "react";
import {
  BACKUP_PERMISSION_COLUMN,
  BACKUP_PERMISSION_DATA,
} from "../../../Constant/TableConst";
import "../Backup/backuplist.scss";
import { ButtonComponent, ModalComponent, TableContainer } from "../../../CommonComponent";

const BackupListView = ({
  handleOpenCustomerModal,
  handleModalCancel,
  isModalOpen,
  openNotificationWithIcon,
}) => {
  return (
    <div className="backup-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          column: BACKUP_PERMISSION_COLUMN(
            handleOpenCustomerModal,
            openNotificationWithIcon
          ),
          dataSource: BACKUP_PERMISSION_DATA,
          btnTitle: "Backup",
          handleClickAddNewFunctionality: handleOpenCustomerModal,
        }}
        classNames="backup-list-table"
      />
      {isModalOpen && (
        <ModalComponent
          modalOpen={isModalOpen}
          modalTitle={"Create Unit"}
          handleModalCancel={handleModalCancel}
          modalClass={"backup-modal-main"}
        >
          <p className="backup-modal-details">
            <span className="back-up-text">Your backup is generated.</span> You
            will find your backup on
            <span className="back-up-link">/storage/app/public/backup</span>
            and save it to your pc.
          </p>
          <div>
            <ButtonComponent btnName={"Save"} btnClass={"backup-submit-btn"} />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default BackupListView;
