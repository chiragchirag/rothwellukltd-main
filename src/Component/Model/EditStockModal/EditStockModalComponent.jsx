import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
  PriceCalculationContainer,
} from "../../../CommonComponent";
import { Col, Row } from "antd";
import EditStockDetailsComponent from "../../Stock/EditStockDetails/EditStockDetailsComponent";
import { isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";
import "./editStockModal.scss";
import { useSelector } from "react-redux";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const EditStockModalComponent = ({
  editModalOpen,
  handleEditStockCloseModal,
  formFieldData,
  handleChange,
  handleBlur,
  handleSelectChange,
  editStockDetails,
  handleUpdateStockDetails,
  formFieldDataPacked,
  isStockPending,
  editStockErrors,
  isEditPrice,
  setIsEditPrice,
  btnDisabled,
  setBtnDisabled,
}) => {
  const { systemSettingDetails, unitsData } = useSelector(settingSelector);
  const productType =
    editStockDetails?.ProductModel?.productType ??
    editStockDetails?.VegAndFruitsPackage?.ProductModel?.productType;
  const isPacked = isEmpty(editStockDetails?.VegAndFruitsPackage)
    ? true
    : false;
  return (
    <ModalComponent
      modalOpen={editModalOpen}
      modalTitle={"Edit Stock Details"}
      handleModalCancel={handleEditStockCloseModal}
      modalClass={"edit-stock-details-main"}
      modalWidth={870}
      footer={
        <ButtonComponent
          handleClick={handleUpdateStockDetails}
          btnDisabled={isStockPending || btnDisabled}
          btnName={isStockPending ? <LoadingOutlined /> : "Update"}
          btnClass={"edit-stock-details-btn"}
        />
      }
    >
      <Row gutter={[20, 0]} className="edit-stock-input-main">
        <React.Fragment>
          {(productType === 1 || productType === 0) && !isPacked && (
            <React.Fragment>
              <Col
                span={24}
                xxl={24}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                className="edit-stock-title"
              >
                Edit Packed Items
              </Col>
              <EditStockDetailsComponent
                formFieldData={formFieldData}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSelectChange={handleSelectChange}
                editStockDetails={editStockDetails}
                editStockErrors={editStockErrors}
                systemSettingDetails={systemSettingDetails}
                unitsData={unitsData}
              />
            </React.Fragment>
          )}
          {(productType === 2 || productType === 0) && isPacked && (
            <React.Fragment>
              <Col
                span={24}
                xxl={24}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                className="edit-stock-title"
              >
                Edit Loose Items
              </Col>
              {Object.keys(formFieldDataPacked)?.map((fieldName) => {
                const {
                  label,
                  name,
                  type,
                  placeholder,
                  validation,
                  disabled,
                  format,
                } = formFieldDataPacked[fieldName];
                const productName =
                  editStockDetails?.ProductModel?.productName ||
                  editStockDetails?.VegAndFruitsPackage?.ProductModel
                    ?.productName?.productNumber;
                return (
                  <Col
                    key={name}
                    span={24}
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={24}
                    className="edit-stock-date-picker"
                  >
                    <FormFieldsComponent
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      label={label}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      format={format}
                      handleSelectChange={handleSelectChange}
                      disabled={name === "stockAdded" ? true : disabled}
                      error={editStockErrors[name]}
                      value={
                        name === "packetName"
                          ? productName
                          : isEmpty(editStockDetails[name])
                            ? ""
                            : editStockDetails[name]
                      }
                      {...(validation?.maxLength && {
                        maxLength: validation.maxLength,
                        systemSettingDetails,
                      })}
                    />
                  </Col>
                );
              })}
              <PriceCalculationContainer
                xxl={12}
                xl={12}
                lg={12}
                md={12}
                isEditPrice={isEditPrice}
                setIsEditPrice={setIsEditPrice}
                setBtnDisabled={setBtnDisabled}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      </Row>
    </ModalComponent>
  );
};

export default EditStockModalComponent;
