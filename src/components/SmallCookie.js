import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInterval from "../hooks/use-interval.hook";

function SmallCookie({ imgSrc, ind }) {
  const refImg = useRef(null);
  const speed = Math.floor(Math.random() * 70 + 10);
  const [locX, setX] = useState(Math.floor(Math.random() * window.innerWidth));
  const [locY, setY] = useState(-50);
  const [d, setD] = useState(Math.random() * 360);

  useInterval(() => {
    // check if y is below the line
    let tmp = Math.random();
    if (locY > window.innerHeight && tmp > 0.5) {
      // console.log(refImg.current);
      if (refImg.current) {
        setX(Math.floor(Math.random() * window.innerWidth));
        setY(-50);
      }
    } else {
      setY(locY + speed + (Math.random() * 10 + 1));
    }
  }, 150);

  return (
    <CookieSmall
      ref={refImg}
      key={`bkgCookie-${ind}`}
      id={`bkgCookie-${ind}`}
      src={imgSrc}
      x={locX}
      y={locY}
      d={d}
    />
  );
}

const CookieSmall = styled.img`
  position: absolute;
  opacity: 0.5;
  width: 50px;
  height: 50px;
  left: ${(prop) => `${prop.x}px`};
  top: ${(prop) => `${prop.y}px`};
  z-index: -30;
  transform: rotate(${(prop) => `${prop.d}deg`});
`;
export default SmallCookie;
