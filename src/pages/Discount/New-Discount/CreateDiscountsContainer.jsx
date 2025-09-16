import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../../Constant/primitive";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../Redux/Reducers/Slices";
import {
  getProductData,
  getBrand,
  createDiscount,
  updateDiscount,
  getDiscountById,
} from "../../../Redux/Actions";
import { useParams } from "react-router-dom";
import CreateDiscountsView from "./CreateDiscountsView";
import {
  DISCOUNT_FORM_SCHEMA,
  discountInitialValues,
} from "../../../FormSchema/DiscountSchema";
import { convertDateIntoYYYYMMDD, isEmpty } from "../../../Utils";
import { discountSelector } from "../../../Redux/Reducers/DiscountReducer/DiscountReducer";
import dayjs from "dayjs";

const CreateDiscountsContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isStatusInput, setIsStatusInput] = useState(false);
  const [productData, setProductData] = useState(null);
  const [formValues, setFormValues] = useState(discountInitialValues);
  const [formValuesForPacket, setFormValuesForPacket] = useState(
    discountInitialValues
  );
  const [searchBy, setSearchBy] = useState("searchedKeyWord");
  const [discountType, setDiscountType] = useState("");
  const [loading, setLoading] = useState(false);
  const [packetId, setPacketId] = useState("");

  const dispatch = useDispatch();
  const { editDiscountData } = useSelector(discountSelector);

  const formFields = DISCOUNT_FORM_SCHEMA;

  const checkButtonDisabled = (itemType) => {
    if (itemType === "loose") {
      if (
        isEmpty(formValues?.startDate) ||
        isEmpty(formValues?.endDate) ||
        isEmpty(formValues?.discountType)
      ) {
        return true;
      } else if (
        formValues?.discountType === "fixed" ||
        formValues?.discountType === "percentage"
      ) {
        if (formValues?.discountType === "fixed") {
          if (formValues?.buy <= 0 || formValues?.offer <= 0) {
            return true;
          }
        } else if (formValues?.discountType === "percentage") {
          if (formValues?.discount <= 0) {
            return true;
          }
        }
      }
      return false;
    } else {
      if (
        isEmpty(formValuesForPacket?.startDate) ||
        isEmpty(formValuesForPacket?.endDate) ||
        isEmpty(formValuesForPacket?.discountType)
      ) {
        return true;
      } else if (
        formValuesForPacket?.discountType === "fixed" ||
        formValuesForPacket?.discountType === "percentage"
      ) {
        if (formValuesForPacket?.discountType === "fixed") {
          if (
            formValuesForPacket?.buy <= 0 ||
            formValuesForPacket?.offer <= 0
          ) {
            return true;
          }
        } else if (formValuesForPacket?.discountType === "percentage") {
          if (formValuesForPacket?.discount <= 0) {
            return true;
          }
        }
      }
      return false;
    }
  };

  const handleDiscountTypeChange = (value, name, _, itemType) => {
    if (itemType === "looseItem") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        buy: "",
        offer: "",
        discount: "",
      }));
    } else {
      setFormValuesForPacket((prevValues) => ({
        ...prevValues,
        [name]: value,
        buy: "",
        offer: "",
        discount: "",
        VegAndFruitsPackageId: packetId,
      }));
    }
  };

  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        setLoading(true);
        const data = await dispatch(getDiscountById(id));
        const {
          startDate,
          discountType,
          discount,
          endDate,
          buy,
          offer,
          VegAndFruitsPackage,
        } = data.data.data;
        setFormValuesForPacket({
          ...formValuesForPacket,
          startDate: dayjs(startDate),
          endDate: dayjs(endDate),
          discountType,
          discount,
          buy,
          offer,
        });
        setPacketId(VegAndFruitsPackage?.VegAndFruitsPackageId);
        setLoading(false);
      };
      handleFetchData();
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setProductData(null);
      setFormValues(discountInitialValues);
    }
  }, [id]);

  useEffect(() => {
    if (!isEmpty(editDiscountData)) {
      const data = {
        ...editDiscountData,
        productId:
          editDiscountData?.ProductModel?.productId ||
          editDiscountData?.VegAndFruitsPackage?.ProductModel?.productId,
        productName:
          editDiscountData?.ProductModel?.productName ||
          editDiscountData?.VegAndFruitsPackage?.ProductModel?.productName,
        productCode:
          editDiscountData?.ProductModel?.productCode ||
          editDiscountData?.VegAndFruitsPackage?.ProductModel?.productCode,
        brandName: editDiscountData?.ProductModel?.brand?.brandName || "",
        retailPrice:
          editDiscountData?.ProductModel?.newStocks?.[0]?.retailPrice ||
          editDiscountData?.VegAndFruitsPackage?.ProductModel?.newStocks?.[0]
            ?.retailPrice,
        productType: !isEmpty(
          editDiscountData?.VegAndFruitsPackage?.ProductModel?.productType
        )
          ? editDiscountData?.VegAndFruitsPackage?.ProductModel?.productType
          : editDiscountData?.ProductModel?.productType,
        type:
          editDiscountData?.VegAndFruitsPackage?.ProductModel?.type ||
          editDiscountData?.ProductModel?.type,
        VegAndFruitsPackages: editDiscountData?.VegAndFruitsPackage
          ? [editDiscountData?.VegAndFruitsPackage]
          : [],
      };
      setProductData(data);
      setFormValues({
        ...formValues,
        startDate: convertDateIntoYYYYMMDD(editDiscountData?.startDate),
        endDate: convertDateIntoYYYYMMDD(editDiscountData?.endDate),
        discountType: editDiscountData?.discountType,
        discount: editDiscountData?.discount,
        buy: editDiscountData?.buy,
        offer: editDiscountData?.offer,
        VegAndFruitsPackageId: editDiscountData?.VegAndFruitsPackageId,
      });
    }
  }, [editDiscountData]);

  const handleGetProduct = async (searchValue) => {
    setLoading(true);
    setIsStatusInput(true);
    const searchParams = { [searchBy]: searchValue };
    const response = await dispatch(
      getProductData(searchParams, 1, 10, "vegFruit")
    );
    if (response?.status === 200) {
      const product = response?.data?.data?.[0];
      if (product) {
        const { productId, productName, productCode, brand, newStocks } =
          product;
        const structuredProduct = {
          ...product,
          productId,
          productName,
          productCode,
          brandName: brand?.brandName || "",
          retailPrice: newStocks[0]?.retailPrice,
        };
        setProductData(structuredProduct);
        setFormValues((prevValues) => ({
          ...prevValues,
          productId,
        }));
        dispatch(getProduct(product));
      } else {
        setProductData(null);
        setFormValues(discountInitialValues);
      }
    }
    setLoading(false);
    setIsStatusInput(false);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value.trim());
  };

  // const convertDateIntoDDMMYYYY = (date) => {
  //   if (dayjs(date).isValid()) {
  //     return dayjs(date).format("DD/MM/YYYY");
  //   }
  //   return "";
  // };

  const handleChange = (
    e,
    type,
    name,
    VegAndFruitsPackageId,
    itemType,
    startDate,
    endDate
  ) => {
    let newFormValues;

    if (type === "datepicker") {
      if (!e) {
        // Date has been cleared
        newFormValues = {
          ...(itemType === "looseItem" ? formValues : formValuesForPacket),
          [name]: "", // Clear the date field
        };

        itemType === "looseItem"
          ? setFormValues(newFormValues)
          : setFormValuesForPacket(newFormValues);

        return;
      }

      const selectedDate = dayjs(e);
      const currentDay = dayjs().startOf("day");

      if (
        selectedDate.isValid() &&
        (selectedDate.isAfter(currentDay) || selectedDate.isSame(currentDay))
      ) {
        if (
          name === "startDate" &&
          endDate &&
          selectedDate.isAfter(dayjs(endDate), "day")
        ) {
          return; // Prevent invalid startDate
        }
        if (
          name === "endDate" &&
          startDate &&
          selectedDate.isBefore(dayjs(startDate), "day")
        ) {
          return; // Prevent invalid endDate
        }

        newFormValues = {
          ...(itemType === "looseItem" ? formValues : formValuesForPacket),
          [name]: selectedDate, // Set the selected date
        };

        if (itemType !== "looseItem") {
          newFormValues.VegAndFruitsPackageId = VegAndFruitsPackageId;
        }

        itemType === "looseItem"
          ? setFormValues(newFormValues)
          : setFormValuesForPacket(newFormValues);
      } else {
        return; // Date is before today or invalid
      }
    } else {
      const { value } = e.target;
      newFormValues = {
        ...(itemType === "looseItem" ? formValues : formValuesForPacket),
        [name]:
          name === "discount"
            ? value <= 100
              ? value.includes(".")
                ? value.length <= 4
                  ? value
                  : itemType === "looseItem"
                    ? formValues?.discount
                    : formValuesForPacket?.discount
                : value
              : itemType === "looseItem"
                ? formValues?.discount
                : formValuesForPacket?.discount
            : value,
      };

      if (itemType !== "looseItem") {
        newFormValues.VegAndFruitsPackageId = VegAndFruitsPackageId;
      }

      itemType === "looseItem"
        ? setFormValues(newFormValues)
        : setFormValuesForPacket(newFormValues);
    }
  };

  const handleSearchData = () => {
    if (searchValue.trim()) {
      handleGetProduct(searchValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchData();
    }
  };

  const handleGetAllBrand = async (page, limit) => {
    return await dispatch(getBrand({ page, limit }));
  };

  const handleSubmitDiscount = async ({ payload }) => {
    let response;
    if (id) {
      response = await dispatch(updateDiscount(payload, id));
    } else {
      response = await dispatch(createDiscount(payload));
    }
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 201) {
      setFormValues(discountInitialValues);
      setProductData(null);
      setSearchValue("");
    }
  };

  const { mutate, isPending: isSubmitDiscountLoading } = useMutation({
    mutationFn: handleSubmitDiscount,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = (itemType) => {
    setDiscountType(itemType);
    let payload;
    if (itemType === "packet") {
      payload = {
        ...formValuesForPacket,
        productId: productData?.productId,
        buy: Number(formValuesForPacket?.buy) || 0,
        offer: Number(formValuesForPacket?.offer) || 0,
        type: "1",
      };
    } else {
      payload = {
        ...formValues,
        buy: Number(formValues?.buy) || 0,
        offer: Number(formValues?.offer) || 0,
        type: "1",
      };
      delete payload.VegAndFruitsPackageId;
    }
    if (id) {
      delete payload.VegAndFruitsPackageId;
      delete payload.productId;
    } else {
      if (itemType === "packet") {
        delete payload.productId;
        payload = { ...payload, VegAndFruitsPackageId: packetId };
      } else {
        delete payload.VegAndFruitsPackageId;
        payload = { ...payload };
      }
      if (formValues?.discountType === "percentage") {
        payload = {
          ...payload,
          discount: formValues?.discount,
        };
      } else {
        delete payload.discount;
      }
      if (itemType === "packet") {
        if (formValuesForPacket?.discountType === "percentage") {
          payload = {
            ...payload,
            discount: formValuesForPacket?.discount,
          };
        } else {
          delete payload.discount;
        }
      }
    }
    const data = { payload };
    mutate(data);
  };

  const disabledPreviousDate = (current, startDate, endDate) => {
    if (!current || !current.isValid()) return false;

    const isBeforeToday = current.isBefore(dayjs().startOf("day"));
    const isBeforeStartDate = startDate
      ? current.isBefore(dayjs(startDate), "day")
      : false;
    const isAfterEndDate = endDate
      ? current.isAfter(dayjs(endDate), "day")
      : false;

    return isBeforeToday || isBeforeStartDate || isAfterEndDate;
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);
    setSearchValue("");
  };

  useQuery({
    queryKey: ["brand"],
    queryFn: () => handleGetAllBrand(1, 10),
    staleTime: STALE_TIME,
  });

  return (
    <div>
      <CreateDiscountsView
        {...{
          loading,
          searchValue,
          formValues,
          formFields,
          productData,
          isStatusInput,
          isEdit,
          isSubmitDiscountLoading,
          checkButtonDisabled,
          handleSearchChange,
          handleKeyDown,
          handleChange,
          handleSubmit,
          handleDiscountTypeChange,
          packetId,
          setPacketId,
          formValuesForPacket,
          discountType,
          disabledPreviousDate,
          handleSearchByChange,
          searchBy,
        }}
      />
    </div>
  );
};

export default CreateDiscountsContainer;
