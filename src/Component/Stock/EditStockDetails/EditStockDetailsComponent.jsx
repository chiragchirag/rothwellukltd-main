import { Col } from "antd";
import React, { useMemo } from "react";
import { FormFieldsComponent } from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";

const EditStockDetailsComponent = ({
  formFieldData,
  handleChange,
  handleBlur,
  handleSelectChange,
  editStockDetails,
  editStockErrors,
  systemSettingDetails,
  unitsData,
}) => {
  const packageUnit = useMemo(() => {
    return unitsData?.find(
      (ele) =>
        ele?.unitId === editStockDetails?.VegAndFruitsPackage?.packageUnitId
    );
  }, [unitsData]);
  return (
    <React.Fragment>
      {Object.keys(formFieldData)?.map((fieldName) => {
        const {
          label,
          name,
          type,
          placeholder,
          validation,
          options,
          format,
          disabled,
        } = formFieldData[fieldName];
        return (
          <Col
            key={name}
            span={24}
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            className="edit-stock-input"
          >
            <FormFieldsComponent
              {...{
                type,
                name,
                placeholder,
                label,
                handleChange,
                handleBlur,
                handleSelectChange,
                format,
                error: editStockErrors[name],
                options,
                disabled: name === "stockAdded" ? true : disabled,
                value:
                  name === "packetName"
                    ? editStockDetails?.VegAndFruitsPackage?.packetName
                    : name === "packageWeight"
                      ? editStockDetails?.VegAndFruitsPackage?.packageWeight
                      : name === "packageUnit"
                        ? packageUnit?.shortName
                        : isEmpty(editStockDetails[name])
                          ? ""
                          : editStockDetails[name],
                ...(validation?.maxLength && {
                  maxLength: validation?.maxLength,
                  systemSettingDetails,
                }),
              }}
            />
          </Col>
        );
      })}
    </React.Fragment>
  );
};

export default EditStockDetailsComponent;
