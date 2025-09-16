import { createSlice } from "@reduxjs/toolkit";
import peopleInitialState from "../../InitialState/peopleInitialState.json";
import { createReducersAutomatically } from "../../../Utils";

const PeopleReducer = createSlice({
  name: "People",
  initialState: peopleInitialState,
  reducers: {
    ...createReducersAutomatically(peopleInitialState),
    customerList: (state, action) => {
      const sortedData = action.payload?.sort((a, b) => {
        return a?.customerName?.localeCompare(b?.customerName);
      });
      state.customerData = sortedData;
    },
    addCustomerList: (state, action) => {
      const allCustomer = JSON.parse(JSON.stringify(state.customerData));
      allCustomer?.unshift(action?.payload);
      const sortedData = allCustomer?.sort((a, b) => {
        return a?.customerName?.localeCompare(b?.customerName);
      });
      state.customerData = sortedData;
    },
    updateCustomerList: (state, action) => {
      let allCustomer = JSON.parse(JSON.stringify(state.customerData));
      allCustomer = allCustomer?.map((ele) => {
        if (ele?.customerId === action.payload.customerId) {
          return {
            ...ele,
            ...action.payload,
          };
        } else {
          return ele;
        }
      });
      state.customerData = allCustomer;
    },
    deleteCustomerFromList: (state, action) => {
      let allCustomer = JSON.parse(JSON.stringify(state.customerData));
      allCustomer = allCustomer?.filter(
        (ele) => ele?.customerId !== action?.payload
      );
      state.customerData = allCustomer;
    },
    addSupplierList: (state, action) => {
      const allSupplier = JSON.parse(JSON.stringify(state.supplierData));
      allSupplier?.unshift(action?.payload);
      state.supplierData = allSupplier;
    },
    updateSupplierList: (state, action) => {
      let allSupplier = JSON.parse(JSON.stringify(state.supplierData));
      allSupplier = allSupplier?.map((ele) => {
        if (ele?.supplierId === action.payload.supplierId) {
          return {
            ...ele,
            ...action.payload,
          };
        } else {
          return ele;
        }
      });
      state.supplierData = allSupplier;
    },
    deleteSupplierFromList: (state, action) => {
      let allSupplier = JSON.parse(JSON.stringify(state.supplierData));
      allSupplier = allSupplier?.filter(
        (ele) => ele?.supplierId !== action?.payload
      );
      state.supplierData = allSupplier;
    },
    updateUserList: (state, action) => {
      let allUser = JSON.parse(JSON.stringify(state.userDetail));
      allUser = allUser?.map((userObj) => {
        if (userObj?.userId === action.payload.userId) {
          return {
            ...userObj,
            ...action.payload,
          };
        } else {
          return userObj;
        }
      });
      state.userDetail = allUser;
    },
    addUserList: (state, action) => {
      const allUser = JSON.parse(JSON.stringify(state.userDetail));
      allUser.unshift(action?.payload);
      state.userDetail = allUser;
    },
    addTillList: (state, action) => {
      const tillList = JSON.parse(JSON.stringify(state.tillListData));
      tillList?.unshift(action.payload);
      state.tillListData = tillList;
    },
    deleteTillList: (state, action) => {
      let tillList = JSON.parse(JSON.stringify(state.tillListData));
      tillList = tillList?.filter((ele) => ele?.tillId !== action?.payload);
      state.tillListData = tillList;
    },
    resetPeopleState: (state) => {
      state.currentPage = 1;
      state.limit = 20;
      state.total = 0;
    },
  },
});

export const { customerList } = PeopleReducer.actions;
export const peopleAction = PeopleReducer.actions;
export const peopleSelector = (state) => state.People;
export default PeopleReducer.reducer;
