import React, { useMemo } from "react";
import { TableContainer } from "../../../CommonComponent";
import {
  MIX_MATCH_BY_ID,
  MIX_MATCH_LIST_TABLE,
} from "../../../Constant/TableConst";
import "./MixMatchTable.scss";
import { DeleteModalComponent } from "../../../Component/Model";

const MixMatchTableView = ({
  isLoading,
  mixMatchData,
  currentPage,
  limit,
  total,
  handlePageChange,
  handleEditMixMatch,
  handleViewMixMatch,
  myPermissions,
  expandedRowKeys,
  handleExpand,
  deleteModel,
  isDeleteLoading,
  handleDeleteItem,
  handleCancelDeleteModel,
  handleConfirmDelete,
}) => {
  const expandableRow = {
    expandedRowRender: (record) => (
      <TableContainer
        {...{
          column: MIX_MATCH_BY_ID(),
          dataSource: record?.mixMatchProducts,
          // setShowSuggestionList: () => {},
        }}
        classNames={"mix-expand-modal-table"}
      />
    ),
    onExpand: handleExpand,
    expandedRowKeys: expandedRowKeys,
  };

  const mixMatchDiscountList = useMemo(() => {
    return mixMatchData?.map((ele, index) => {
      return {
        ...ele,
        key: index + 1,
      };
    });
  }, [mixMatchData]);

  return (
    <div className="mix-match-list-main">
      <TableContainer
        {...{
          loading: isLoading,
          limit,
          isPagination: true,
          isTableHeader: true,
          column: MIX_MATCH_LIST_TABLE(
            handleEditMixMatch,
            handleViewMixMatch,
            myPermissions,
            handleDeleteItem
          ),
          dataSource: mixMatchDiscountList,
          handlePageChange,
          currentPage,
          total,
          expandableRow,
        }}
        classNames={"mix-match-list-table"}
      />
      {deleteModel?.isDeleteModel && (
        <DeleteModalComponent
          {...{
            isModalOpen: deleteModel?.isDeleteModel,
            isDeleteModalLoading: isDeleteLoading,
            handleCancelDeleteRecord: handleCancelDeleteModel,
            handleSaveDeleteRecord: handleConfirmDelete,
          }}
        />
      )}
    </div>
  );

  // return <>textdfssdf</>
};

export default MixMatchTableView;
