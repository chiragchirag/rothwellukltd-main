import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
} from "../../../CommonComponent";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";
import "../../Vegetables-Fruits/VegetablesFruitsCategoryModal/vegTablesFruitsModal.scss";

const VegetablesFruitsCategoryModalComponent = ({
  isModalOpen,
  isEdit,
  handleModalCancel,
  tableData,
  handleChange,
  handleBlur,
  handleSelectChange,
  handleSubmit,
  vegFruitData,
  vegFruitDataErrors,
  isProfileUpdate,
}) => {
  return (
    <div>
      <ModalComponent
        modalOpen={isModalOpen}
        modalTitle={
          isEdit ? "Edit Vegetables-Fruits" : "Create Vegetables-Fruits"
        }
        handleModalCancel={handleModalCancel}
        modalClass={"veg-fruits-modal-main"}
      >
        <Row gutter={[24, 0]} className="veg-fruits-modal-input-main">
          {Object.keys(tableData)?.map((fieldName) => {
            const {
              label,
              name,
              type,
              placeholder,
              validation,
              options,
              mode,
              maxCount,
            } = tableData[fieldName];
            return (
              <Col
                key={name}
                span={24}
                xxl={12}
                xl={12}
                lg={12}
                md={24}
                sm={24}
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
                    options,
                    mode,
                    maxCount,
                    error: vegFruitDataErrors[name],
                    value: isEmpty(vegFruitData[name])
                      ? ""
                      : vegFruitData[name],
                    ...(validation?.maxLength && {
                      maxLength: validation?.maxLength,
                    }),
                  }}
                  mainDiv={"veg-fruits-modal-dropdown-main"}
                  SelectClassNames={"veg-fruits-modal-dropdown"}
                  autoCompleteClassNames={"veg-auto-complete-input"}
                />
              </Col>
            );
          })}
          <Col span={24} xxl={24} xl={24} lg={24} md={24} sm={24}>
            <ButtonComponent
              type="submit"
              handleClick={handleSubmit}
              btnName={
                isProfileUpdate ? <LoadingOutlined /> : isEdit ? "Edit" : "Save"
              }
              btnClass={"veg-fruits-create-button"}
            />
          </Col>
        </Row>
      </ModalComponent>
    </div>
  );
};

export default VegetablesFruitsCategoryModalComponent;
