import React, { useMemo } from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
} from "../../../CommonComponent";
import { loader } from "../../../assest";
import { Row, Col, Collapse } from "antd";
import { capitalizeFirstLetter, isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";

const PackageInputDetails = ({
  ele,
  i,
  packageStockValues,
  newStockInfo,
  barcodeId,
  systemSettingDetails,
  packageStockErrors,
  handleChange,
  handleBlur,
  handleSelectChange,
  disabledPreviousDate,
}) => {
  return Object.keys(ele)?.map((fieldName) => {
    const {
      label,
      name,
      type,
      placeholder,
      validation,
      options,
      defaultValue,
      disabled,
      format,
    } = ele[fieldName];
    return (
      <Col key={name} span={24} xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
        <FormFieldsComponent
          {...{
            type,
            name,
            placeholder,
            label,
            format,
            disabledDate: disabledPreviousDate,
            error: packageStockErrors[i][name],
            value: isEmpty(packageStockValues[i][name])
              ? ""
              : packageStockValues[i][name],
            defaultValue,
            options,
            handleChange: (e) => handleChange(e, type, name, i, ele),
            handleBlur: () => handleBlur(name, i, packageStockValues[i][name]),
            handleSelectChange: (e) => handleSelectChange(e, name, i, ele),
            ...(validation?.maxLength && {
              maxLength: validation?.maxLength,
            }),
            disabled: disabled
              ? disabled
              : barcodeId
                ? newStockInfo?.newStocks?.length <= 0 &&
                  newStockInfo?.productType === 0
                  ? true
                  : false
                : true,
          }}
          systemSettingDetails={systemSettingDetails}
          inputClass={"Package-product-details-input"}
          inputMain="Package-product-details-input-main"
          SelectClassNames={"Package-product-details-dropdown"}
        />
      </Col>
    );
  });
};

const PackageDetailsView = ({
  newStockInfo,
  isStatusInput,
  barcodeId,
  systemSettingDetails,
  packageStockErrors,
  handleChange,
  handleBlur,
  packageStockValues,
  packageStockPriceValuesArr,
  handleSelectChange,
  handleStockSubmit,
  isStockPending,
  disabledPreviousDate,
  packageStockIndex,
}) => {
  const vegFruitPackagePriceValuesList = useMemo(() => {
    return packageStockPriceValuesArr?.map((ele, i) => {
      return {
        key: i + 1,
        label: capitalizeFirstLetter(packageStockValues?.[i]?.packetName),
        children: (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            <Row gutter={[20, 0]} className="Package-product-details">
              {isStatusInput ? (
                <LottieImage
                  lottieImage={loader}
                  lottieText={""}
                  imageClassName={"loader-icon"}
                />
              ) : (
                <PackageInputDetails
                  {...{
                    ele,
                    i,
                    packageStockValues,
                    newStockInfo,
                    barcodeId,
                    systemSettingDetails,
                    packageStockErrors,
                    handleChange,
                    handleBlur,
                    handleSelectChange,
                    disabledPreviousDate,
                  }}
                />
              )}
            </Row>
            <ButtonComponent
              btnClass={"edit-product-details-btn"}
              btnName={
                packageStockIndex === i && isStockPending ? (
                  <LoadingOutlined />
                ) : (
                  "Save"
                )
              }
              btnType={"button"}
              handleClick={() => handleStockSubmit(i)}
              btnDisabled={
                newStockInfo?.newStocks?.length <= 0 &&
                newStockInfo?.productType === 0
                  ? true
                  : isStockPending
                    ? true
                    : false
              }
            />
          </React.Fragment>
        ),
      };
    });
  }, [packageStockPriceValuesArr, packageStockValues, packageStockErrors]);

  return (
    <div className="Package-details-main">
      <h1 className="Package-details-title">
        Add Stock For Package{" "}
        {newStockInfo?.newStocks?.length <= 0 &&
          newStockInfo?.productType == "0" && (
            <span>(Add stock for loose item first)</span>
          )}
      </h1>
      <Collapse
        items={vegFruitPackagePriceValuesList}
        defaultActiveKey={["1"]}
      />
    </div>
  );
};

export default PackageDetailsView;
