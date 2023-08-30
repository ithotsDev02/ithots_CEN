import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import Flex from "./flex/index";

import SearchInputView from "./SearchInputView";

const BREAKPOINT_MAX = 1024;

const SelectInputWrapper = styled(Flex)`
  width: 100%;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    margin: 1em 0;
  }
`;

const InputFieldWrapper = styled(Flex)`
  width: 60%;
  height: 100%;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    height: 60px;
    padding: 0.5em;
    background: #fff;
    border-radius: 5px;
  }
`;

const SelectionBoxWrapper = styled(Flex)`
  display: flex;
  max-height: 250px;
  position: relative;
  background: white;
  width: 100%;
  box-shadow: 0 0 7px rgb(0 0 0 / 6%);
  overflow: auto;
  z-index: 1;
  @media (min-width: 1025px) {
    top: 9px;
  }
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    position: absolute;
    top: ${(props) => props.top + "px"};
  }
`;

const StyledInput = styled(Input)`
  border: none !important;
  padding: 2px;
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #8895a3;
`;

const SelectInputPrefix = styled(Flex)`
  padding: 0 23px;
  background: #fff;
  border-top-left-radius: 8px;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    padding: 0 5px;
  }
`;
const DropdownIcon = styled(Flex)`
  padding-right: 1em;
  background: #fff;
  cursor: pointer;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    padding-right: 0.5em;
  }
`;

const SelectInput = ({
  setIsLoading,
  isLoading,
  filterText,
  filterPlaceholder,
  selectStyles,
  handleSearch,
  handleKeypress,
  value,
  view,
  dropDown,
  operation,
  searchResults,
  locationResults,
  getLocationData,
  isFiltering,
  isFinding,
  top,
  page,
  textInputId,
}) => {
  return (
    <>
      <SelectInputWrapper>
        <InputFieldWrapper>
          <SelectInputPrefix centerVertically center>
            {filterText}
          </SelectInputPrefix>
          <StyledInput
            placeholder={filterPlaceholder}
            style={selectStyles}
            onChange={handleSearch}
            value={value}
            onKeyPress={handleKeypress}
            maxLength={100}
            id={textInputId}
            autoComplete="off"
          ></StyledInput>
          {page === "landingPage" && <DropdownIcon />}
        </InputFieldWrapper>
        {dropDown && (
          <SelectionBoxWrapper>
            <SearchInputView
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              viewSelected={view}
              searchResults={searchResults}
              locationResults={locationResults}
              operation={operation}
              getLocationData={getLocationData}
              isFiltering={isFiltering}
              isFinding={isFinding}
              value={value}
            />
          </SelectionBoxWrapper>
        )}
      </SelectInputWrapper>
    </>
  );
};

export default SelectInput;
