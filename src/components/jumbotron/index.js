import React from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import SelectInput from "../SelectInput";
import Flex from "../flex/index";
import "./style.css";
const InputGroup = Input.Group;

const BREAKPOINT_MAX = 1024;

const BREAKPOINT_MIN = 1025;

const Wrapper = styled(Flex)`
  width: 100%;
  
  align-items: center;
  position: relative;
  height: 100%;
  @media (max-width: 699px) {
    margin-top: -52px;
  }
  &:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50% 27%;
    background-size: cover;
    background-image: url(${props => props.bgimg});
  }
  @media (min-width: ${BREAKPOINT_MIN + "px"}) {
    min-height: 48%;
  }
  @media only screen and (min-width: 600px) {
    padding-top: 80px;
    padding-bottom: 80px;
    margin-top: -100px;
  }
`;
const Container = styled(Flex)`
  width: 60%;
  z-index: 1;
  margin: 2%;
  padding: 0 10.07%;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    padding: 0 9.715% 0 10.07%;
  }
  @media (max-width: 699px) {
    padding: 0 20px;
  }
`;

const StyledInputGroup = styled(InputGroup)`
  height: 86px;
  border-radius: 8px;
  background: #fff;
  padding: 1em 0;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    height: auto;
    flex-direction: column;
    background: transparent;
    align-items: center;
  }
`;

const SearchButton = styled(Button)`
  height: auto;
  min-width: 116px;
  color: #f9f9fb;
  margin: 4px 15px 4px 4px;
  background-color: #2b69a9;
  font-size: 16px;
  line-height: 19px;
  text-shadow: none;
  border: none;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    padding: 1em;
    margin-top: 0.5em;
  }
`;
const InputBoxDivider = styled.div`
  border-left: 0.5px solid #a3adb8;
  padding: 0;
  width: 5px;
`;
const Container2 = styled(Flex)`
  color: #fbfcfc;
  position: relative;
  font-style: normal;
  font-weight: 600;
  font-size: 38px;
  line-height: 50px;
  text-align: center;
  padding-top: 7%;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    padding: 0 9.715% 0 10.07%;
  }
  @media only screen and (min-width: 600px) {
    padding-top: 60px;
  }
  @media only screen and (max-width: 699px) {
    padding-top: 60px;

    // padding: 0 57px;
    position: relative;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }
`;
const DescriptionText = styled(Flex)`
  color: #fbfcfc;
  position: relative;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  margin: 1%;
  text-align: center;
  @media (max-width: ${BREAKPOINT_MAX + "px"}) {
    padding: 0 9.715% 0 10.07%;
  }
  @media (max-width: 699px) {
    padding-top: 2px;
    position: relative;
    font-size: 13px;
    line-height: 13px;
    text-align: center;
  }
`;

const Jumbotron = ({
  setIsLoading,
  isLoading,
  bgimg,
  filterText,
  filterPlaceholder,
  filterOptions,
  filterOnSearch,
  filterValue,
  findText,
  findPlaceholder,
  onSearch,
  handleFilterKeyPress,
  view,
  searchDropDown,
  findDropDown,
  handleViewDropDown,
  getSelectedOptios,
  selectedOptions,
  onCheckAllChange,
  checkAll,
  removeSelectedags,
  searchResults,
  findValue,
  findSearch,
  locationResults,
  getLocationData,
  isFiltering,
  isFinding,
  handleCloseDropDown,
  page = "",
  searchInputId,
  findInputId,
}) => {
  return (
    <Wrapper column bgimg={bgimg}>
      <Container2>Seek. Learn. Interact. LIVE
</Container2>
      <DescriptionText>
      World's largest Christian Entrepreneur Network 

      </DescriptionText>
      <Container center centerVertically>
        <StyledInputGroup compact style={{ display: "flex", flex: 1 }}>
          <SelectInput
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            selectStyles={{ minWidth: "41.15%", boxShadow: "none" }}
            filterText={filterText}
            filterPlaceholder={filterPlaceholder}
            value={filterValue}
            options={filterOptions}
            handleSearch={filterOnSearch}
            handleKeypress={handleFilterKeyPress}
            view={view}
            dropDown={searchDropDown}
            handleDropDown={handleViewDropDown}
            operation={"search"}
            addSelectedOptios={getSelectedOptios}
            selectedOptions={selectedOptions}
            onCheckAllChange={onCheckAllChange}
            checkAll={checkAll}
            removeSelectedags={removeSelectedags}
            searchResults={searchResults}
            showDropFown={true}
            isFiltering={isFiltering}
            onBlur={handleCloseDropDown}
            top={85}
            page={page}
            textInputId={searchInputId}
          ></SelectInput>
          {/* <InputBoxDivider />
          <SelectInput
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            selectStyles={{ minWidth: "41.15%", boxShadow: "none" }}
            filterText={findText}
            filterPlaceholder={findPlaceholder}
            locationResults={locationResults}
            view={view}
            options={[]}
            value={findValue}
            handleSearch={findSearch}
            dropDown={findDropDown}
            handleDropDown={handleViewDropDown}
            operation={"find"}
            showDropFown={false}
            handleKeypress={handleFilterKeyPress}
            getLocationData={getLocationData}
            isFinding={isFinding}
            onBlur={handleCloseDropDown}
            top={175}
            textInputId={findInputId}
          ></SelectInput> */}
          <SearchButton
            style={{
              borderRadius: "3px", backgroundColor: "#ec5252",
            }}
            type="primary"
            onClick={onSearch}
          >
            Search
          </SearchButton>
        </StyledInputGroup>
      </Container>
    </Wrapper>
     
  );


};

export default Jumbotron;
 