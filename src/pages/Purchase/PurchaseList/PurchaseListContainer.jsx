import React, { useEffect, useMemo, useState } from "react";
import PurchaseListView from "./PurchaseListView";
import { useNavigate } from "react-router-dom";
import {
  CERATE_PURCHASE,
  PURCHASE_LIST,
} from "../../../Constant/routeConstant";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  purchaseAction,
  purchaseSelector,
} from "../../../Redux/Reducers/PurchaseReducer/PurchaseReducer";
import {
  convertDateIntoYYYYMMDD,
  convertDateYYYYMMDD,
  debounce,
  isEmpty,
} from "../../../Utils";
import {
  deleteTransactionRecord,
  getPurchaseListData,
  getSupplier,
  paymentViewPayment,
} from "../../../Redux/Actions";
import {
  peopleSelector,
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";

const PurchaseListContainer = () => {
  const deleteInitialValues = {
    id: "",
    isDeleteModel: false,
  };
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isPaymentModel, setIsPaymentModel] = useState(false);
  const [newPurchaseValue, setNewPurchaseValue] = useState();
  const [error, setError] = useState();
  const [totalError, setTotalError] = useState("");
  const [isTransactionModel, setIsTransactionModel] = useState(false);
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);
  const [purchaseId, setPurchaseId] = useState("");

  const navigation = useNavigate();

  const dispatch = useDispatch();
  const { systemSettingDetails } = useSelector(settingSelector);
  const {
    currentPage,
    limit,
    total,
    purchaseListData,
    viewPurchaseHistory,
    purchaseProductCartData,
  } = useSelector(purchaseSelector);
  const { supplierData } = useSelector(peopleSelector);
  const { myPermissions } = useSelector(permissionSelector);
  const { editProductCartData, updatePurchaseListData, testing } =
    purchaseAction;

  useEffect(() => {
    const handleFetchData = async () => {
      await dispatch(getSupplier());
    };
    handleFetchData();
    return () => {
      dispatch(purchaseAction.currentPage(1));
    };
  }, []);

  const supplierDetails = useMemo(() => {
    return supplierData?.find(
      (ele) =>
        ele?.supplierId === viewPurchaseHistory?.SupplierModel?.supplierId
    );
  }, [viewPurchaseHistory]);

  useEffect(() => {
    if (!isEmpty(viewPurchaseHistory)) {
      setNewPurchaseValue({
        ...newPurchaseValue,
        purchaseDate: convertDateIntoYYYYMMDD(
          viewPurchaseHistory?.purchaseDate
        ),
        supplierName: viewPurchaseHistory?.SupplierModel?.supplierId,
        purchaseInvoiceNumber: viewPurchaseHistory?.purchaseInvoiceNumber,
        amount: viewPurchaseHistory?.purchaseTransactionTables?.[0].grandTotal,
        dueAmount:
          viewPurchaseHistory?.purchaseTransactionTables?.[0].dueAmount,
        creditAmount:
          supplierDetails?.PurchaseReturnCredits?.length > 0
            ? supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
            : 0,
      });
    }
  }, [viewPurchaseHistory, supplierDetails]);

  const handleSelect = (e, type, name) => {
    if (name === "isCard" && !type) {
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: type,
        cardAmount: "",
        cardName: undefined,
      });
    } else if (name === "isBank" && !type) {
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: type,
        bankAmount: "",
        bankName: "",
      });
    } else if (name === "isCash" && !type) {
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: type,
        cashAmount: "",
      });
    } else {
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: type,
      });
    }
  };

  const supplierList = useMemo(() => {
    return supplierData?.map((ele) => {
      return {
        label: ele?.supplierName,
        value: ele?.supplierId,
      };
    });
  }, [supplierData]);

  const handleGetPurchaseHistoryData = async (page, limit, searchValue) => {
    const payload = {
      searchKeyword: searchValue,
    };
    const response = await dispatch(getPurchaseListData(page, limit, payload));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfPurchase", currentPage, limit, searchValue],
    queryFn: () =>
      handleGetPurchaseHistoryData(currentPage, limit, searchValue),
  });

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(purchaseAction.currentPage(1));
    if (isEmpty(value)) {
      dispatch(purchaseAction.currentPage(1));
      dispatch(purchaseAction.limit(20));
    }
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(purchaseAction.currentPage(page));
    dispatch(purchaseAction.limit(pageSize));
  };

  const handleSelectChange = (e, name) => {
    if (name === "paymentMode" && e !== "card") {
      setNewPurchaseValue({
        ...newPurchaseValue,
        cardName: undefined,
        [name]: e,
        isCash: false,
        isBank: false,
        isCard: false,
      });
    } else {
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: e,
        isCash: false,
        isBank: false,
        isCard: false,
      });
    }
  };

  const handleChange = (e, type, name) => {
    if (type === "price") {
      const { value } = e;
      if (name === "creditAmount") {
        if (supplierDetails?.PurchaseReturnCredits?.length > 0) {
          if (
            Number(value) >
            Number(
              supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
            )
          ) {
            setError({
              ...error,
              [name]: "Entered amount can't be more than credit amount",
            });
          } else {
            setError({
              ...error,
              [name]: "",
            });
          }
        }
      }
      if (name === "advanceAmount") {
        setAdvanceAmountError(
          Number(value) > Number(newPurchaseValue?.dueAmount)
            ? "Payable amount cant't be more than due amount"
            : ""
        );
      }
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: value,
      });
    } else {
      if (type === "datepicker") {
        setNewPurchaseValue({
          ...newPurchaseValue,
          [name]: e,
        });
      }
      if (type === "text") {
        setNewPurchaseValue({
          ...newPurchaseValue,
          [name]: e.target.value,
        });
      }
    }
  };

  const handleChangeNewPurchase = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CERATE_PURCHASE);
  };

  const handleViewModalOpen = (purchaseObj) => {
    setIsViewModalOpen(true);
    setPurchaseId(purchaseObj.purchaseId);
    dispatch(purchaseAction.viewPurchaseHistory(purchaseObj));
  };

  const isModelBtnDisabled = () => {
    const isBankPayment = newPurchaseValue?.paymentMode === "bankTransfer";
    if (
      isEmpty(newPurchaseValue?.paymentMode) ||
      isEmpty(newPurchaseValue?.advanceAmount) ||
      !isEmpty(error?.creditAmount) ||
      !isEmpty(advanceAmountError) ||
      isEmpty(newPurchaseValue?.purchasePaymentDate) ||
      (isBankPayment && isEmpty(newPurchaseValue?.bankName))
    ) {
      return true;
    }
    return false;
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
  };

  const handleOpenPaymentModel = () => {
    setIsPaymentModel(true);
    dispatch(editProductCartData(viewPurchaseHistory?.purchaseProducts));
  };

  const handleClosePaymentModel = () => {
    setIsPaymentModel(false);
    setNewPurchaseValue({
      ...newPurchaseValue,
      paymentMode: "",
      advanceAmount: "",
      bankName: "",
      purchasePaymentDate: "",
    });
  };

  const handlePaymentSubmit = async ({ payload, status }) => {
    const response = await dispatch(paymentViewPayment(status, payload));
    if (response.status === 200) {
      dispatch(testing({ payload: response.data.data, purchaseId }));
      setNewPurchaseValue();
    }
    return response;
  };

  const handleSuccessMutation = async (response) => {
    if (response.status === 200) {
      setIsPaymentModel(false);
      setIsViewModalOpen(false);
      dispatch(updatePurchaseListData(response?.data?.data));
    }
  };

  const { mutate, isPending: isPurchaseLoading } = useMutation({
    mutationFn: handlePaymentSubmit,
    onSuccess: handleSuccessMutation,
  });

  const handlePayment = (status) => {
    const bankTransferJson = {
      isBankTransfer:
        newPurchaseValue?.paymentMode === "bankTransfer" ? true : false,
      amount:
        newPurchaseValue?.paymentMode === "bankTransfer"
          ? newPurchaseValue?.advanceAmount
          : 0 || 0,
    };
    const cashTransferJson = {
      isCashTransfer: newPurchaseValue?.paymentMode === "cash" ? true : false,
      amount:
        newPurchaseValue?.paymentMode === "cash"
          ? newPurchaseValue.amount
          : 0 || 0,
    };

    const cardTransferJson = {
      isCardTransfer: newPurchaseValue?.paymentMode === "card" ? true : false,
      amount:
        newPurchaseValue?.paymentMode === "card"
          ? newPurchaseValue.amount
          : 0 || 0,
    };

    if (newPurchaseValue?.paymentMode === "multi") {
      bankTransferJson.amount = newPurchaseValue?.bankAmount || 0;
      bankTransferJson.isBankTransfer = newPurchaseValue?.isBank;

      cashTransferJson.amount = newPurchaseValue?.cashAmount || 0;
      cashTransferJson.isCashTransfer = newPurchaseValue?.isCash;

      cardTransferJson.amount = newPurchaseValue?.cardAmount || 0;
      cardTransferJson.isCardTransfer = newPurchaseValue?.isCard;

      // Calculate total and validate
      const totalAmount =
        +bankTransferJson.amount +
        +cashTransferJson.amount +
        +cardTransferJson.amount;

      const expectedAmount =
        +newPurchaseValue?.advanceAmount ||
        +newPurchaseValue?.amount?.replace("€", "");

      // Count selected payment modes
      const activeModes = [
        bankTransferJson.isBankTransfer,
        cashTransferJson.isCashTransfer,
        cardTransferJson.isCardTransfer,
      ].filter(Boolean).length;

      if (activeModes < 2) {
        setTotalError("You selected multi but only paying through one mode.");
        return;
      }

      if (totalAmount !== expectedAmount) {
        setTotalError("Total amount is not matching.");
        return;
      }
      // Validate individual payment modes
      if (
        (newPurchaseValue?.isBank && +newPurchaseValue?.bankAmount <= 0) ||
        (newPurchaseValue?.isCash && +newPurchaseValue?.cashAmount <= 0) ||
        (newPurchaseValue?.isCard && +newPurchaseValue?.cardAmount <= 0)
      ) {
        setTotalError(
          "Selected payment modes must have an amount greater than 0."
        );
        return;
      }
    }
    const payload = {
      purchaseId: viewPurchaseHistory?.purchaseId,
      supplierId: newPurchaseValue?.supplierName,
      purchaseDate: newPurchaseValue?.purchaseDate,
      purchaseInvoiceNumber: newPurchaseValue?.purchaseInvoiceNumber,
      // terms: newPurchaseValue?.terms,
      // termNumber: newPurchaseValue?.termNumber,
      products: purchaseProductCartData?.map((product) => {
        const {
          productId,
          quantity,
          purchasePrice,
          productName,
          subtotal,
          bag,
          qtyPerBag,
          newStocks,
          purchaseProductId,
          tax,
          remaningQty,
          PurchaseDiscount,
        } = product;
        const productObj = {
          ...(purchaseProductId && { purchaseProductId }),
          productId,
          productName,
          bag,
          qtyPerBag,
          quantity,
          purchasePrice: purchasePrice,
          subtotal,
          tax: tax || newStocks?.[0]?.tax,
          remaningQty: remaningQty || newStocks?.[0].tax,
          PurchaseDiscount,
        };
        return productObj;
      }),
      payment: {
        subTotal: newPurchaseValue?.amount,
        taxPercentage: 0,
        taxPrice: 0,
        shippingPrice: 0,
        total: newPurchaseValue?.amount,
        discountPercentage: 0,
        discountPrice: 0,
        grandTotal: newPurchaseValue?.amount,
        advanceAmount: newPurchaseValue?.advanceAmount,
        bankTransfer: bankTransferJson,
        cashTransfer: cashTransferJson,
        cardTransfer: cardTransferJson,
        cashQuantity: [],
        paymentMode:
          newPurchaseValue?.paymentMode === "bankTransfer"
            ? "bank-transfer"
            : newPurchaseValue?.paymentMode,
        creditAmount: newPurchaseValue?.creditAmount || 0,
        purchasePaymentDate: convertDateYYYYMMDD(
          newPurchaseValue?.purchasePaymentDate
        ),
        bankName: newPurchaseValue?.bankName,
        cardName: newPurchaseValue?.cardName,
      },
    };
    const data = { payload, status };
    mutate(data);
  };

  const handleTransactionModel = () => {
    setIsTransactionModel(!isTransactionModel);
  };

  const handleEditPurchase = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Purchase");
    sessionStorage.setItem("subTitle", "Purchases List");
    sessionStorage.setItem("subTitleLink", PURCHASE_LIST);
  };

  const handleDeleteModel = (purchaseTransactionId) => {
    setDeleteModel({
      ...deleteModel,
      isDeleteModel: true,
      id: purchaseTransactionId,
    });
  };

  const handleCancelDeleteRecordModel = () => {
    setDeleteModel(deleteInitialValues);
  };

  const handleDeleteRecord = async ({ purchaseTransactionId }) => {
    const response = await dispatch(
      deleteTransactionRecord(purchaseTransactionId)
    );
    return response;
  };

  const handleSuccessDeleteMutation = (response) => {
    if (response?.status === 200) {
      setIsTransactionModel(false);
      setIsViewModalOpen(false);
      setDeleteModel(deleteInitialValues);
    }
  };

  const { mutate: deleteMutate, isPending: isDeleteLoading } = useMutation({
    mutationFn: handleDeleteRecord,
    onSuccess: handleSuccessDeleteMutation,
  });

  const handleSaveDeleteRecord = () => {
    deleteMutate({ purchaseTransactionId: deleteModel?.id });
  };

  return (
    <PurchaseListView
      {...{
        isDeleteLoading,
        deleteModel,
        isTransactionModel,
        isLoading,
        isPurchaseLoading,
        advanceAmountError,
        isPaymentModel,
        newPurchaseValue,
        myPermissions,
        currentPage,
        limit,
        error,
        totalError,
        setTotalError,
        total,
        supplierList,
        viewPurchaseHistory,
        purchaseListData,
        purchaseProductCartData,
        isModelBtnDisabled,
        systemSettingDetails,
        handleChangeNewPurchase,
        isViewModalOpen,
        handleViewModalOpen,
        handleViewModalClose,
        handleSearchChange,
        handlePageChange,
        handleOpenPaymentModel,
        handleClosePaymentModel,
        handleSelectChange,
        handleChange,
        handlePayment,
        handleTransactionModel,
        handleSelect,
        handleEditPurchase,
        handleDeleteModel,
        handleCancelDeleteRecordModel,
        handleSaveDeleteRecord,
      }}
    />
  );
};

export default PurchaseListContainer;
