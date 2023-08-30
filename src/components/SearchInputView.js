import React, { useEffect } from "react";
import styled from "styled-components";
import Flex from "./flex/index";
// import { useRouter } from "next/router";/
import { Spin, Empty } from "antd";
import { Link, Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SelectedViewWrapper = styled(Flex)`
  padding: 1em 1.5em;
  flex: 1;
`;
const TextModeViewWrapper = styled(Flex)`
  flex: 1;
`;

const TextModeView = styled(Flex)`
  cursor: pointer;
  margin-top: 15px;
`;
const AutoSuggestionWrapper = styled(Flex)`
  flex: 1;
`;

const ResultImage = styled.img`
  height: 50px;
  width: 50px;
  margin: 0.3em;
  font-size: 2em;
  object-fit: cover;
`;
const ResultTextWrapper = styled(Flex)`
  margin: 0.3em;
`;
const ResultTextHeader = styled.div`
  font-size: 15px;
  font-weight: 550;
`;
const ResultTextSubHeader = styled.div`
  font-size: 14px;
`;
const ImagePlaceholder = styled(Flex)`
  height: 50px;
  width: 50px;
  margin: 0.3em;
  background: grey;
  font-size: 2em;
`;
const LocationResultsWrapper = styled(Flex)`
  flex: 1;
`;
const LocationResults = styled(Flex)``;

const LocationResultsKeys = styled(Flex)`
  margin: 0.5em;
  border-bottom: 0.5px solid grey;
  width: 50%;
  :last-child {
    border-bottom: 0px solid;
  }
`;
const LocationValues = styled.div`
  cursor: pointer;
  padding: 0.2em 0;
  &:hover {
    background: grey;
  }
`;
const EmptyContainer = styled(Flex)`
  color: #a5afba;
`;
const LocationName = styled.div`
  font-size: 14px;
  color: #a5afba;
`;

const SearchInputView = ({
  setIsLoading,
  isLoading,
  viewSelected,
  searchResults,
  locationResults,
  operation,
  getLocationData,
  isFiltering,
  value,
  isFinding,
}) => {
  //   const router = useRouter();
  const { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      isLoading && setIsLoading(false);
    };
  }, []);

  //   const handleGoToProfile = (profileType, tierCategory, companySlug, slug) => {
  //     if (!isLoading) {
  //       setIsLoading(true);
  //       if (tierCategory === "office" || tierCategory === "region") {
  //         router.push({
  //           pathname: `/pages/${tierCategory}/${companySlug}/${slug}`,
  //         });
  //       }
  //       if (!tierCategory) {
  //         router.push({
  //           pathname: `/pages/${slug}`,
  //         });
  //       }
  //       if (tierCategory === "company") {
  //         router.push({
  //           pathname: `/pages/${tierCategory}/${companySlug}`,
  //         });
  //       }
  //     }
  //   };
  const heighlightText = (text = "", searchKey = "") => {
    return [
      <strong key={searchKey}>
        {String(text).substring(
          0,
          String(text)
            .toLowerCase()
            .indexOf(String(searchKey).toLowerCase()) + String(searchKey).length
        )}
      </strong>,
      String(text).substring(
        String(text)
          .toLowerCase()
          .indexOf(String(searchKey).toLowerCase()) + String(searchKey).length
      ),
    ];
  };
  return (
    <SelectedViewWrapper>
      {viewSelected === "text" && (
        <AutoSuggestionWrapper center>
          <TextModeViewWrapper column>
            {!isLoading ? (
              <div>
                {searchResults && searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((result) => {
                      return (
                        <TextModeView
                          key={result.id}
                          onClick={() =>
                            history.push({
                              pathname: `${path}/coursedetail/${result.id}`,
                              state: {
                                isEdit: false,
                                courseInfo: result,
                                // calledFrom: "",
                              },
                            })
                          }
                          // onClick={() =>
                          //   handleGoToProfile(
                          //     result.profile_type,
                          //     result.tier_category,
                          //     result.company_slug,
                          //     result.slug
                          //   )
                          // }
                        >
                          {result.image ? (
                            <ResultImage
                              src={"https://api.esculae.com/" + result.image}
                              style={{
                                borderRadius: "5px",
                              }}
                            />
                          ) : (
                            <ImagePlaceholder
                              center
                              centerVertically
                              style={{
                                borderRadius: "5px",
                              }}
                            >
                              {/* {result.title} */}
                            </ImagePlaceholder>
                          )}
                          <ResultTextWrapper column center>
                            <ResultTextHeader>{result.title}</ResultTextHeader>
                            <ResultTextSubHeader>
                              {result.price || "500"}, {result.duration}
                            </ResultTextSubHeader>
                          </ResultTextWrapper>
                        </TextModeView>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyContainer center centerVertically>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </EmptyContainer>
                )}
              </div>
            ) : (
              <Spin />
            )}
          </TextModeViewWrapper>
        </AutoSuggestionWrapper>
      )}
    </SelectedViewWrapper>
  );
};
export default SearchInputView;
