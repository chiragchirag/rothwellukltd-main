import React from "react";
import { ButtonComponent, FormFieldsComponent } from "../../CommonComponent";
import { Col, Row } from "antd";

const VegetableFruitPacketDetails = (props) => {
  const {
    productData,
    formValuesForPacket,
    formFields,
    isEdit,
    isSubmitDiscountLoading,
    handleSubmit,
    checkButtonDisabled,
    handleDiscountTypeChange,
    handleChange,
    packetId,
    setPacketId,
    discountType,
    disabledPreviousDate,
  } = props;

  const options = productData?.VegAndFruitsPackages.map((res) => {
    return {
      label: res?.packetName,
      value: res.VegAndFruitsPackageId,
    };
  });
  const getDisabledDate = (name) => {
    if (name === "startDate") {
      return (current) =>
        disabledPreviousDate(current, null, formValuesForPacket.endDate);
    }
    if (name === "endDate") {
      return (current) =>
        disabledPreviousDate(current, formValuesForPacket.startDate, null);
    }
    return (current) => disabledPreviousDate(current, null, null);
  };

  return (
    <div>
      <h4 className="discount-details-title">
        {isEdit ? "Update" : "Add"} discount for package
      </h4>
      <Row gutter={[20, 0]} className="discount-input-main-wrap">
        <Col span={24} xxl={6} xl={6} lg={6} md={12} sm={24}>
          <FormFieldsComponent
            type="select"
            name="packetName"
            label="Packet Name"
            placeholder="Select Packet Name"
            options={options}
            handleSelectChange={(e) => setPacketId(e)}
            handleKeyDown={() => {}}
            handleBlur={() => {}}
            value={packetId}
          />
        </Col>
        {Object.keys(formFields).map((key) => {
          const {
            name,
            label,
            type,
            placeholder,
            options,
            discountType,
            format,
          } = formFields[key];
          const isVisible =
            (name === "discount" &&
              discountType === formValuesForPacket?.discountType) ||
            ((name === "buy" || name === "offer") &&
              discountType === formValuesForPacket?.discountType) ||
            !(name === "discount" || name === "buy" || name === "offer");

          return (
            <Col
              key={name}
              span={24}
              xxl={6}
              xl={6}
              lg={6}
              md={12}
              sm={24}
              className="discount-input-wrap"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <FormFieldsComponent
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                options={options}
                value={formValuesForPacket?.[name]}
                handleSelectChange={(value) =>
                  handleDiscountTypeChange(value, name, packetId, "packet")
                }
                format={format}
                handleChange={(e) =>
                  handleChange(
                    e,
                    type,
                    name,
                    packetId,
                    "packet",
                    formValuesForPacket.startDate,
                    formValuesForPacket.endDate
                  )
                }
                handleKeyDown={() => {}}
                handleBlur={() => {}}
                disabledDate={getDisabledDate(name)}
                inputClass="table-header-search-bar"
                inputMain="table-header-search-bar-main"
                labelClass="table-header-search-bar-label"
              />
            </Col>
          );
        })}
        <Col
          span={24}
          xxl={3}
          xl={3}
          lg={3}
          md={12}
          sm={24}
          className="save-btn-main"
        >
          <ButtonComponent
            type="submit"
            btnName={isEdit ? "Update" : "Save"}
            isStatus={discountType === "packet" && isSubmitDiscountLoading}
            btnClass="save-button"
            handleClick={() => handleSubmit("packet")}
            btnDisabled={checkButtonDisabled("packet")}
          />
        </Col>
      </Row>
    </div>
  );
};

export default VegetableFruitPacketDetails;
