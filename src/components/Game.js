import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import cookieSrc from "../cookie.svg";
import Item from "./Item.js";
import useInterval from "../hooks/use-interval.hook";
import useDocumentTitle from "../hooks/use-documentTitle";
import useKeyDown from "../hooks/use-keydown";
import SmallCookie from "./SmallCookie";
import HandCursor from "./HandCursor";
import cursorSrc from "../cursorHand.png";

// Q: can't make cookie picture responsive

// I would make items a large {} so that it's easier and less messier....
const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, type: "tick" },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, type: "tick" },
  { id: "farm", name: "Farm", cost: 1000, value: 80, type: "tick" },
  {
    id: "megacursor",
    name: "Mega Cursor",
    cost: 500,
    value: 50,
    type: "click",
  },
];

const initialCookie = 1000;
let x = 5; // the base exp
let initialClick = 1;
// used by the falling cookies
const backgroundCookieN = 15; // number of cookies falling from the background
const backgroundCookieArray = [];
while (backgroundCookieArray.length < backgroundCookieN) {
  backgroundCookieArray.push(true);
}
// used by cursors
const cursorHandN = 5; // number of cookies falling from the background
const cursorHandArray = [];
while (cursorHandArray.length < cursorHandN) {
  cursorHandArray.push(true);
}

const Game = () => {
  // TODO: Replace this with React state!
  // ========================= hooks =========================
  const [perSec, setPerSec] = useState(0);
  const refImg = useRef(null);
  const [perClick, setPerClick] = useState(initialClick);
  const [numCookies, setNumC] = useState(initialCookie);
  const [wCookie, setWC] = useState(400);
  const [purchasedItems, setPurchasedI] = useState({
    cursor: { num: 0, type: "tick" },
    grandma: { num: 0, type: "tick" },
    farm: { num: 0, type: "tick" },
    megacursor: { num: 0, type: "click" },
  });
  //const numCookies = 100;
  /*const purchasedItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };*/
  useInterval(() => {
    const calculateCookiesPerTick = (purchased) => {
      let r = 0;
      let ele;
      for (ele of items) {
        // check if it exists for safety
        if (purchased[ele.id] && purchased[ele.id].type === "tick") {
          // find the amount to add
          r += purchased[ele.id].num * ele.value;
        }
      }
      return r;
    };
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);

    // Add this number of cookies to the total
    setNumC(numCookies + numOfGeneratedCookies);
    setPerSec(numOfGeneratedCookies);
  }, 1000);

  // change title
  useDocumentTitle("", `${numCookies}`);
  // handle clicking
  const handleCookieClick = () => {
    // update parameters
    setPerSec(perSec + perClick);
    setNumC(numCookies + perClick);
  };
  useKeyDown(handleCookieClick, "Space");

  // ========================= handlers ====================
  const handleClick = (cat, cost, value) => {
    // cat: cursor/grandma/farm (id of items)
    cat = cat.toLowerCase();
    // check affordable or not
    if (numCookies >= cost) {
      // update numcookie by deducting cost
      setNumC(numCookies - cost);
      // update num purchased
      //    can't really use [cat]:newVal, so create a new one
      let newP = { ...purchasedItems };
      newP[cat].num++;
      setPurchasedI(newP); // or the spread operator also works find

      // deal with the price
      items.forEach((element) => {
        if (element.id === cat) {
          element.cost = Math.floor(Math.log(element.cost) * x + element.cost);
          x = x * 1.1; // increase x
        }
      });

      // deal with the click setup
      if (newP[cat].type === "click") {
        setPerClick(perClick + value);
      }
    } else {
      // inform not enough cookies
      window.alert(`You don't have enough cookies for a ${cat}.`);
    }
  };

  //console.log(purchasedItems);
  return (
    <Wrapper>
      {backgroundCookieArray.map((ele, ind) => {
        return (
          <SmallCookie key={`bkgCookie-${ind}`} imgSrc={cookieSrc} ind={ind} />
        );
      })}
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>
            {/*It wasn't specified, so calculate for each second seperately 
              i.e. if you clicked the cookie for this second, it won't be counted towards the next one
              */}
            {perSec}
          </strong>{" "}
          cookies per second
        </Indicator>
        <Button onClick={handleCookieClick}>
          {cursorHandArray.map((ele, ind) => {
            return (
              <HandCursor
                cursorSrc={cursorSrc}
                ind={ind}
                cen={() => {
                  return [refImg.styled.x, refImg.styled.y];
                }}
                key={`cursorHand-${ind}`}
              />
            );
          })}
          <Cookie
            src={cookieSrc}
            onMouseUp={() => {
              setWC(400);
            }}
            onMouseDown={() => {
              setWC(wCookie * 0.9);
            }}
            id="cookie-img"
            ref={refImg}
            w={wCookie}
          />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        <ItemAlign>
          {items.map((ele, ind) => {
            return (
              <Item
                key={ele.id}
                first={ind === 0}
                id={ele.id}
                name={ele.name}
                numCost={ele.cost}
                numProduces={ele.value}
                numOwned={purchasedItems[ele.id].num}
                type={purchasedItems[ele.id].type}
                handleClick={handleClick}
              />
            );
          })}
        </ItemAlign>
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const Cookie = styled.img`
  width: ${(prop) => `${prop.w}px`};
`;

const ItemAlign = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export { backgroundCookieArray };
export default Game;
