import React from "react";
import styled, { css } from "styled-components";

const defaultStyles = ({
  center,
  right,
  centerVertically,
  spaceBetween,
  section,
  column,
  cursor,
  wrap,
}) =>
  css`
    display: flex;
    ${center && "justify-content: center;"}
    ${right && "justify-content: flex-end;"}
    ${spaceBetween && "justify-content: space-between;"}
    ${centerVertically && "align-items: center;"}
    ${section && "margin-bottom: 20px;"}
    ${column && "flex-direction: column;"}
    ${cursor && "cursor: pointer;"}
    ${wrap && "flex-wrap: wrap;"}
  `;
const Flex = styled(
  ({
    wrap,
    centerVertically,
    section,
    center,
    spaceBetween,
    column,
    ...rest
  }) => <div {...rest} />
)`
  ${defaultStyles}
  ${(props) => props.styles}
`;

export default Flex;
