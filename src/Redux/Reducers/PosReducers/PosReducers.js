/* eslint-disable prefer-const */
import { createSlice } from "@reduxjs/toolkit";
import posInitialState from "../../InitialState/posInitialState.json";
import {
  createReducersAutomatically,
  isEmpty,
  // isEmpty,
  // isEmpty,
  // isEmpty,
  priceToPercentageCalculation,
} from "../../../Utils";
import {
  getDiscountPercentage,
  getSubTotalPackagePriceDiscount,
  getSubTotalPriceDiscount,
  getSubTotalPriceMinusDiscount,
} from "../../../Utils/PriceCalculation/PosPriceCalculation";

const posReducer = createSlice({
  name: "pos",
  initialState: posInitialState,
  reducers: {
    ...createReducersAutomatically(posInitialState),
    addPosReferenceNumber: (state, action) => {
      const ReferenceNumber = JSON.parse(JSON.stringify(action.payload));
      state.ReferenceNumber = ReferenceNumber;
    },

    addProductToPOSCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      if (Array.isArray(action.payload)) {
        state.productToCart = action.payload;
      } else {
        if (action.payload?.type == 1) {
          if (action.payload?.newStocks?.[0]?.remainingQuantity > 0) {
            const existingProduct = productsTOCart?.find(
              (product) =>
                (product?.newStocks?.[0]?.stockId ===
                  action.payload.newStocks?.[0]?.stockId &&
                  action.payload?.isPacked) ||
                (product.newStocks?.[0]?.stockId ===
                  action.payload?.newStocks?.[0]?.stockId &&
                  action.payload?.productType == 1)
            );
            if (existingProduct) {
              existingProduct.quantity += 1;
              existingProduct.productSubTotal =
                action?.payload?.productType === 1 || existingProduct?.isPacked
                  ? getSubTotalPackagePriceDiscount(
                      existingProduct?.newStocks?.[0],
                      existingProduct
                    )
                  : getSubTotalPriceDiscount(existingProduct);

              // existingProduct.taxTotal = action?.payload?.newStocks?.[0]?.tax;
              existingProduct.taxTotal = action?.payload?.newStocks?.[0]?.tax;
              existingProduct.newStocks = [
                {
                  ...action?.payload?.newStocks?.[0],
                  remainingQuantity:
                    action?.payload?.newStocks?.[0]?.remainingQuantity - 1,
                },
              ];

              state.productToCart = productsTOCart?.map((productObj, index) =>
                productObj.newStocks?.[0]?.stockId ===
                existingProduct.newStocks?.[0]?.stockId
                  ? existingProduct
                  : { ...productObj, index }
              );
            } else {
              const newProduct = {
                ...action.payload,
                quantity: 1,
                // taxTotal: action.payload?.newStocks?.[0]?.tax,
                taxTotal:
                  action?.payload?.productType === 1 || action.payload?.isPacked
                    ? action?.payload?.newStocks?.[0]?.tax
                    : action?.payload?.newStocks?.[0]?.tax,
                retailPrice:
                  action?.payload?.productType === 1 || action.payload?.isPacked
                    ? action.payload?.newStocks?.[0]?.price
                    : priceToPercentageCalculation(
                        action.payload?.newStocks?.[0],
                        "retailPricePercentage"
                      ),
                productSubTotal:
                  action?.payload?.productType === 1 || action.payload?.isPacked
                    ? getSubTotalPackagePriceDiscount(
                        action.payload?.newStocks?.[0],
                        action.payload
                      )
                    : getSubTotalPriceDiscount(action.payload),
                operatorValue: action?.payload?.unit?.operatorValue,
                newStocks: action?.payload?.newStocks,
                unit: action?.payload?.unit,
                isPacked: action.payload?.isPacked,
                discount: Number(getDiscountPercentage(action.payload) || 0),
                index:
                  state.productToCart.length > 0
                    ? state.productToCart[state.productToCart.length - 1]
                        .index + 1
                    : 0,
              };
              const productIndex = state.productToCart.findIndex(
                (product) => product.index === action.payload.index
              );

              if (productIndex !== -1) {
                if (action.payload.isClickPlusBtn) {
                  state.productToCart[productIndex] = {
                    ...state.productToCart[productIndex],
                    quantity:
                      Number(state.productToCart[productIndex].quantity || 0) +
                      1,
                    productSubTotal:
                      action?.payload?.productType === 1 ||
                      action.payload?.isPacked
                        ? getSubTotalPackagePriceDiscount(
                            action.payload?.newStocks?.[0],
                            action.payload
                          )
                        : getSubTotalPriceDiscount({
                            ...JSON.parse(JSON.stringify(action.payload)),
                            quantity:
                              Number(
                                state.productToCart[productIndex].quantity || 0
                              ) + 1,
                          }),
                  };
                } else {
                  state.productToCart = [newProduct, ...state.productToCart];
                }
              } else {
                state.productToCart = [newProduct, ...state.productToCart];
              }
            }
          }
        } else if (action.payload?.type == 0) {
          let existingProduct = productsTOCart?.find(
            (product) =>
              product.newStocks?.[0]?.productId ===
              action.payload?.newStocks?.[0]?.productId
          );

          if (existingProduct) {
            if (action?.payload?.newStocks?.[0]?.remainingQuantity > 0) {
              existingProduct.quantity = Number(existingProduct.quantity) + 1;
            }
            existingProduct.productSubTotal =
              action?.payload?.type === 1 || existingProduct?.isPacked
                ? parseFloat(
                    existingProduct.quantity *
                      action?.payload?.newStocks?.[0]?.price
                  )
                : getSubTotalPriceDiscount(existingProduct);

            existingProduct.taxTotal = action?.payload?.newStocks?.[0]?.tax;
            // existingProduct.taxTotal = action?.payload?.newStocks?.[0]?.tax;
            existingProduct.newStocks = [
              {
                ...action?.payload?.newStocks?.[0],
                remainingQuantity:
                  existingProduct?.newStocks?.[0]?.remainingQuantity - 1,
              },
            ];

            // Update the cart with the modified product
            state.productToCart = productsTOCart?.map((productObj) =>
              productObj.newStocks?.[0]?.stockId ===
              existingProduct.newStocks?.[0]?.stockId
                ? existingProduct
                : productObj
            );
          } else {
            // If the product doesn't exist, add it as a new entry
            if (action.payload?.newStocks?.[0]?.remainingQuantity > 0) {
              const newProduct = {
                ...action.payload,
                quantity: 1,
                // taxTotal: action.payload?.newStocks?.[0]?.tax,
                taxTotal: action.payload?.newStocks?.[0]?.tax,
                retailPrice:
                  action?.payload?.productType === 1 || action.payload?.isPacked
                    ? action.payload?.newStocks?.[0]?.price
                    : priceToPercentageCalculation(
                        action.payload?.newStocks?.[0],
                        "retailPricePercentage"
                      ),
                productSubTotal:
                  action?.payload?.productType === 1 || action.payload?.isPacked
                    ? parseFloat(action.payload?.newStocks?.[0]?.price)
                    : getSubTotalPriceDiscount(action.payload),
                operatorValue: action?.payload?.unit.operatorValue,
                unit: action?.payload?.unit,
                isPacked: action.payload?.isPacked,
                discount: Number(getDiscountPercentage(action.payload) || 0),
                newStocks: [
                  {
                    ...action?.payload?.newStocks?.[0],
                    remainingQuantity:
                      action?.payload?.newStocks?.[0]?.remainingQuantity - 1,
                  },
                ],
              };

              // Add the new product to the cart
              state.productToCart = [newProduct, ...state.productToCart];
            }
          }
        }
      }
    },

    removeProductToPOSCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));

      const productIndex = productsTOCart.findIndex(
        (productObj, index) =>
          productObj.newStocks?.[0]?.stockId ===
            action.payload.newStocks?.[0]?.stockId &&
          action.payload.index === index
      );
      const product = productsTOCart[productIndex];
      if (product.quantity <= 1) {
        state.productToCart = productsTOCart.filter(
          (_, index) => index !== productIndex
        );
        return;
      } else {
        const updatedProduct = {
          ...product,
          quantity: product?.quantity - 1,
          retailPrice:
            action?.payload?.productType === 1 || product?.isPacked
              ? action.payload?.newStocks?.[0]?.price
              : priceToPercentageCalculation(
                  action.payload?.newStocks?.[0],
                  "retailPricePercentage"
                ),
          productSubTotal:
            action?.payload?.productType === 1 || product?.isPacked
              ? getSubTotalPackagePriceDiscount(
                  action.payload?.newStocks?.[0],
                  {
                    ...JSON.parse(JSON.stringify(action.payload)),
                    quantity: product?.quantity - 1,
                  }
                )
              : getSubTotalPriceMinusDiscount(product),
          // taxTotal: product?.newStocks?.[0]?.tax,
          taxTotal: product?.newStocks?.[0]?.tax || 0,
          operatorValue: product?.unit?.operatorValue || 0,
          newStocks: [
            {
              ...action?.payload?.newStocks?.[0],
              remainingQuantity:
                action?.payload?.newStocks?.[0]?.remainingQuantity + 1,
            },
          ],
        };

        // Update the product at the specific index
        productsTOCart[productIndex] = updatedProduct;
        state.productToCart = productsTOCart;
      }
    },
    enterProductToPOSCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      let product = productsTOCart?.find(
        (product) =>
          product.newStocks?.[0]?.stockId ===
            action.payload?.newStocks?.[0]?.stockId &&
          product?.index === action?.payload?.index
      );

      // if (
      //   action.payload?.newStocks?.[0]?.remainingQuantity >=
      //   Number(action?.payload?.value)
      // ) {
      product = {
        ...action.payload,
        ...product,
        quantity:
          product?.unit?.baseUnit === "psc"
            ? Math.round(action?.payload?.value)
            : action?.payload?.value,
        productSubTotal:
          action?.payload?.productType === 1 || product?.isPacked
            ? getSubTotalPackagePriceDiscount(
                action.payload?.newStocks?.[0],
                action.payload
              )
            : getSubTotalPriceDiscount(action.payload),
        //  parseFloat(
        //     action?.payload?.value * product?.newStocks?.[0]?.retailPrice
        //   ),
        // taxTotal: parseFloat(product?.newStocks?.[0]?.tax),
        taxTotal: action.payload?.newStocks?.[0]?.tax || 0,
        operatorValue: action?.payload?.operatorValue,
        // newStocks: action?.payload?.newStocks,
        newStocks: [
          {
            ...action?.payload?.newStocks?.[0],
            remainingQuantity:
              action.payload.value <= action?.payload?.totalQty &&
              Number(action.payload.value) === 0
                ? action.payload?.totalQty + Number(action.payload.quantity)
                : action.payload?.totalQty - Number(action.payload.value),
          },
        ],
      };

      state.productToCart = productsTOCart?.map((productObj, index) => {
        if (
          productObj.newStocks?.[0]?.stockId ===
            product.newStocks?.[0]?.stockId &&
          index === product.index
        ) {
          return product;
        } else {
          return productObj;
        }
      });
      // }
    },

    removeProductFromPOSCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      const product = productsTOCart?.filter(
        (productObj) =>
          productObj.newStocks?.[0]?.stockId !==
          action?.payload.newStocks?.[0]?.stockId
      );
      state.productToCart = [...product];
    },

    deleteProductFromPOSCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      const productIndex = productsTOCart.findIndex(
        (productObj, index) =>
          productObj.newStocks?.[0]?.stockId ===
            action.payload.newStocks?.[0]?.stockId &&
          action.payload.index === index
      );
      state.productToCart = productsTOCart.filter(
        (_, index) => index !== productIndex
      );
    },

    posOrderHistoryData: (state, action) => {
      state.posOrderHistoryInfo = action.payload;
    },

    posOrderPreviousHistoryData: (state, action) => {
      const onHoldProduct = JSON.parse(
        JSON.stringify(state.posOrderHistoryInfo)
      );
      state.posOrderHistoryInfo = {
        data: [...onHoldProduct.data, ...action.payload.data],
      };
    },

    posOrderHistoryUserProductData: (state, action) => {
      state.posUserProductDetails = action.payload;
    },

    posOrderViewHistoryUserProductData: (state, action) => {
      const onHoldProduct = JSON.parse(
        JSON.stringify(state.posUserHoldProductDetails)
      );
      onHoldProduct[action.payload.referenceId] = action.payload.data;
      state.posUserHoldProductDetails = onHoldProduct;
    },

    deleteProductFromOrderHistory: (state, action) => {
      const onHoldProduct = JSON.parse(
        JSON.stringify(state.posOrderHistoryInfo)
      );
      const product = onHoldProduct?.data?.filter(
        (productObj) => productObj?.referenceId !== action.payload?.referenceId
      );
      state.posOrderHistoryInfo = { data: product };
    },

    paymentMethod: (state, action) => {
      state.paymentMode = action.payload;
    },

    grandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },

    taxTotal: (state, action) => {
      state.productsTaxTotal = action.payload;
    },

    PosCustomerName: (state, action) => {
      state.customerId = action.payload;
    },

    paymentAddCashCount: (state, action) => {
      const cashToState = JSON.parse(
        JSON.stringify(state.paymentCashCountInfo)
      );
      let count = cashToState?.find(
        (product) => product.id === action.payload?.id
      );

      if (Array.isArray(action.payload)) {
        state.paymentCashCountInfo = action.payload;
      } else if (!count) {
        state.paymentCashCountInfo = [...cashToState, action.payload];
      } else {
        count = cashToState?.map((ele) => {
          if (ele?.cashPrice === action.payload.cashPrice) {
            return {
              ...action.payload,
              cashQuantity: ele?.cashQuantity + 1,
              cashTotal: (ele?.cashQuantity + 1) * action.payload.cashPrice,
            };
          } else {
            return ele;
          }
        });
        state.paymentCashCountInfo = count;
      }
    },

    paymentRemoveCashCount: (state, action) => {
      const cashToState = JSON.parse(
        JSON.stringify(state.paymentCashCountInfo)
      );
      let count = cashToState?.find(
        (product) => product.id === action.payload?.id
      );

      count = cashToState?.map((ele) => {
        if (ele?.cashPrice === action.payload.cashPrice) {
          return {
            ...action.payload,
            cashQuantity: ele?.cashQuantity - 1,
            cashTotal: (ele?.cashQuantity - 1) * action.payload.cashPrice,
          };
        } else {
          return ele;
        }
      });
      state.paymentCashCountInfo = count;
    },

    addPaymentCashInfo: (state, action) => {
      state.paymentCashCountInfo = action.payload;
    },

    paymentAddCentCount: (state, action) => {
      const cashToState = JSON.parse(
        JSON.stringify(state.paymentCashCentCountInfo)
      );
      let count = cashToState?.find(
        (product) => product.id === action.payload?.id
      );

      if (Array.isArray(action.payload)) {
        state.paymentCashCentCountInfo = action.payload;
      } else if (!count) {
        state.paymentCashCentCountInfo = [...cashToState, action.payload];
      } else {
        count = cashToState?.map((ele) => {
          if (ele?.centPrice === action.payload.centPrice) {
            return {
              ...action.payload,
              centQuantity: ele?.centQuantity + 1,
              centTotal: (ele?.centQuantity + 1) * action.payload.centPrice,
            };
          } else {
            return ele;
          }
        });
        state.paymentCashCentCountInfo = count;
      }
    },

    addPaymentCentInfo: (state, action) => {
      state.paymentCashCentCountInfo = action.payload;
    },

    paymentRemoveCentCount: (state, action) => {
      const cashToState = JSON.parse(
        JSON.stringify(state.paymentCashCentCountInfo)
      );
      let count = cashToState?.find(
        (product) => product.id === action.payload?.id
      );
      count = cashToState?.map((ele) => {
        if (ele?.centPrice === action.payload.centPrice) {
          return {
            ...action.payload,
            centQuantity: ele?.centQuantity - 1,
            centTotal: (ele?.centQuantity - 1) * action.payload.centPrice,
          };
        } else {
          return ele;
        }
      });
      state.paymentCashCentCountInfo = count;
    },

    paymentCashTotal: (state, action) => {
      state.paymentCashSubTotal = action.payload;
    },

    paymentBankTotal: (state, action) => {
      state.paymentBankSubTotal = action.payload;
    },

    bankDetailsInfo: (state, action) => {
      state.bankDetailsInfo = action.payload;
    },

    mixMatchDiscount: (state, action) => {
      const mixMatchData = action.payload?.mixMatch;
      const cartData = action.payload?.productToCart;

      // Filter mixMatchData to only include typeA offers
      const filteredMixMatchData = mixMatchData.filter(
        (data) => data.offerType === "typeA"
      );

      let mixMatchList = [];

      for (let i = 0; i < filteredMixMatchData.length; i++) {
        const productList = filteredMixMatchData[i]?.mixMatchProducts;
        let totalPrice = 0;
        let matchProductList = [];

        for (let j = 0; j < productList?.length; j++) {
          const product = productList[j]?.ProductModel;
          const isExist = cartData?.find(
            (item) => item?.productId === product?.productId
          );

          if (isExist) {
            matchProductList.push(isExist.quantity);
            totalPrice +=
              +isExist?.retailPrice *
              (1 + Number(isExist?.newStocks[0]?.tax) / 100);
          }
        }

        // Ensure all required products are in cart with correct quantity
        if (
          matchProductList.length === filteredMixMatchData[i]?.Qty &&
          matchProductList.length > 0
        ) {
          const mixMatchId = filteredMixMatchData[i]?.mixMatchId;

          // Apply mix-match discount - Override total price
          const discountedPrice =
            filteredMixMatchData[i]?.discountedTotalPrice || totalPrice;

          const payload = {
            count: Math.min(...matchProductList),
            mixMatch: filteredMixMatchData[i],
            totalPrice: discountedPrice, // Apply the discounted price here
            mixMatchId,
          };
          mixMatchList.push(payload);
        }
      }

      state.mixMatchDiscountList = [...mixMatchList];
    },

    bulkItemDiscount: (state, action) => {
      const mixMatchData = action.payload?.mixMatch;
      const cartData = action.payload?.productToCart;

      // Filter mixMatchData to only include typeB offers
      const filteredMixMatchData = mixMatchData.filter(
        (data) => data.offerType === "typeB"
      );

      // eslint-disable-next-line prefer-const
      let mixMatchList = [];

      for (let i = 0; i < filteredMixMatchData.length; i++) {
        const productList = filteredMixMatchData[i]?.mixMatchProducts;
        let totalPrice = 0;
        let matchProductList = [];
        for (let j = 0; j < productList?.length; j++) {
          const product = productList[j]?.ProductModel;
          const isExist = cartData?.find(
            (item) => item?.productId === product?.productId
          );
          if (isExist) {
            let currentDiscount = 0;
            if (isExist?.discountTables[0]) {
              const price = isExist?.newStocks?.[0]?.retailPrice;
              const currentDate = new Date();
              const { discountTables } = isExist;
              const discountTable = discountTables?.[0];
              let isDiscount = false;
              if (discountTable) {
                const { startDate, endDate } = discountTable;
                const start = new Date(startDate);
                const end = new Date(endDate);
                if (currentDate >= start && currentDate <= end) {
                  isDiscount = true;
                }
              }
              currentDiscount = +isDiscount
                ? +(isExist?.discountTables[0]?.discount / 100) * +price
                : 0;
            }
            matchProductList = [...matchProductList, isExist?.quantity];
            totalPrice += parseFloat(
              +isExist?.retailPrice *
                (1 + Number(isExist?.newStocks[0]?.tax) / 100)
            ).toFixed(2);
            totalPrice -= currentDiscount;
          }
        }
        if (
          matchProductList.length === filteredMixMatchData[i]?.Qty &&
          matchProductList.length > 0
        ) {
          const payload = {
            count:
              matchProductList?.length > 0 ? Math.min(...matchProductList) : 0,
            mixMatch: filteredMixMatchData[i],
            totalPrice,
            mixMatchId: filteredMixMatchData[i]?.mixMatchId,
          };
          mixMatchList.push(payload);
        }
      }

      for (let i = 0; i < cartData.length; i++) {
        for (let j = 0; j < filteredMixMatchData.length; j++) {
          const productList = filteredMixMatchData[j]?.mixMatchProducts;
          const productCartId = cartData[i]?.productId;
          const isExist = productList?.find(
            (item) => item?.productId === productCartId
          );
          if (
            cartData[i]?.quantity >= filteredMixMatchData[j]?.Qty &&
            isExist
          ) {
            const mixMatchId = filteredMixMatchData[j]?.mixMatchId;
            const mixMatchExist = mixMatchList?.find(
              (item) => item?.mixMatchId === mixMatchId
            );

            if (isEmpty(mixMatchExist)) {
              let currentDiscount = 0;
              const isExistProduct = cartData?.find(
                (item) => item?.productId === isExist?.productId
              );
              if (isExistProduct?.discountTables[0]) {
                const price = isExistProduct?.newStocks?.[0]?.retailPrice;
                const currentDate = new Date();
                const { discountTables } = isExistProduct;
                const discountTable = discountTables?.[0];
                let isDiscount = false;
                if (discountTable) {
                  const { startDate, endDate } = discountTable;
                  const start = new Date(startDate);
                  const end = new Date(endDate);
                  if (currentDate >= start && currentDate <= end) {
                    isDiscount = true;
                  }
                }
                currentDiscount = +isDiscount
                  ? +(isExistProduct?.discountTables[0]?.discount / 100) *
                    +price *
                    +filteredMixMatchData[j]?.Qty
                  : 0;
              }
              const count = Math.floor(
                cartData[i]?.quantity / filteredMixMatchData[j]?.Qty
              );
              const totalPrice = parseFloat(
                +cartData[i]?.retailPrice *
                  (1 + Number(cartData[i]?.newStocks[0]?.tax) / 100) *
                  +filteredMixMatchData[j]?.Qty -
                  currentDiscount
              ).toFixed(2);
              const payload = {
                count,
                mixMatch: filteredMixMatchData[j],
                totalPrice,
                mixMatchId: filteredMixMatchData[i]?.mixMatchId,
              };
              mixMatchList.push(payload);
            } else {
              for (let k = 0; k < filteredMixMatchData[j]?.Qty; k++) {
                const isExistProduct = cartData?.find(
                  (item) =>
                    item?.productId ===
                    filteredMixMatchData[j]?.mixMatchProducts[k]?.productId
                );
                if (isExistProduct?.quantity > mixMatchExist?.count) {
                  const quantityData =
                    (isExistProduct?.quantity - mixMatchExist?.count) /
                    filteredMixMatchData[j]?.Qty;
                  let currentDiscount = 0;
                  if (isExistProduct?.discountTables[0]) {
                    const price = isExistProduct?.newStocks?.[0]?.retailPrice;
                    const currentDate = new Date();
                    const { discountTables } = isExistProduct;
                    const discountTable = discountTables?.[0];
                    let isDiscount = false;
                    if (discountTable) {
                      const { startDate, endDate } = discountTable;
                      const start = new Date(startDate);
                      const end = new Date(endDate);
                      if (currentDate >= start && currentDate <= end) {
                        isDiscount = true;
                      }
                    }
                    currentDiscount = +isDiscount
                      ? +(isExistProduct?.discountTables[0]?.discount / 100) *
                        +price *
                        +filteredMixMatchData[j]?.Qty
                      : 0;
                  }
                  const totalPrice = parseFloat(
                    +isExistProduct?.retailPrice *
                      (1 + Number(isExistProduct?.newStocks[0]?.tax) / 100) *
                      +filteredMixMatchData[j]?.Qty -
                      currentDiscount
                  ).toFixed(2);
                  const payload = {
                    count: Math.floor(quantityData),
                    mixMatch: filteredMixMatchData[j],
                    totalPrice,
                    mixMatchId: filteredMixMatchData[j]?.mixMatchId,
                  };
                  mixMatchList.push(payload);
                }
              }
            }
          }
        }
      }
      // eslint-disable-next-line prefer-const
      let result = [...state.mixMatchDiscountList];

      for (let i = 0; i < mixMatchList?.length; i++) {
        const isCheck = result?.find(
          (e) => e?.totalPrice === mixMatchList[i]?.totalPrice
        );
        if (!isCheck) {
          result.push(mixMatchList[i]);
        }
      }
      state.mixMatchDiscountList = [...result];
    },

    afterPayment: (state, action) => {
      state.mixMatchDiscountList = action.payload;
    },

    mixMatchDiscountTotal: (state, action) => {
      state.mixMatchDiscountTotal = action.payload;
    },
    keyboardToggle: (state, action) => {
      state.keyboardToggle = action.payload;
    },
    isShowLeftKeyboard: (state, action) => {
      state.isOnScreenLeftKeyboard = action.payload;
    },
    isShowRightKeyboard: (state, action) => {
      state.isOnScreenRightKeyboard = action.payload;
    },
    isShowRefKeyboard: (state, action) => {
      state.isOnScreenRefKeyboard = action.payload;
    },
    isShowDropKeyboard: (state, action) => {
      state.isOnScreenDropKeyboard = action.payload;
    },
    isShowRefDropKeyboard: (state, action) => {
      state.isOnScreenRefDropKeyboard = action.payload;
    },
  },
});

export const posAction = posReducer.actions;
export const posSelector = (state) => state.pos;
export default posReducer.reducer;
