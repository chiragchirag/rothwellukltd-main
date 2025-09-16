import React from "react";
import { loader, noDataFound } from "../../assest";
import LottieImage from "../LottieImage/LottieImage";
import "./SuggestionList.scss";

const SuggestionListView = ({
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  getSearchedProduct,
  suggestionList,
  handleBarcodeChange = () => {},
}) => {
  return (
    <React.Fragment>
      {showSuggestionList && (
        <div className="suggestion-list">
          {suggestionListLoading ? (
            <LottieImage
              lottieImage={loader}
              lottieText=""
              imageClassName="loader-icon"
            />
          ) : suggestionList.length > 0 ? (
            <ul>
              {suggestionList.map((res) =>
                typeof res === "object" ? (
                  <li
                    key={res.productNumber || res}
                    onClick={() => {
                      handleBarcodeChange({
                        target: { value: res?.productName },
                      });
                      getSearchedProduct(res?.barcodeId || res?.productNumber);
                      setShowSuggestionList(false);
                    }}
                    className="suggestion-list-main"
                  >
                    {res?.productName}
                  </li>
                ) : (
                  <li
                    key={res}
                    onClick={() => {
                      handleBarcodeChange({ target: { value: res } });
                      getSearchedProduct(res);
                      setShowSuggestionList(false);
                    }}
                    className="suggestion-list-main"
                  >
                    {res}
                  </li>
                )
              )}
            </ul>
          ) : (
            <LottieImage
              lottieImage={noDataFound}
              lottieText={"No Product found"}
              divClassName={"no-data-found-main"}
              textClassName={"no-found-text"}
              imageClassName={"no-data-found-icon"}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SuggestionListView;
