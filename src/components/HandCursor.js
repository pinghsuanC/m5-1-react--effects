import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInterval from "../hooks/use-interval.hook";

function HandCursor({ cursorSrc, ind }) {
  const [d, setD] = useState(0);
  return <CursorHand src={cursorSrc} d={d} />;
}
export default HandCursor;

const CursorHand = styled.img`
  width: 30px;
  position: absolute;
  transform: rotate(${(prop) => `${prop.d}deg`});
`;
