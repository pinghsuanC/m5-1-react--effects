import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({
  id,
  first,
  name,
  numCost,
  numProduces,
  numOwned,
  type,
  handleClick,
}) => {
  // ref with effect
  const refItem = useRef(null);
  useEffect(() => {
    if (refItem && first) {
      // Q: it will run even if refItem is a null
      refItem.current.focus();
    }
  }, []);

  return (
    <OuterWrapper ref={first ? refItem : null}>
      <InnerWrapper onClick={() => handleClick(id, numCost, numProduces)}>
        <Title>{name}</Title>
        {type === "tick" && (
          <DisplayInfo>
            Cost: {numCost} cookie(s). Produces {numProduces} cookies/second.
          </DisplayInfo>
        )}
        {type === "click" && (
          <DisplayInfo>
            Cost: {numCost} cookie(s). Increse {numProduces} cookies/click.
          </DisplayInfo>
        )}
      </InnerWrapper>
      <DisplayNum>{numOwned}</DisplayNum>
    </OuterWrapper>
  );
};

export default Item;

const Title = styled.h2``;
const OuterWrapper = styled.button`
  border: none;
  background-color: #222;
  color: white;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a7a7a7;
  margin: 5px;

  :hover {
    cursor: pointer;
  }
`;
const InnerWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const DisplayNum = styled.h1`
  padding-left: 20px;
`;
const DisplayInfo = styled.div`
  color: #a7a7a7;
  font-size: 0.8em;
`;
