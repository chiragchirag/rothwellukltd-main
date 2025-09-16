import React, { useEffect } from "react";
import SuggestionListView from "./SuggestionListView";

const SuggestionListContainer = ({
  showSuggestionList,
  suggestionList,
  suggestionListLoading,
  setShowSuggestionList,
  getSearchedProduct,
  listRef,
}) => {
  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowSuggestionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <SuggestionListView
        {...{
          listRef,
          showSuggestionList,
          suggestionList,
          suggestionListLoading,
          setShowSuggestionList,
          getSearchedProduct,
        }}
      />
    </>
  );
};

export default SuggestionListContainer;
