import { Input, Select } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { isEmpty } from "../../Utils";
import { searchIcon } from "../../assest";
import Keyboard from "react-simple-keyboard";
import Draggable from "react-draggable";
import ImageComponent from "../Image/ImageComponent";

const { Option } = Select;

const CustomerSearchView = ({
  inputMain,
  error,
  placeholder,
  handleGetCustomerData,
  options = [],
  SelectClassNames,
  value,
  handleSelectChange,
  searchValue,
  keyboardToggle,
  isOnScreenRefDropKeyboard,
  handleOnFocusChange,
  isDropRefKeyboard,
  setIsDropRefKeyboard,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterOption = (input, option) => {
    return (
      option?.label?.toLowerCase()?.startsWith(input?.toLowerCase() || "") ||
      false
    );
  };

  const handleSearchChangeInput = (e) => {
    const newSearchValue = e.target.value;
    setLocalSearchValue(newSearchValue);

    const updatedOptions = (options || []).filter((option) =>
      option?.label.toLowerCase().includes(newSearchValue.toLowerCase())
    );
    setFilteredOptions(updatedOptions);

    if (!dropdownOpen && newSearchValue.length > 0) {
      setDropdownOpen(true);
    }
  };

  useEffect(() => {
    if (Array.isArray(options)) {
      setFilteredOptions(options || []);
    }
  }, [options]);

  const sortedOptions = useMemo(() => {
    if (!Array.isArray(filteredOptions)) {
      return [];
    }

    return filteredOptions.sort((a, b) =>
      typeof a?.label === "string" && typeof b?.label === "string"
        ? a?.label?.localeCompare(b?.label)
        : 0
    );
  }, [filteredOptions]);

  const handleKeyboardInput = (input = "") => {
    setLocalSearchValue(input);
    handleSearchChangeInput({ target: { value: input } });
  };

  const handleOptionSelect = (value) => {
    handleSelectChange(value, "customer", "customer");
    setIsDropRefKeyboard(false);
  };

  useEffect(() => {
    if (!keyboardToggle || !isDropRefKeyboard) return;
    return () => {
      setLocalSearchValue("");
    };
  }, [keyboardToggle, isDropRefKeyboard]);

  return (
    <div className={`${inputMain} input-area-main`}>
      <Select
        placeholder={placeholder}
        defaultOpen={false}
        allowClear={false}
        // showSearch
        onSearch={handleGetCustomerData}
        value={value}
        onChange={handleOptionSelect}
        options={Array.isArray(sortedOptions) ? sortedOptions : []}
        className={`dropdown_input ${SelectClassNames}`}
        open={dropdownOpen}
        filterOption={filterOption}
        onDropdownVisibleChange={(open) => {
          if (!open && localSearchValue.length > 0) {
            setDropdownOpen(true);
          } else {
            setDropdownOpen(open);
          }
        }}
        dropdownRender={(menu) => (
          <div>
            <Input
              value={localSearchValue}
              onChange={handleSearchChangeInput}
              placeholder="Search"
              suffix={
                <ImageComponent
                  imageSrc={searchIcon}
                  imageAlt="search-icon"
                  imageClassName="search-icon"
                />
              }
              onFocus={handleOnFocusChange}
              className="search-input"
            />
            {menu}
          </div>
        )}
      >
        {Array.isArray(sortedOptions) && sortedOptions.length > 0 ? (
          sortedOptions.map((obj) => (
            <Option value={obj?.value} key={obj?.label}>
              {obj?.label}
            </Option>
          ))
        ) : (
          <Option disabled>No options available</Option>
        )}
      </Select>
      {!isEmpty(error) && <p className="error-msg">{error}</p>}

      {keyboardToggle && isOnScreenRefDropKeyboard && isDropRefKeyboard && (
        <Draggable>
          <div style={{ position: "absolute", zIndex: 1000 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#f1f1f1",
                height: "30px",
                width: "100%",
                borderRadius: "0.5rem 0.5rem 0 0",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                padding: "0 0.625rem",
                position: "relative",
              }}
            >
              <div
                onClick={() => setIsDropRefKeyboard(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.25rem",
                  color: "#888",
                  cursor: "pointer",
                  padding: "0",
                  position: "absolute",
                  top: "50%",
                  right: "0.625rem",
                  transform: "translateY(-50%)",
                }}
              >
                x
              </div>
            </div>
            <div style={{ marginTop: "0" }}>
              <Keyboard
                onChange={handleKeyboardInput}
                value={localSearchValue}
                display={{
                  "{bksp}": "⌫",
                  "{tab}": "Tab",
                  "{shift}": "Shift",
                  "{lock}": "CapsLock",
                  "{enter}": "Enter",
                  "{space}": "  ",
                }}
              />
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default CustomerSearchView;
