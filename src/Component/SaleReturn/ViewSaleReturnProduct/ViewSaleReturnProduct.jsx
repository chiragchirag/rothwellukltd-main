import React from "react";
import { useSelector } from "react-redux";
import { saleReturnSelector } from "../../../Redux/Reducers/SaleReturnReducer/SaleReturnReducer";
import { TableContainer } from "../../../CommonComponent";
import { EXPENSES_DETAILS_LIST_COLUMN } from "../../../Constant/TableConst";
import { Tabs } from "antd";
import { SALE_RETURN_TAB_LIST } from "../../../Constant/non-primitive";

const ViewSaleReturnProduct = () => {
  const { viewSaleReturnData } = useSelector(saleReturnSelector);
  const items = SALE_RETURN_TAB_LIST?.map((ele, index) => {
    return {
      key: index + 1,
      label: ele,
      children: (
        <TableContainer
          {...{
            column: EXPENSES_DETAILS_LIST_COLUMN(ele),
            dataSource: viewSaleReturnData?.returntables || [],
            // setShowSuggestionList: () => {},
          }}
          classNames="modal-table-main"
        />
      ),
    };
  });
  return (
    <React.Fragment>
      <Tabs items={items} defaultActiveKey={1} className="sales-table"/>
    </React.Fragment>
  );
};

export default ViewSaleReturnProduct;
