import { Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import ImageComponent from "../Image/ImageComponent";
import { isEmpty } from "../../Utils";
import "../Select/select.scss";
import { searchIcon } from "../../assest";
import Keyboard from "react-simple-keyboard";
import Draggable from "react-draggable";

const SelectComponent = ({
  type,
  name,
  placeholder,
  handleSelectChange,
  value,
  defaultValue,
  SelectClassNames,
  searchValue,
  options,
  error,
  inputMain,
  handleBlur,
  disabled,
  mode,
  maxCount,
  isFilter,
  handleOnFocusChange,
  handleSearchValueChange,
  keyboardToggle,
  setIsDropKeyboard,
  isDropKeyboard,
  isOnScreenDropKeyboard,
}) => {
  const { Option } = Select;
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const filterOption = (input, option) =>
    (option?.label ?? "")?.toLowerCase()?.startsWith(input?.toLowerCase());
  const handleSearchChangeInput = (e) => {
    const newSearchValue = e.target.value;
    setLocalSearchValue(newSearchValue);
    const updatedOptions = options?.filter((option) =>
      String(option?.label)
        ?.toLowerCase()
        ?.includes(newSearchValue?.toLowerCase())
    );
    setFilteredOptions(updatedOptions);
    if (handleSearchValueChange) {
      handleSearchValueChange(newSearchValue);
    }
    if (!dropdownOpen && newSearchValue?.length > 0) {
      setDropdownOpen(true);
    }
  };

  const handleKeyboardInput = (input) => {
    setLocalSearchValue(input);
    handleSearchChangeInput({ target: { value: input } });
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className={`${inputMain || ""} input-area-main`}>
      <Select
        type={type}
        name={name}
        mode={mode}
        defaultOpen={false}
        filterOption={filterOption}
        options={filteredOptions}
        placeholder={placeholder}
        allowClear={false}
        maxCount={maxCount}
        onBlur={() => handleBlur(name)}
        onChange={(e, obj) => {
          handleSelectChange(e, name, "select", obj);
        }}
        value={value || defaultValue}
        disabled={disabled}
        autoFocus={false}
        className={`dropdown_input ${SelectClassNames}`}
        open={dropdownOpen}
        onDropdownVisibleChange={(open) => {
          setDropdownOpen(open);
          setLocalSearchValue("");
        }}
        dropdownRender={(menu) => (
          <div>
            <Input
              name="Search"
              placeholder="Search"
              suffix={
                <ImageComponent
                  imageSrc={searchIcon}
                  imageAlt={"search-icon"}
                  imageClassName={"search-icon"}
                />
              }
              value={localSearchValue}
              onChange={handleSearchChangeInput}
              className="search-input"
              onFocus={handleOnFocusChange}
            />
            {menu}
          </div>
        )}
      >
        {Array.isArray(filteredOptions) &&
          [...filteredOptions]
            ?.sort((a, b) =>
              typeof a?.label === "string" && typeof b?.label === "string"
                ? a?.label?.localeCompare(b?.label)
                : a
            )
            ?.map((obj) => (
              <Option
                value={isFilter ? obj?.label : obj?.value}
                name={name}
                key={obj?.value}
              >
                {obj?.label}
              </Option>
            ))}
      </Select>
      {!isEmpty(error) && <p className="error-msg">{error}</p>}
      {keyboardToggle && isDropKeyboard && isOnScreenDropKeyboard && (
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
                onClick={() => setIsDropKeyboard(false)}
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

export default SelectComponent;
