import React from "react";
// import {
//   DASHBOARD_STOCK_ALERT,
//   DASHBOARD_STOCK_ALERT_DATA,
// } from "../../../Constant/TableConst";
// import ReactApexChart from "react-apexcharts";
// import ReactApexChart from "react-apexcharts";
// import { Row } from "antd";
// import { TableContainer } from "../../../CommonComponent";

const StockCustomerView = () => {
  // const {
  //   fromFields,
  //   customerData,
  //   series,
  //   productLabels,
  //   handleSelectChange,
  // } = props;
  // const options = {
  //   chart: {
  //     type: "donut", // Ensure responsive width using a percentage
  //   },

  // responsive: [
  //   {
  //     breakpoint: 480,
  //     options: {
  //       legend: {
  //         position: "bottom",
  //       },
  //     },
  //   },
  // ],
  // fill: { colors: ["#7f26c6", "#babcef", "#4848e0", "#feb044", "#ff4d66"] },
  // stroke: {
  //   colors: ["#7f26c6", "#babcef", "#4848e0", "#feb044", "#ff4d66"],
  // },
  // legend: {
  //   position: "bottom",
  //   markers: {
  //     fillColors: ["#7f26c6", "#babcef", "#4848e0", "#feb044", "#ff4d66"],
  //     shape: "square",
  //     width: 16,
  //     height: 16,
  //     radius: 2,
  //   },
  // },
  // };
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

  // const barSeries = [
  //   {
  //     name: "Net Profit",
  //     data: [44, 55, 57, 56, 61, 58, 63],
  //   },
  //   {
  //     name: "Revenue",
  //     data: [76, 85, 101, 98, 87, 105, 91],
  //   },
  // ];
  // const barOptions = {
  //   chart: {
  //     type: "bar",
  //     height: 350,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "55%",
  //       endingShape: "rounded",
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   legend: {
  //     markers: {
  //       fillColors: ["#4F46E5", "#BBBCF1"],
  //       shape: "square",
  //       width: 16,
  //       height: 16,
  //       radius: 2,
  //     },
  //     position: "top",
  //     horizontalAlign: "right",
  //   },
  //   xaxis: {
  //     categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   yaxis: {
  //     title: {
  //       text: "$ (thousands)",
  //     },
  //   },
  //   fill: {
  //     opacity: 1,
  //     colors: ["#4F46E5", "#BBBCF1"],
  //   },
  //   // tooltip: {
  //   //   y: {
  //   //     formatter: (val) => {
  //   //       return "$" + val + "thousands";
  //   //     },
  //   //   },
  //   // },
  // };
  return (
    <React.Fragment>
      {/* <Row gutter={[20, 20]} className="table-chart-wrap"> */}
      {/* <Col span={24} xxl={12} xl={12} lg={12} md={24} sm={24}>
          <TableContainer
            {...{
              tableTitle: "Stock Alert",
              dataSource: DASHBOARD_STOCK_ALERT_DATA,
              column: DASHBOARD_STOCK_ALERT,
            }}
            classNames={"stock-table"}
          />
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24} sm={24}>
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
      {/* <Col span={24} xxl={10} xl={10} lg={10} md={24} sm={24}>
          <div className="chart-main">
            <h1 className="sales-chart-title">Top 05 Customer</h1>
            <Row gutter={[20]}>

            {Object.keys(fromFields).map((ele) => {
              const { name, type, options } = fromFields[ele];
              return (
                <Col
                    span={8}
                    xl={8}
                    xxl={8}
                    lg={8}
                    md={8}
                    sm={8}
                    key={name}
                    className="chart-option"
                  >
                  <FormFieldsComponent
                    {...{
                      name,
                      type,
                      options,
                      value: customerData[name],
                      handleSelectChange,
                      handleBlur: () => {},
                    }}
                  />
                </Col>
              );
            })}
            </Row>
            <ReactApexChart
              options={{ ...options, labels: productLabels }}
              series={series}
              type="donut"
              height={
                window.innerWidth < 390
                  ? 280
                  : window.innerWidth < 768
                    ? 300
                    : window.innerWidth < 992
                      ? 400
                      : "90%"
              }
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
            />
          </div>
        </Col> */}
      {/* </Row> */}{" "}
      {/* <Col span={24} xxl={13} xl={13} lg={13} md={24} sm={24}>
          <div className="sales-chart">
            <h1 className="sales-chart-title">This Weeks Sales & Purchases</h1>
            <ReactApexChart
              series={barSeries}
              options={barOptions}
              type="bar"
              height={
                window.innerWidth < 376
                  ? "100%"
                  : window.innerWidth < 575
                    ? 280
                    : window.innerWidth < 768
                      ? 300
                      : window.innerWidth < 992
                        ? 300
                        : "90%"
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
              className="sales-chart-titles"
            />
          </div>
        </Col> */}
    </React.Fragment>
  );
};

export default StockCustomerView;
