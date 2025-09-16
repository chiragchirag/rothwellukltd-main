import React, { useEffect, useMemo, useState } from "react";
import PosView from "./PosView";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerList,
  getDepartments,
  getPosSetting,
  getReferenceId,
  postPayment,
} from "../../../Redux/Actions";
import {
  peopleSelector,
  permissionSelector,
  posAction,
  posSelector,
} from "../../../Redux/Reducers/Slices";
import {
  getDiscountTotal,
  getPosTotalPrice,
  getTotalTaxValue,
  isEmpty,
} from "../../../Utils";
import { getMixMatch } from "../../../Redux/Actions/MixMatchAction/MixMatchAction";
import { formatDateYYYYMMDD } from "../../../Utils/Dates/Date";
import { useQuery } from "@tanstack/react-query";

const PosContainer = () => {
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [isStatus, setIsStatus] = useState(false);
  const [holdDataLength, setHoldDataLength] = useState(false);
  const [isStatusHoldBtn, setIsStatusHoldBtn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [OnHoldModal, setOnHoldModal] = useState({ isOpen: false });
  const [loyaLtyPoint, setLoyaltyPoint] = useState(0);
  const [pound, setPound] = useState(0);
  const [loyaltyMemberId, setLoyaltyMemberId] = useState("");
  const [redeem, setRedeem] = useState(false);
  const dispatch = useDispatch();
  const { PosCustomerName, addProductToPOSCart, taxTotal } = posAction;
  const {
    ReferenceNumber,
    grandTotal,
    customerId,
    paymentMode,
    productToCart,
    paymentCashCountInfo,
    paymentCashCentCountInfo,
    paymentBankSubTotal,
    productsTaxTotal,
    discountTotal,
  } = useSelector(posSelector);
  const { customerData } = useSelector(peopleSelector);
  const [paymentSuccessDetails, setPaymentSuccessDetails] = useState({});
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    isPrintReceipt: false,
    isOpenPaymentMethod: false,
  });
  const { myPermissions } = useSelector(permissionSelector);
  const { mixMatchDiscountList } = useSelector((state) => state?.pos);

  const totalMixMatch = mixMatchDiscountList?.map((item) => {
    return item?.count * (+item?.totalPrice - +item?.mixMatch.price) || 0;
  });
  const mixMatchDiscount = totalMixMatch.reduce(
    (acc, price) => acc + (+price || 0),
    0
  );

  const handleReloadVoid = () => {
    dispatch(getReferenceId());
    const customerRecord = customerData?.find(
      (ele) => ele?.customerType === "system"
    );
    dispatch(PosCustomerName(customerRecord?.customerId));
    dispatch(addProductToPOSCart([]));
  };

  const todayDate = new Date();
  useEffect(() => {
    dispatch(getMixMatch("", "", formatDateYYYYMMDD(todayDate)));
  }, []);

  const calculateDiscounts = () => {
    let newCart = [...productToCart];
    mixMatchDiscountList.forEach((offer) => {
      const originalTotal = offer?.mixMatch?.mixMatchProducts.reduce(
        (acc, product) => {
          const retailPrice = parseFloat(
            product?.ProductModel?.newStocks[0]?.retailPrice
          );
          return offer?.mixMatch?.offerType === "typeB"
            ? parseFloat(retailPrice * offer.mixMatch.Qty).toFixed(2)
            : acc + retailPrice;
        },
        0
      );

      const totalDiscount = originalTotal - offer?.mixMatch?.price;

      offer?.mixMatch?.mixMatchProducts.forEach((product) => {
        const retailPrice = parseFloat(
          product.ProductModel.newStocks[0].retailPrice
        );
        const discount = totalDiscount * (retailPrice / originalTotal);

        const discountTotal = parseFloat(
          (discount / retailPrice) * 100
        ).toFixed(2);

        newCart = newCart.map((cartItem) => {
          if (cartItem?.productId === product?.productId) {
            return {
              ...cartItem,
              discount: discountTotal > 0 ? Number(discountTotal) : 0,
            };
          }
          return cartItem;
        });
      });
    });
    dispatch(addProductToPOSCart(newCart));
    return newCart;
  };

  const handlePayment = async (status) => {
    if (status === "complete") {
      setIsStatus(true);
    } else {
      setIsStatusHoldBtn(true);
    }
    const paymentCashNewArr = paymentCashCountInfo?.map((cash) => {
      return { cashPrice: cash?.cashPrice, cashQuantity: cash?.cashQuantity };
    });
    const paymentPennyNewArr = paymentCashCentCountInfo?.map((cash) => {
      return { centPrice: cash?.centPrice, centQuantity: cash?.centQuantity };
    });
    const paymentNewArr = paymentCashNewArr.concat(paymentPennyNewArr);
    const bankTransferJson = {
      isBankTransfer: paymentBankSubTotal > 0 ? true : false,
      amount: paymentBankSubTotal || 0,
    };
    const customer = customerData.find(
      (customer) => customer.customerId === customerId
    );
    const newCartData = calculateDiscounts();
    const payload = {
      customerId,
      loyaltyCardId: customer?.loyaltyCard?.loyaltyCardId,
      loyaltyMemberId,
      loyaLtyPoint,
      pound,
      redeem,
      products: newCartData?.map((product) => {
        const {
          productId,
          quantity,
          retailPrice,
          productName,
          newStocks,
          productSubTotal,
          discount,
        } = product;
        const productObj = {
          discount,
          productId,
          stockId: newStocks[0]?.stockId,
          quantity: Number(quantity),
          price: retailPrice,
          subtotal: parseFloat(productSubTotal).toFixed(2),
          productName,
          referenceNumber: ReferenceNumber,
          operatorValue: product?.unit?.operatorValue,
        };
        return productObj;
      }),
      payment: {
        subTotal: parseFloat(grandTotal).toFixed(2) || 0,
        taxPercentage: 0,
        taxPrice: 0,
        shippingPrice: 0,
        total: parseFloat(grandTotal).toFixed(2) || 0,
        discountPercentage: 0,
        discountPrice: parseFloat(
          Number(discountTotal) + Number(mixMatchDiscount) || 0
        ).toFixed(2),
        grandTotal: parseFloat(grandTotal).toFixed(2) || 0,
        paymentMode,
        cashQuantity: paymentNewArr,
        bankTransfer: bankTransferJson,
      },
    };
    const response = await dispatch(postPayment(payload, status));
    if (response?.status === 200) {
      if (status === "complete") {
        setPaymentSuccessDetails(response?.data?.data);
        setPaymentModal((prev) => ({
          ...prev,
          isOpen: true,
          isPrintReceipt: true,
          isOpenPaymentMethod: false,
        }));
        setRedeem(false);
      } else {
        if (status === "hold") {
          setHoldDataLength(true);
          handleReloadVoid();
          setIsStatusHoldBtn(false);
          setOnHoldModal((prev) => ({ ...prev, isOpen: false }));
          const timer = setTimeout(() => {
            setHoldDataLength(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }
    }
    dispatch(posAction?.afterPayment([]));
    setIsStatus(false);
  };

  const isBtnDisable = () => {
    if (
      isEmpty(customerId) ||
      isEmpty(productToCart) ||
      isEmpty(grandTotal) ||
      isEmpty(ReferenceNumber)
    )
      return true;

    return false;
  };

  const isHoldBtnDisable = () => {
    if (
      isEmpty(customerId) ||
      isEmpty(productToCart) ||
      isEmpty(grandTotal) ||
      isEmpty(ReferenceNumber)
    )
      return true;

    return false;
  };

  useEffect(() => {
    const subTotalPrice = getPosTotalPrice(productToCart);
    const subTotalTax = getTotalTaxValue(productToCart, "retailPrice");
    const discountTotalPrice = getDiscountTotal(productToCart, "retailPrice");
    dispatch(taxTotal(subTotalTax));
    dispatch(posAction.discountTotal(discountTotalPrice));
    setSubTotalPrice(subTotalPrice);
  }, [productToCart]);

  useEffect(() => {
    const totalMixMatch = mixMatchDiscountList?.map((item) => {
      return item?.count * (+item?.totalPrice - +item?.mixMatch.price) || 0;
    });
    const mixMatchDiscount = totalMixMatch.reduce(
      (acc, price) => acc + (+price || 0),
      0
    );
    dispatch(
      posAction.mixMatchDiscountTotal(parseFloat(mixMatchDiscount).toFixed(2))
    );
  }, [productToCart]);

  useEffect(() => {
    const grandTotal =
      Number(subTotalPrice) +
      Number(productsTaxTotal) -
      Number(discountTotal) -
      Number(pound) -
      Number(mixMatchDiscount);
    dispatch(posAction.grandTotal(parseFloat(grandTotal).toFixed(2)));
  }, [productsTaxTotal, subTotalPrice, discountTotal, pound, mixMatchDiscount]);

  useEffect(() => {
    const handleGetReferenceId = () => {
      dispatch(getReferenceId());
      const payload = {
        customerType: "retail",
      };
      dispatch(getCustomerList("", payload));
    };
    handleGetReferenceId();
  }, []);

  useEffect(() => {
    const handleFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };
    document.addEventListener("click", handleFullscreen);
    return () => {
      document.removeEventListener("click", handleFullscreen);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
  }, []);

  const handleGetDepartments = async () => {
    const response = await dispatch(getDepartments());
    return response;
  };

  const { data: departments } = useQuery({
    queryKey: ["department"],
    queryFn: () => handleGetDepartments(),
  });

  const handleGetPosSetting = async () => {
    const response = await dispatch(getPosSetting());
    return response;
  };

  useEffect(async () => {
    handleGetPosSetting();
  }, []);

  const departmentList = useMemo(() => {
    const defaultOption = { label: "ALL", value: "ALL" };
    const data = [
      defaultOption,
      ...(departments?.data?.data?.map((ele) => {
        return {
          label: ele?.name,
          value: ele?.departmentType,
        };
      }) || []),
    ];
    return data?.sort((a, b) => a?.label?.localeCompare(b?.label));
  }, [departments?.data?.data]);

  return (
    <PosView
      {...{
        myPermissions,
        discountTotal,
        isHoldBtnDisable,
        subTotalPrice,
        productsTaxTotal,
        handlePayment,
        isBtnDisable,
        isStatus,
        searchValue,
        setSearchValue,
        paymentModal,
        setPaymentModal,
        isStatusHoldBtn,
        paymentSuccessDetails,
        holdDataLength,
        OnHoldModal,
        setOnHoldModal,
        setLoyaltyPoint,
        setPound,
        pound,
        setLoyaltyMemberId,
        setRedeem,
        mixMatchDiscount: mixMatchDiscount,
        departments: departmentList || [],
      }}
    />
  );
};

export default PosContainer;
