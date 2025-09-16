import { Col, Row, Typography } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  TableContainer,
} from "../../../CommonComponent";
import { MIX_MATCH_CREATE } from "../../../Constant/non-primitive";
import { LoadingOutlined } from "@ant-design/icons";
import { PRODUCT_LIST_MIX_MATCH } from "../../../Constant/TableConst";
import "./MixMatchUpdate.scss";
import { convertDateIntoYYYYMMDD } from "../../../Utils/Dates/Date";
import { isEmpty } from "../../../Utils";

const MixMatchUpdateView = ({
  handleChange,
  handleProductOnBlur,
  mixMatch,
  handleSubmit,
  isStatus,
  handleAddProduct,
  product,
  productData,
  handleRemoved,
  totalPrice,
  options,
}) => {
  return (
    <div className="update-mix-match-main">
      <Row gutter={[20, 0]}>
        {MIX_MATCH_CREATE?.map((ele) => {
          return (
            <Col
              key={ele?.label}
              span={24}
              xxl={8}
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={24}
              className="create-mix-match-inputs"
            >
              <FormFieldsComponent
                name={ele?.name}
                value={
                  ele?.name === "product"
                    ? product
                    : ele?.name === "offerName"
                      ? mixMatch?.offerName
                      : ele?.name === "price"
                        ? mixMatch?.price
                        : ele?.name === "startDate"
                          ? convertDateIntoYYYYMMDD(mixMatch?.startDate)
                          : ele?.name === "endDate"
                            ? convertDateIntoYYYYMMDD(mixMatch?.endDate)
                            : mixMatch[ele?.name]
                }
                type={ele?.type}
                handleChange={handleChange}
                disabled={ele?.name === "productNumber" ? true : false}
                maxLength={ele?.maxLength}
                label={ele?.label}
                inputClass={
                  ele?.name === "productNumber" ? "disable-input" : ""
                }
                suffix={ele?.suffix}
                TextareaClassNames={"product-notes-textarea"}
                handleBlur={handleProductOnBlur}
                handleKeyDown={handleAddProduct}
                placeholder={ele?.placeHolder}
                options={options}
              />
            </Col>
          );
        })}
      </Row>

      {!isEmpty(productData) && (
        <div className="create-mix-match-wrap">
          <TableContainer
            {...{
              tableTitle: "Create Mix Match",
              isTableHeader: true,
              column: PRODUCT_LIST_MIX_MATCH(handleRemoved),
              // setShowSuggestionList: () => {},
              dataSource: productData,
            }}
            classNames={"create-mix-match-table"}
          />
        </div>
      )}
      <div className="update-bill-main">
        <div className="update-bill">
          {Number(totalPrice) > 0 && (
            <Typography>
              TOTAL PRICE : <span>{totalPrice}</span>
            </Typography>
          )}
        </div>
      </div>
      <div className="btn-fixed">
        <ButtonComponent
          btnName={isStatus ? <LoadingOutlined /> : "Save"}
          btnClass="save-btn"
          btnType={"submit"}
          handleClick={handleSubmit}
          btnDisabled={isStatus && true}
        />
      </div>
    </div>
  );
};

export default MixMatchUpdateView;

//PRODUCT_LIST_MIX_MATCH
