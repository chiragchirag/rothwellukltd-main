import { Col, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  TableContainer,
} from "../../../CommonComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { PRODUCT_LIST_MIX_MATCH } from "../../../Constant/TableConst";
import "./MixMatchCreate.scss";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";
import { MIX_MATCH_CREATE_SCHEMA } from "../../../FormSchema/DiscountSchema";

const MixMatchCreateView = ({
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
  loading,
  suggestionList,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  listRef,
  mixMatchError,
  disabledPreviousDate,
}) => {
  return (
    <div className="create-mix-match-main">
      <Row gutter={[20, 0]}>
        {Object.keys(MIX_MATCH_CREATE_SCHEMA)?.map((ele) => {
          const { label, name, type, format, placeholder } =
            MIX_MATCH_CREATE_SCHEMA[ele];
          return (
            <Col
              key={label}
              span={24}
              xxl={name === "product" ? 24 : 6}
              xl={name === "product" ? 24 : 6}
              lg={name === "product" ? 24 : 6}
              md={name === "product" ? 24 : 12}
              sm={name === "product" ? 24 : 12}
              xs={24}
              className="create-mix-match-inputs"
            >
              <div ref={listRef} className="input-main">
                <FormFieldsComponent
                  name={name}
                  value={
                    name === "product"
                      ? product
                      : name === "offerName"
                        ? mixMatch?.offerName
                        : name === "price"
                          ? mixMatch?.price
                          : name === "startDate"
                            ? mixMatch?.startDate
                            : name === "endDate"
                              ? mixMatch?.endDate
                              : mixMatch[name]
                  }
                  type={type}
                  format={format}
                  handleChange={(e) => handleChange(e, type, name)}
                  placeholder={placeholder}
                  disabled={name === "productNumber" ? true : false}
                  label={label}
                  inputClass={name === "productNumber" ? "disable-input" : ""}
                  TextareaClassNames={"product-notes-textarea"}
                  error={mixMatchError?.[name]}
                  handleBlur={handleProductOnBlur}
                  handleKeyDown={handleAddProduct}
                  handleOnFocus={handleFocusSearchInput}
                  disabledDate={
                    type === "datepicker"
                      ? (current) =>
                          disabledPreviousDate(
                            current,
                            name === "endDate"
                              ? mixMatch?.startDate
                              : name === "startDate"
                                ? mixMatch?.endDate
                                : null
                          )
                      : undefined
                  }
                />
                {name === "product" && (
                  <SuggestionListContainer
                    {...{
                      listRef,
                      showSuggestionList,
                      suggestionList,
                      suggestionListLoading,
                      setShowSuggestionList,
                      getSearchedProduct,
                    }}
                  />
                )}
              </div>
            </Col>
          );
        })}
      </Row>

      <div className="create-mix-match-wrap">
        <TableContainer
          {...{
            loading,
            isTableHeader: true,
            column: PRODUCT_LIST_MIX_MATCH(handleRemoved),
            dataSource: productData,
            isSuggestionListVisible: true,
            showSuggestionList,
            setShowSuggestionList,
            suggestionListLoading,
            handleFocusSearchInput,
            getSearchedProduct,
            suggestionList,
            listRef,
          }}
          classNames={"create-mix-match-table"}
        />
      </div>
      <div className="update-bill-main">
        <div className="update-bill">
          Total Price : <span>{parseFloat(totalPrice).toFixed(2)}</span>
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

export default MixMatchCreateView;
