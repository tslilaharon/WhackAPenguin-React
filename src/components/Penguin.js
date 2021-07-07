import React, { useState, useEffect } from "react";
import Penguin_img from "../img/pinguin.png";
import hit_img from "../img/wow.png";
import hole from "../img/snowcap.png";

function PenguinHole({ PenguinPopped, setScore, score }) {
  const [PenguinState, setPenguinState] = useState(PenguinPopped ? "Penguin" : "no-Penguin");// בדיקה אם רואים את הפינגויין או לא 

  useEffect(() => {
    setPenguinState(PenguinPopped ? "Penguin" : "no-Penguin");
  }, [PenguinPopped]);

  const handleClick = () => {
    if (PenguinState === "Penguin") {
      setPenguinState("escaped");
      const hitSound = new Audio("./sfx/Popup.mp3");
      hitSound.play();
      setScore();
    }

  };

  return (

    <div className="grid-item" onClick={handleClick}>
      <img className="hole" src={hole} alt="" />
      <img
        className={`hole-content ${PenguinState === "Penguin" ? "Penguin" : ""}`}
        src={getPenguinImage(PenguinState)}
        alt=""
      />
    </div>
  );
}

let getPenguinImage = (state) => {
  if (state === "escaped") {
    return hit_img;
  }
  if (state === "Penguin") {
    return Penguin_img;
  }
  return null;
};

export default PenguinHole;
