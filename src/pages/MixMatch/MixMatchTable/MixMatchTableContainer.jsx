import React, { useEffect, useState } from "react";
import MixMatchTableView from "./MixMatchView";
import { useDispatch, useSelector } from "react-redux";
import { getMixMatch } from "../../../Redux/Actions/MixMatchAction/MixMatchAction";
import { MIX_MATCH_LIST } from "../../../Constant/routeConstant";
import { permissionSelector } from "../../../Redux/Reducers/Slices";
import { deleteInitialValues } from "../../../FormSchema/wholeSaleSchema";
import { useMutation } from "@tanstack/react-query";
import { deleteMixMatchDiscount } from "../../../Redux/Actions";

const MixMatchTableContainer = () => {
  const dispatch = useDispatch();
  const { mixMatch, totalMixMatch } = useSelector((state) => state?.mixMatch);
  const { myPermissions } = useSelector(permissionSelector);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);

  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true);
      await dispatch(getMixMatch(page, limit, "", "typeA"));
      setIsLoading(false);
    };
    handleFetchData();
  }, [page, limit]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  const handleEditMixMatch = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Mix Match");
    sessionStorage.setItem("subTitle", "Mix Match List");
    sessionStorage.setItem("subTitleLink", MIX_MATCH_LIST);
  };

  const handleViewMixMatch = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "View Mix Match Product List");
    sessionStorage.setItem("subTitle", "Mix Match List");
    sessionStorage.setItem("subTitleLink", MIX_MATCH_LIST);
  };

  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const handleDeleteItem = (mixMatchId) => {
    setDeleteModel({
      ...deleteModel,
      id: mixMatchId,
      isDeleteModel: true,
    });
  };

  const handleCancelDeleteModel = () => {
    setDeleteModel(deleteInitialValues);
  };

  const handleSaveDeleteRecord = async ({ mixMatchId }) => {
    const response = await dispatch(deleteMixMatchDiscount(mixMatchId));
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 200) {
      setDeleteModel(deleteInitialValues);
    }
  };

  const { mutate, isPending: isDeleteLoading } = useMutation({
    mutationFn: handleSaveDeleteRecord,
    onSuccess: handleSuccessMutation,
  });

  const handleConfirmDelete = () => {
    mutate({ mixMatchId: deleteModel?.id });
  };

  return (
    <MixMatchTableView
      mixMatchData={mixMatch}
      setLimit={setLimit}
      setPage={setPage}
      currentPage={page}
      total={totalMixMatch}
      limit={limit}
      handlePageChange={handlePageChange}
      handleEditMixMatch={handleEditMixMatch}
      handleViewMixMatch={handleViewMixMatch}
      myPermissions={myPermissions}
      isLoading={isLoading}
      handleExpand={handleExpand}
      expandedRowKeys={expandedRowKeys}
      {...{
        deleteModel,
        isDeleteLoading,
        handleDeleteItem,
        handleCancelDeleteModel,
        handleConfirmDelete,
      }}
    />
  );
};

export default MixMatchTableContainer;
