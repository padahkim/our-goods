import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    is_start,
    is_end,
    height,
    width,
    maxwidth,
    margin,
    padding,
    bg,
    children,
    center,
    _onClick,
  } = props;

  const styles = {
    is_flex: is_flex,
    is_start: is_start,
    is_end: is_end,
    height: height,
    width: width,
    maxwidth: maxwidth,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  is_start: false,
  is_end: false,
  height: "100%",
  width: "100%",
  maxwidth: false,
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxwidth};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin : ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""}

    ${(props) =>
    props.is_start
      ? `display: flex; align-items: center; justify-content: flex-start;`
      : ""}   
        ${(props) =>
    props.is_end
      ? `display: flex; align-items: center; justify-content: flex-end;`
      : ""}
`;

export default Grid;
