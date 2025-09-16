import React, { useMemo } from "react";
import { Col, Row } from "antd";
import ReactApexChart from "react-apexcharts";
import "../dashboard.scss";
import {
  FormFieldsComponent,
  LottieImage,
  TableContainer,
} from "../../../CommonComponent";
import {
  DASHBOARD_STOCK_ALERT,
  DASHBOARD_LEAST_SELLING_PRODUCT,
} from "../../../Constant/TableConst";
import { loader, noDataFound } from "../../../assest";

const SalesProductView = (props) => {
  const {
    isLoading,
    fromFields,
    sellingProducts,
    series,
    productLabels,
    customerSeries,
    customerProductLabels,
    handleSelectChange,
    customerData,
    saleTotal,
    saleSeries,
    totalStockAlert,
    systemSettingDetails,
    isStockAlertLoading,
    handleSelectCustomerChange,
    handleSelectSaleChange,
    handleSelectLeastChange,
    leastPayload,
    topLeastSellingWholeSaleProduct,
    topLeastSellingRetailProduct,
    leastSellingProductsLoading,
    isCustomerChartLoading,
  } = props;
  const options = {
    chart: {
      width: 380,
      type: "polarArea",
    },
    fill: {
      opacity: 1,
      colors: ["#B142E1", "#EA5BE6", "#702CB2", "#7E32C4", "#ff7183"],
    },
    tooltips: {
      style: {
        fontSize: "0.75rem",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#B142E1", "#EA5BE6", "#702CB2", "#7E32C4", "#ff7183"],
    },
    markers: {
      colors: ["#B142E1", "#EA5BE6", "#702CB2", "#7E32C4", "#ff7183"],
      discrete: [
        {
          fillColor: ["#000"],
        },
      ],
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
      markers: {
        fillColors: [
          "#B142E1",
          "#EA5BE6",
          "#702CB2",
          "#7E32C4",
          "#ff7183",
          "#B142E1",
          "#EA5BE6",
          "#702CB2",
          "#7E32C4",
          "#ff7183",
        ],
        shape: "square",
        width: 16,
        height: 16,
        radius: 2,
      },
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 0.6,
      },
    },
  };

  const radialBarOptions = useMemo(() => {
    return {
      chart: {
        height: 350,
        type: "radialBar",
      },
      labels: ["Weekly", "Monthly", "Yearly"],
      fill: {
        opacity: 1,
        type: "gradient",
        colors: ["#5c66ec", "#0074fa", "#fc533e"],
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.4,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [2, 100],
        },
      },
      legend: {
        show: true,
        position: "bottom",
        markers: {
          fillColors: ["#5c66ec", "#0074fa", "#fc533e"],
          width: 16,
          height: 16,
          radius: 2,
        },
      },
      stroke: {
        width: 1,
        colors: undefined,
        lineCap: "round",
      },
      yaxis: {
        show: false,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "1.375rem",
            },
            value: {
              fontSize: "1rem",
              formatter: function (val) {
                // Return an empty string to remove the percentage
                return `${val}`;
              },
            },
          },
          markers: {
            show: true,
          },
        },
      },

      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    };
  }, [systemSettingDetails]);

  return (
    <React.Fragment>
      <Row gutter={[20, 20]} className="sales-product-main">
        <Col
          span={24}
          xxl={9}
          xl={9}
          lg={10}
          md={24}
          sm={24}
          className="order-class"
        >
          <div className="pie-chart">
            <h1 className="pie-chart-title">
              Top Selling Products {new Date().getFullYear()}
            </h1>
            <Row gutter={[16]}>
              {Object.keys(fromFields).map((ele) => {
                const { name, type, options, label } = fromFields[ele];
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
                        label,
                        value: sellingProducts[name],
                        handleSelectChange,
                        handleBlur: () => {},
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
            {!isLoading ? (
              productLabels?.length > 0 && series?.length > 0 ? (
                <ReactApexChart
                  options={{ ...options, labels: productLabels }}
                  series={series}
                  type="polarArea"
                  height={390}
                  width={
                    window.innerWidth < 390
                      ? 240
                      : window.innerWidth < 768
                        ? "100%"
                        : window.innerWidth < 992
                          ? "93%"
                          : window.innerWidth < 1300
                            ? 330
                            : window.innerWidth < 1440
                              ? 380
                              : "100%"
                  }
                  className="pie-chart-main"
                />
              ) : (
                <div className="no-data-main">
                  <LottieImage
                    lottieImage={noDataFound}
                    lottieText={"No Data Found"}
                    divClassName={"page-not-found-main"}
                    textClassName={"not-found-text"}
                    imageClassName={"page-not-found-icon"}
                  />
                </div>
              )
            ) : (
              <LottieImage lottieImage={loader} imageClassName="loader" />
            )}
          </div>
        </Col>
        <Col
          span={24}
          xxl={15}
          xl={15}
          lg={14}
          md={24}
          sm={24}
          className="order-class"
        >
          <div className="wholesales-product">
            <h1>Least Selling product</h1>
            <Row gutter={[16]}>
              {Object.keys(fromFields)
                .slice(0, 2)
                .map((ele) => {
                  const { name, type, options, label } = fromFields[ele];
                  return (
                    <Col
                      span={12}
                      xl={8}
                      xxl={8}
                      lg={8}
                      md={8}
                      sm={12}
                      key={name}
                      className="chart-option"
                    >
                      <FormFieldsComponent
                        {...{
                          name,
                          type,
                          options,
                          label,
                          value: leastPayload[name],
                          handleSelectChange: handleSelectLeastChange,
                          handleBlur: () => {},
                        }}
                      />
                    </Col>
                  );
                })}
            </Row>
            <TableContainer
              {...{
                loading: leastSellingProductsLoading,
                tableTitle: ``,
                dataSource:
                  leastPayload?.transactionType === "0"
                    ? topLeastSellingRetailProduct
                    : topLeastSellingWholeSaleProduct,
                column: DASHBOARD_LEAST_SELLING_PRODUCT,
                // setShowSuggestionList: () => {},
              }}
              classNames={"wholesales-table"}
            />
          </div>
        </Col>
        <Col
          span={24}
          xxl={8}
          xl={8}
          lg={12}
          md={24}
          sm={24}
          className="order-class"
        >
          <div className="chart-main">
            <h1 className="sales-chart-title">
              Top {customerData?.topProductNumber} Customer
            </h1>
            <Row gutter={[16]}>
              {Object.keys(fromFields).map((ele) => {
                const { name, type, options, label } = fromFields[ele];
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
                        label,
                        value: customerData[name],
                        handleSelectChange: handleSelectCustomerChange,
                        handleBlur: () => {},
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
            {isCustomerChartLoading ? (
              <LottieImage lottieImage={loader} imageClassName="loader" />
            ) : customerProductLabels?.length > 0 &&
              customerSeries?.length > 0 ? (
              <ReactApexChart
                options={{ ...options, labels: customerProductLabels }}
                series={customerSeries}
                type="donut"
                height={
                  window.innerWidth < 390
                    ? 280
                    : window.innerWidth < 768
                      ? 300
                      : window.innerWidth < 992
                        ? 400
                        : "80%"
                }
                width={
                  window.innerWidth < 390
                    ? 240
                    : window.innerWidth < 768
                      ? "100%"
                      : window.innerWidth < 992
                        ? "93%"
                        : window.innerWidth < 1300
                          ? "100%"
                          : window.innerWidth < 1440
                            ? 336
                            : "100%"
                }
              />
            ) : (
              <div className="no-data-main">
                <LottieImage
                  lottieImage={noDataFound}
                  lottieText={"No Data Found"}
                  divClassName={"page-not-found-main"}
                  textClassName={"not-found-text"}
                  imageClassName={"page-not-found-icon"}
                />
              </div>
            )}
          </div>
        </Col>
        <Col
          span={24}
          xxl={9}
          xl={9}
          lg={24}
          md={24}
          sm={24}
          className="stock-table-main order-class"
        >
          <TableContainer
            {...{
              loading: isStockAlertLoading,
              tableTitle: "Stock Alert",
              dataSource: totalStockAlert,
              column: DASHBOARD_STOCK_ALERT,
              // setShowSuggestionList: () => {},
            }}
            classNames={"stock-table"}
          />
        </Col>
        <Col
          span={24}
          xxl={7}
          xl={7}
          lg={12}
          md={24}
          sm={24}
          className="order-class"
        >
          <div className="sales-main">
            <h1>Sales</h1>
            <Row gutter={[16]}>
              {Object.keys(fromFields)
                .slice(0, 1)
                .map((ele) => {
                  const { name, type, options, label } = fromFields[ele];
                  return (
                    <Col
                      span={16}
                      xl={16}
                      xxl={16}
                      lg={16}
                      md={16}
                      sm={16}
                      key={name}
                      className="chart-option"
                    >
                      <FormFieldsComponent
                        {...{
                          name,
                          type,
                          options,
                          label,
                          value: saleTotal[name],
                          handleSelectChange: handleSelectSaleChange,
                          handleBlur: () => {},
                        }}
                      />
                    </Col>
                  );
                })}
            </Row>
            <ReactApexChart
              options={radialBarOptions}
              series={saleSeries}
              type="radialBar"
              width={
                window.innerWidth < 390
                  ? 240
                  : window.innerWidth < 768
                    ? "100%"
                    : window.innerWidth < 992
                      ? "93%"
                      : window.innerWidth < 1300
                        ? "100%"
                        : window.innerWidth < 1440
                          ? 300
                          : "100%"
              }
              height={
                window.innerWidth < 768
                  ? 250
                  : window.innerWidth < 992
                    ? 300
                    : window.innerWidth < 1200
                      ? 300
                      : "70%"
              }
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SalesProductView;
