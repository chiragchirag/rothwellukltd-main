import React, { useMemo } from "react";
import { TableContainer } from "../../../CommonComponent";
import {
  BUNDLE_ITEM_DISCOUNT_LIST_COLUMN,
  MIX_MATCH_BY_ID,
} from "../../../Constant/TableConst";
import { DeleteModalComponent } from "../../../Component/Model";
import "./BundleItemDiscountList.scss"

const BundleItemDiscountListView = ({
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
        classNames={"bundle-expand-modal-table"}
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
    <div className="bundle-list-main">
      <TableContainer
        {...{
          loading: isLoading,
          limit,
          isPagination: true,
          isTableHeader: true,
          column: BUNDLE_ITEM_DISCOUNT_LIST_COLUMN(
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
        classNames={"bundle-list-table"}
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
};

export default BundleItemDiscountListView;
