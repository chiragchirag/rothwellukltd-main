// import React from "react";
// import {
//   DASHBOARD_RECENT_INVOICES,
//   DASHBOARD_RECENT_INVOICES_DATA,
// } from "../../../Constant/TableConst";
// import ReactApexChart from "react-apexcharts";
// import {  Row } from "antd";
// import { TableContainer } from "../../../CommonComponent";

// const RecentInvoicesView = () => {

  // const lineSeries = [
  //   {
  //     name: "Payment Sent",
  //     data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  //   },
  //   {
  //     name: "Payment Sent Pr Session",
  //     data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  //   },
  // ];
  // const lineOptions = {
  //   chart: {
  //     height: 200,
  //     type: "line",
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   fill: {
  //     colors: ["#5769e8", "#c4cfd6"],
  //   },
  //   stroke: {
  //     width: [2, 2],
  //     curve: "smooth",
  //     dashArray: [0, 8],
  //     colors: ["#5769e8", "#c4cfd6"],
  //   },
  //   legend: {
  //     tooltipHoverFormatter: (val, opts) =>
  //       `${val} - **${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}**`,
  //     markers: {
  //       fillColors: ["#5769e8", "#c4cfd6"],
  //       shape: "square",
  //       width: 16,
  //       height: 16,
  //       radius: 2,
  //     },
  //     show: false,
  //   },
  //   xaxis: {
  //     categories: [
  //       "01K",
  //       "02K",
  //       "03K",
  //       "04K",
  //       "05K",
  //       "06K",
  //       "07K",
  //       "08K",
  //       "09K",
  //       "10K",
  //       "11K",
  //       "12K",
  //     ],
  //   },
  //   tooltip: {
  //     y: [
  //       {
  //         title: {
  //           formatter: (val) => `${val} (mins)`,
  //         },
  //       },
  //       {
  //         title: {
  //           formatter: (val) => `${val} per session`,
  //         },
  //       },
  //     ],
  //   },
  //   grid: {
  //     borderColor: "#f1f1f1",
  //   },
  // };
  // return (
  //   <div className="stock-sales-main">
      {/* <DIV gutter={[20, 20]} className="sales-Payment-main"> */}
        {/* <Col span={24} xxl={11} xl={11} lg={11} md={24} sm={24}>
          <div className="sales-main">
            <h1>Sales Target</h1>
            <ReactApexChart
              options={radialBarOptions}
              series={radialBarSeries}
              type="radialBar"
              width={
                window.innerWidth < 390
                  ? 240
                  : window.innerWidth < 768
                    ? "100%"
                    : window.innerWidth < 992
                      ? "93%"
                      : window.innerWidth < 1300
                        ? 330
                        : 450
              }
              height={
                window.innerWidth < 768
                  ? 250
                  : window.innerWidth < 992
                    ? 300
                    : "90%"
              }
            />
          </div>
        </Col> */}
        {/* <Col span={24} xxl={13} xl={13} lg={13} md={24} sm={24}>
          <div className="Payment-main">
            <h1>Payment Sent & Received(Last 5 Days)</h1>
            <ReactApexChart
              options={lineOptions}
              series={lineSeries}
              type="line"
              height={
                window.innerWidth < 376
                  ? "95%"
                  : window.innerWidth < 575
                    ? 280
                    : window.innerWidth < 768
                      ? 300
                      : window.innerWidth < 992
                        ? 300
                        : "95%"
              }
              width={
                window.innerWidth < 376
                  ? 240
                  : window.innerWidth < 575
                    ? 330
                    : window.innerWidth < 768
                      ? 490
                      : window.innerWidth < 992
                        ? "100%"
                        : "100%"
              }
              className="Payment-chart"
            />
          </div>
        </Col> */}
    
      {/* <TableContainer
        {...{
          tableTitle: "Stock Alert",
          dataSource: DASHBOARD_RECENT_INVOICES_DATA,
          column: DASHBOARD_RECENT_INVOICES,
        }}
        classNames={"stocks-table"}
      /> */}
//     </div>
//   );
// };

// export default RecentInvoicesView;
