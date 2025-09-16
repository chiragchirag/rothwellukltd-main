import React from "react";
import CardsContainer from "./Cards/CardsContainer";
import SalesProductContainer from "./Sales-Product/SalesProductContainer";
import StockCustomerContainer from "./Stock-Customer/StockCustomerContainer";
// import RecentInvoicesContainer from "./Recent-Invoices/RecentInvoicesContainer";
import RecentSalesContainer from "./Recent-Sales/RecentSalesContainer";
import "../Dashboard/dashboard.scss";

const DashboardView = () => {
  return (
    <div className="dashboard-cards-wrap">
      <CardsContainer />
      <SalesProductContainer />
      <StockCustomerContainer />
      {/* <RecentInvoicesContainer /> */}
      <RecentSalesContainer />
    </div>
  );
};

export default DashboardView;
