import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList, getReferenceId } from "../../../Redux/Actions";
import {
  peopleSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  getDiscountTotal,
  getPosTotalPrice,
  getTotalTaxValue,
} from "../../../Utils";
import { getMixMatch } from "../../../Redux/Actions/MixMatchAction/MixMatchAction";
import { formatDateYYYYMMDD } from "../../../Utils/Dates/Date";
import CustomerPosView from "./CustomerPosView";

const CustomerPosContainer = () => {
  const [pound, setPound] = useState(0);
  const [productCart, setProductCart] = useState([]);
  const dispatch = useDispatch();
  const { PosCustomerName } = posAction;
  const { grandTotal, productsTaxTotal, discountTotal } =
    useSelector(posSelector);
  const { customerData } = useSelector(peopleSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { mixMatchDiscountList } = useSelector((state) => state?.pos);

  const totalMixMatch = mixMatchDiscountList?.map((item) => {
    return item?.count * (+item?.totalPrice - +item?.mixMatch.price) || 0;
  });
  const mixMatchDiscount = totalMixMatch.reduce(
    (acc, price) => acc + (+price || 0),
    0
  );

  const todayDate = new Date();
  useEffect(() => {
    dispatch(getMixMatch("", "", formatDateYYYYMMDD(todayDate)));
  }, []);
  const [priceCalculation, setPriceCalculation] = useState({
    subTotalPrice: 0,
    subTotalTax: 0,
    discountTotalPrice: 0,
  });

  useEffect(() => {
    const subTotalPrice = getPosTotalPrice(productCart);
    const subTotalTax = getTotalTaxValue(productCart, "retailPrice");
    const discountTotalPrice = getDiscountTotal(
      productCart,
      "retailPrice",
    );
    setPriceCalculation({
      subTotalPrice,
      subTotalTax,
      discountTotalPrice,
    });
  }, [productCart]);

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
  }, [productCart]);

  useEffect(() => {
    const grandTotal =
      Number(priceCalculation?.subTotalPrice) +
      Number(priceCalculation?.subTotalTax) -
      Number(priceCalculation?.discountTotalPrice) -
      Number(pound) -
      Number(mixMatchDiscount);
    dispatch(posAction.grandTotal(parseFloat(grandTotal).toFixed(2)));
  }, [
    priceCalculation?.subTotalTax,
    priceCalculation?.subTotalPrice,
    priceCalculation?.discountTotalPrice,
    pound,
    mixMatchDiscount,
  ]);

  useEffect(() => {
    const customerRecord = customerData?.find(
      (ele) => ele?.customerId === systemSettingDetails?.customer
    );
    dispatch(PosCustomerName(customerRecord?.customerId));
  }, [customerData]);

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

  const productChannel = new BroadcastChannel("product_channel");
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("productCartData")) || [];
    setProductCart(storedCart);

    productChannel.onmessage = (event) => {
      const updatedData = event.data;
      setProductCart(updatedData);
    };

    return () => productChannel.close();
  }, []);
  return (
    <CustomerPosView
      {...{
        discountTotal,
        productsTaxTotal,
        grandTotal,
        systemSettingDetails,
        pound,
        mixMatchDiscount: mixMatchDiscount,
        productCart,
        priceCalculation,
        setPound
      }}
    />
  );
};

export default CustomerPosContainer;
