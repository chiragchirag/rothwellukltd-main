import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import QuotationListView from "./QuotationListView";
import {
  CERATE_QUOTATION,
  QUOTATION_LIST,
} from "../../../Constant/routeConstant";
import { OpenNotificationComponent } from "../../../CommonComponent";
import { getQuotationList, sendMailToCustomer } from "../../../Redux/Actions";
import {
  newQuotationAction,
  newQuotationSelector,
} from "../../../Redux/Reducers/NewQuotationReducer/NewQuotationReducer";
import { debounce, isEmpty } from "../../../Utils";
import {
  permissionSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  getPosTotalWholeSalePrice,
  getTotalTaxValue,
} from "../../../Utils/PriceCalculation/PosPriceCalculation";
import {
  saleAction,
  saleSelector,
} from "../../../Redux/Reducers/SaleReducer/SaleReducer";
import { useReactToPrint } from "react-to-print";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";

const QuotationListContainer = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchValueJson, setSearchValueJson] = useState({
    searchKeyword: 0,
  });
  const [isMailSend, setIsMailSend] = useState(false);
  const [isPrintReceiptModel, setIsPrintReceiptModel] = useState(false);

  const dispatch = useDispatch();
  const { total, currentPage, limit, newQuotationListData, viewQuotationData } =
    useSelector(newQuotationSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { subTotal } = useSelector(saleSelector);
  const { productsTaxTotal } = useSelector(posSelector);
  const { myPermissions } = useSelector(permissionSelector);
  const navigation = useNavigate();
  const componentRef = useRef(null);

  useEffect(() => {
    const subTotalPrice = getPosTotalWholeSalePrice(
      viewQuotationData?.wholeSaleSolds
    );
    const subTotalTax = getTotalTaxValue(
      viewQuotationData?.wholeSaleSolds,
      "price"
    );
    dispatch(posAction.taxTotal(subTotalTax));
    dispatch(saleAction.subTotal(subTotalPrice));
  }, [viewQuotationData]);

  useEffect(() => {
    return () => {
      dispatch(newQuotationAction.currentPage(1));
    };
  }, []);

  const handleChangeNewQuotation = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CERATE_QUOTATION);
  };

  const handleGetQuotationList = async (page, limit, searchValue) => {
    const payload = {
      ...searchValue,
    };
    await dispatch(getQuotationList(page, limit, payload));
  };

  const { isLoading } = useQuery({
    queryKey: ["quotationList", currentPage, limit, searchValueJson],
    queryFn: () => handleGetQuotationList(currentPage, limit, searchValueJson),
  });

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    dispatch(newQuotationAction.currentPage(1));
    setSearchValueJson({ ...searchValueJson, searchKeyword: value });
    if (isEmpty(value)) {
      dispatch(newQuotationAction.limit(20));
      dispatch(newQuotationAction.currentPage(1));
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(searchValueJson?.searchKeyword) &&
        handleGetQuotationList(1, 20, searchValueJson);
    }
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(newQuotationAction.limit(pageSize));
    dispatch(newQuotationAction.currentPage(page));
  };

  const openNotificationWithIcon = () => {
    OpenNotificationComponent(
      "Your product is deleted from the list.",
      "error"
    );
  };

  const handleViewModalOpen = (quotationObj) => {
    setIsViewModalOpen(true);
    dispatch(newQuotationAction.viewQuotationData(quotationObj));
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setIsMailSend(false);
    dispatch(newQuotationAction.viewQuotationData({}));
  };

  const handleOpenMailModel = (quotationObj) => {
    setIsMailSend(true);
    dispatch(newQuotationAction.viewQuotationData(quotationObj));
  };

  const handleSubmitQuotationSendMail = async ({ payload }) => {
    const response = await dispatch(sendMailToCustomer(payload));
    return response;
  };
  const handleSuccessMutation = (response) => {
    if (response.status === 200) {
      setIsMailSend(false);
    }
  };

  const { mutate, isPending: isSendMailLoading } = useMutation({
    mutationFn: handleSubmitQuotationSendMail,
    onSuccess: handleSuccessMutation,
  });

  const handleSendMail = () => {
    const customerPhoneNo = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === viewQuotationData?.CustomerModel?.countryCode
    );
    const phoneCountry = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === systemSettingDetails?.PhoneCountryCode
    );
    const payload = {
      title: "Quotation Invoice Number",
      invoiceNumber: viewQuotationData?.quotationNo,
      name: "Quotation",
      customerInfo: {
        customerName: viewQuotationData?.CustomerModel?.customerName,
        phoneNo: `${customerPhoneNo?.code}-${viewQuotationData?.CustomerModel?.phoneNo}`,
        emailId: viewQuotationData?.CustomerModel?.emailId,
        address: `${viewQuotationData?.CustomerModel?.houseNo}-${viewQuotationData?.CustomerModel?.street},${viewQuotationData?.CustomerModel?.landMark},${viewQuotationData?.CustomerModel?.city}-${viewQuotationData?.CustomerModel?.postalCode} ${viewQuotationData?.CustomerModel?.country}`,
      },
      companyInfo: {
        companyName: systemSettingDetails?.companyName,
        address: systemSettingDetails?.address,
        emailId: systemSettingDetails?.emailId,
        companyPhoneNumber: `${phoneCountry?.code}-${systemSettingDetails?.companyPhoneNumber}`,
      },
      products: viewQuotationData?.wholeSaleSolds?.map((product) => {
        const {
          quantity,
          price,
          productName,
          subtotal,
          newStock,
          ProductModel,
        } = product;
        const productObj = {
          productCode: ProductModel?.productCode || "N/A",
          productName,
          quantity,
          price: price,
          subtotal: subtotal,
          tax: newStock?.tax,
        };
        return productObj;
      }),
      payment: {
        subTotal: getPosTotalWholeSalePrice(viewQuotationData?.wholeSaleSolds),
        taxPrice:
          getTotalTaxValue(viewQuotationData?.wholeSaleSolds, "price") || 0,
        grandTotal: viewQuotationData?.quatationTables?.[0]?.grandTotal,
      },
    };
    mutate({ payload });
  };

  const handleOpenPrintModel = () => {
    setIsPrintReceiptModel(!isPrintReceiptModel);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleEditQuotation = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Quotation");
    sessionStorage.setItem("subTitle", "Quotation List");
    sessionStorage.setItem("subTitleLink", QUOTATION_LIST);
  };

  return (
    <QuotationListView
      {...{
        subTotal,
        productsTaxTotal,
        systemSettingDetails,
        componentRef,
        viewQuotationData,
        isPrintReceiptModel,
        isSendMailLoading,
        total,
        currentPage,
        limit,
        isMailSend,
        newQuotationListData,
        myPermissions,
        isLoading,
        handleSearchChange,
        handleKeyDown,
        handlePageChange,
        handleChangeNewQuotation,
        openNotificationWithIcon,
        isViewModalOpen,
        handleViewModalOpen,
        handleViewModalClose,
        handleSendMail,
        handleOpenMailModel,
        handleOpenPrintModel,
        handlePrint,
        handleEditQuotation,
      }}
    />
  );
};

export default QuotationListContainer;
