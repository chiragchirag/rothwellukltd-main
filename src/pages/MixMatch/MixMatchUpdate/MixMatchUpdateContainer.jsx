import React, { useEffect, useState } from "react";
import { formatDateYYYYMMDD } from "../../../Utils/Dates/Date";
import { useDispatch, useSelector } from "react-redux";
import {
  //   createMixMatch,
  getMixMatchById,
  getMixMatchUpdateById,
  getProductData,
} from "../../../Redux/Actions/MixMatchAction/MixMatchAction";
import { mixMatchAction } from "../../../Redux/Reducers/MixMatchReducer/MixMatchReducer";
import { useParams } from "react-router-dom";
import MixMatchUpdateView from "./MixMatchUpdateView";
import { isEmpty } from "../../../Utils";
import { OpenNotificationComponent } from "../../../CommonComponent";
const { removedProductMixMatch } = mixMatchAction;

const MixMatchUpdateContainer = () => {
  const [isStatus, setIsStatus] = useState(false);
  const [mixMatch, setMixMatch] = useState({});
  const [product, setProduct] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useState(false);
  const [isEmptyCheck, setIsEmptyCheck] = useState(true);
  const { id } = useParams();

  const { addToProductMixMatchPreview } = mixMatchAction;

  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.mixMatch?.productList);

  const { mixMatchById } = useSelector((state) => state?.mixMatch);

  useEffect(() => {
    dispatch(getMixMatchById(id));
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isEmpty(mixMatchById)) {
        const {
          Qty,
          offerName,
          startDate,
          endDate,
          price,
          mixMatchProducts,
          offerType,
        } = mixMatchById;
        setMixMatch({
          offerName,
          offerType,
          qty: Qty,
          price: price.toString(),
          startDate: startDate,
          endDate,
        });
        const productList = mixMatchProducts?.map((e) => {
          return e.ProductModel;
        });
        await dispatch(addToProductMixMatchPreview(productList));
        setChange(true);
      }
    };

    fetchData();
  }, [mixMatchById]);

  useEffect(() => {
    if (change) {
      const total = productData?.map((item) => item?.newStocks[0]?.retailPrice);
      const totalPrice = total.reduce((acc, price) => acc + (+price || 0), 0);
      setTotalPrice(totalPrice);
      setChange(false);
    }
  }, [change]);

  const handleChange = (e, type, name) => {
    if (type === "datepicker") {
      setMixMatch({ ...mixMatch, [name]: formatDateYYYYMMDD(e) });
    } else if (name === "product") {
      const value = e?.target?.value;
      if (value !== undefined) {
        setProduct(value);
      }
    } else {
      const value = e?.target?.value;
      if (value !== undefined) {
        setMixMatch({ ...mixMatch, [name]: value });
      }
    }

    if (
      isEmpty(mixMatch?.startDate) ||
      isEmpty(mixMatch?.endDate) ||
      isEmpty(mixMatch?.offerName) ||
      isEmpty(mixMatch?.price) ||
      isEmpty(productData)
    ) {
      setIsEmptyCheck(true);
    } else {
      setIsEmptyCheck(false);
    }
  };

  const handleProductOnBlur = () => {};

  const handleSubmit = async () => {
    if (
      !isEmpty(mixMatch?.startDate) ||
      !isEmpty(mixMatch?.endDate) ||
      !isEmpty(mixMatch?.offerName) ||
      !isEmpty(mixMatch?.price) ||
      productData?.length > 0
    ) {
      const productList = productData?.map((item) => {
        return {
          productId: item.productId,
          subtotal: 0,
          quantity: 0,
        };
      });
      setIsStatus(true);
      const payload = {
        ...mixMatch,
        productList,
      };
      await dispatch(getMixMatchUpdateById(id, payload));
      setIsStatus(false);
    } else {
      OpenNotificationComponent("Please fill all fields", "warning");
    }
  };

  const handleAddProduct = async (e) => {
    if (e.key === "Enter") {
      setProduct("");
      const payload = {
        searchedKeyWord: product,
      };
      await dispatch(getProductData(payload, "pos"));
      setChange(true);
    }
  };
  const handleRemoved = (e) => {
    dispatch(removedProductMixMatch(e?.productId));
    setChange(true);
  };

  const options = [
    {
      label: "TYpe A",
      value: "typeA",
    },
    {
      label: "Type B",
      value: "typeB",
    },
    {
      label: "Type C",
      value: "typeC",
    },
  ];

  return (
    <MixMatchUpdateView
      handleChange={handleChange}
      handleProductOnBlur={handleProductOnBlur}
      mixMatch={mixMatch}
      handleSubmit={handleSubmit}
      isStatus={isStatus}
      handleAddProduct={handleAddProduct}
      product={product}
      productData={productData}
      handleRemoved={handleRemoved}
      totalPrice={totalPrice}
      options={options}
      isEmptyCheck={isEmptyCheck}
    />
  );
};

export default MixMatchUpdateContainer;
