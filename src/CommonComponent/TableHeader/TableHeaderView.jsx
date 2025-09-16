import React from "react";
import FormFieldsComponent from "../FormFields/FormFieldsComponent";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../Button/ButtonComponent";
import ImageComponent from "../Image/ImageComponent";
import { printIcon, searchIcon } from "../../assest";
import "../TableHeader/tableheader.scss";
import { INNER_HEADER_PRINT_BTN } from "../../Constant/TableConst";
import ModalComponent from "../Modal/ModalComponent";
import {
  FILTER_INPUT_FIELDS,
  SELECT_ALLOWED_IN_MODEL,
  STOCK_LIST_FILTER_INPUT_FELIDS,
} from "../../Constant/non-primitive";
import { Col, Row } from "antd";
import { ReportFilterContainer } from "../../Component";
import SuggestionListView from "../SuggestionList/SuggestionListView";

const TableHeaderView = ({
  searchValueJson,
  name,
  options,
  isFilterDropDown,
  btnTitle,
  btnDisabled,
  handleClickAddNewFunctionality,
  isFilterModalOpen,
  handleFilterModalOpen,
  handleModalCancel,
  handleCancelFilterModal,
  handleSearchChange,
  handleKeyDown,
  handleSelectChange,
  fieldsOptions,
  handleFilterSearch,
  filterValue,
  isFilterBtn,
  isTableSearch,
  isStockList,
  handleChange,
  handleFilterSelectChange,
  isReportFilter,
  handleDateChange,
  handleSelectSupplier,
  isDownloadBtn,
  handleClickPdf,
  handleClickExcel,
  isSaleFilter,
  isZReportFilter,
  isProductFilter,
  formField,
  filterValueJson,
  reportFilterJson,
  label,
  isSuggestionListVisible,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  suggestionList,
  customerList,
  listRef,
  isTopProductReport,
  isDropDownDisabled,
  isSaleReport,
  isPaymentSaleReport,
  placeholder,
  searchPlaceholder,
  isPurchaseReport,
}) => {
  const sidebarHeaderTitle = sessionStorage.getItem("sidebarHeaderTitle");
  const INPUT_FIELDS = isStockList
    ? STOCK_LIST_FILTER_INPUT_FELIDS
    : FILTER_INPUT_FIELDS;
  return (
    <div className="table-header-main">
      <div className="filter-button-main">
        {isFilterBtn && (
          <ButtonComponent
            handleClick={handleFilterModalOpen}
            btnClass={"filter-btn"}
            btnName={"Filter"}
            btnIcon={
              <div className="filter-icon-main">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6666 4.33325H10.6666"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.00004 4.33325H1.33337"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66671 6.66667C7.95537 6.66667 9.00004 5.622 9.00004 4.33333C9.00004 3.04467 7.95537 2 6.66671 2C5.37804 2 4.33337 3.04467 4.33337 4.33333C4.33337 5.622 5.37804 6.66667 6.66671 6.66667Z"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6667 11.6667H12"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.33337 11.6667H1.33337"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.33333 13.9999C10.622 13.9999 11.6667 12.9552 11.6667 11.6666C11.6667 10.3779 10.622 9.33325 9.33333 9.33325C8.04467 9.33325 7 10.3779 7 11.6666C7 12.9552 8.04467 13.9999 9.33333 13.9999Z"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
          />
        )}
        {isFilterDropDown && (
          <FormFieldsComponent
            {...{
              label,
              options,
              name,
              type: "select",
              placeholder: placeholder ? placeholder : "",
              value: searchValueJson?.[name],
              defaultValue: searchValueJson?.[name],
              handleSelectChange: handleFilterSelectChange,
              handleBlur: () => {},
            }}
            className="dropdown"
          />
        )}
        {isReportFilter && (
          <ReportFilterContainer
            {...{
              isSaleFilter,
              isSaleReport,
              reportFilterJson,
              isPaymentSaleReport,
              handleDateChange,
              handleSelectSupplier,
              isPurchaseReport,
            }}
          />
        )}
        {isProductFilter && (
          <Row gutter={[20]}>
            {Object.keys(formField).map((ele) => {
              const {
                name,
                label,
                placeholder,
                options,
                type,
                disabled,
                showSearch,
                format,
              } = formField[ele];
              const optionList =
                name === "customerId"
                  ? customerList
                  : name === "type"
                    ? filterValueJson?.transactionType === "1"
                      ? options.slice(0, 1)
                      : options
                    : options;
              return (
                <Col
                  span={24}
                  xxl={
                    isZReportFilter
                      ? name === "sumGrandTotal"
                        ? 4
                        : 5
                      : isTopProductReport
                        ? name === "count"
                          ? 4
                          : 5
                        : 8
                  }
                  xl={
                    isZReportFilter
                      ? name === "sumGrandTotal"
                        ? 4
                        : 5
                      : isTopProductReport
                        ? name === "count"
                          ? 4
                          : 5
                        : 8
                  }
                  lg={
                    isZReportFilter
                      ? name === "sumGrandTotal"
                        ? 4
                        : 5
                      : isTopProductReport
                        ? name === "count"
                          ? 4
                          : 5
                        : 8
                  }
                  md={8}
                  sm={12}
                  xs={24}
                  key={name}
                >
                  <FormFieldsComponent
                    {...{
                      name,
                      label,
                      placeholder,
                      showSearch,
                      options: optionList,
                      format,
                      type,
                      disabled:
                        name === "transactionType" && isDropDownDisabled
                          ? isDropDownDisabled
                          : disabled,
                      value: filterValueJson[name],
                      handleBlur: () => {},
                      handleSelectChange,
                      handleChange: handleChange ? handleChange : () => {},
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        )}
        {btnTitle === "Backup" ? (
          <div className="backup-file-main">
            <h6 className="backup-file">
              <span>Backup File</span> Location storage/software/Recent/Backup
            </h6>
            <ButtonComponent
              btnName={"Edit File Location"}
              btnClass={"backup-file-button"}
            />
          </div>
        ) : (
          isTableSearch && (
            <div ref={listRef} className="suggestion-list-main">
              <FormFieldsComponent
                type={"text"}
                handleBlur={() => {}}
                placeholder={searchPlaceholder || "Search On This Table"}
                handleChange={handleSearchChange}
                handleKeyDown={handleKeyDown}
                inputClass={"table-header-search-bar"}
                inputMain={"table-header-search-bar-main"}
                labelClass={"table-header-search-bar-label"}
                handleOnFocus={handleFocusSearchInput}
                inputIcon={
                  <ImageComponent
                    imageSrc={searchIcon}
                    imageAlt={"search-icon"}
                    imageClassName={"search-icon"}
                  />
                }
              />
              {isSuggestionListVisible && (
                <SuggestionListView
                  {...{
                    showSuggestionList,
                    setShowSuggestionList,
                    suggestionListLoading,
                    handleFocusSearchInput,
                    getSearchedProduct,
                    suggestionList,
                  }}
                />
              )}
            </div>
          )
        )}
      </div>
      <div className="print-button-main">
        {isDownloadBtn && (
          <React.Fragment>
            <ButtonComponent
              btnName="Pdf"
              handleClick={handleClickPdf}
              isFrontIcon={true}
              btnIcon={<FilePdfOutlined />}
            />
            <ButtonComponent
              btnName="Excel"
              handleClick={handleClickExcel}
              isFrontIcon={true}
              btnIcon={<FileExcelOutlined />}
            />
          </React.Fragment>
        )}
        {INNER_HEADER_PRINT_BTN?.map((name) => {
          return (
            name === sidebarHeaderTitle && (
              <ButtonComponent
                btnName={"Print"}
                btnClass={"print-btn"}
                btnIcon={
                  <ImageComponent
                    imageSrc={printIcon}
                    imageAlt={"print-icon"}
                    imageClassName={"print-icon"}
                  />
                }
              />
            )
          );
        })}
        {btnTitle && (
          <ButtonComponent
            btnName={`${btnTitle === "Backup" ? "Generate" : btnTitle === "Stock" ? "Add" : "New"} ${btnTitle}`}
            handleClick={() =>
              handleClickAddNewFunctionality(
                `${btnTitle === "Backup" ? "Generate" : "New"} ${btnTitle}`
              )
            }
            btnIcon={<PlusCircleOutlined />}
            // btnClass={"generate-backup-button"}
            btnClass={`${btnTitle === "Purchases Return" ? "purchase_return_button" : "generate-backup-button"} `}
          />
        )}
      </div>
      {isFilterModalOpen && (
        <ModalComponent
          modalOpen={isFilterModalOpen}
          modalTitle={"Filter"}
          handleModalCancel={handleModalCancel}
          modalClass={"filter-modal-main"}
          footer={
            <div className="filter-modal-buttons-main">
              <ButtonComponent
                btnName={"Cancel"}
                btnClass={"filter-cancel-btn"}
                handleClick={handleCancelFilterModal}
              />
              <ButtonComponent
                btnName={"Save"}
                handleClick={handleFilterSearch}
                btnClass={"filter-button"}
                btnDisabled={btnDisabled}
              />
            </div>
          }
        >
          <Row gutter={[24, 0]} className="filter-modal-input-main">
            {INPUT_FIELDS?.map((field) => (
              <Col
                key={field?.name}
                span={24}
                xxl={12}
                xl={12}
                lg={12}
                md={12}
                sm={24}
                className="filter-input-wrap"
              >
                <FormFieldsComponent
                  type={field?.type}
                  label={field?.label}
                  placeholder={field?.placeHolder}
                  name={field?.name}
                  defaultValue={
                    filterValue?.[field?.name] || field?.defaultValue
                  }
                  value={filterValue?.[field?.name] || field?.defaultValue}
                  handleSelectChange={
                    isStockList ? () => {} : handleSelectChange
                  }
                  handleChange={isStockList ? handleChange : () => {}}
                  options={
                    SELECT_ALLOWED_IN_MODEL?.includes(field?.name)
                      ? fieldsOptions
                      : field?.options
                  }
                  inputClass={"filter-input"}
                  SelectClassNames={"filter-dropdown"}
                  handleBlur={() => {}}
                />
              </Col>
            ))}
          </Row>
        </ModalComponent>
      )}
    </div>
  );
};

export default TableHeaderView;
