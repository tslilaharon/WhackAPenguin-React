import React, { useState, useEffect } from "react";
import PenguinHole from "./Penguin";

const Game = ({ setScore }) => {
  const HoleIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];// מערך של מספר החורים המושלגים
  const [selectedHole, setSelectedHole] = useState(generateRandom(1, 9));// משתנה רדמולי שמשתנה בין 1 ל 9
  const [speed, setspeed] = useState(1000);// משתנה האחראי על מהירות הפינגויין
  const [count, setcount] = useState(0);// סופר את מספר הפעמים שהפנגויין עובר מחור לחור וכך משנה את המהירות
  useEffect(() => {
    const timer = setTimeout(PenguinEscaped, speed);// הפינגויין בורח מחחר לחור לפי המהירות שכתובה בספיד
    return () => {
      clearTimeout(timer);
    };
  });

  function PenguinKilled() {// כל פעם הנלחץ הפינגויין עולה נקודה 
    setScore();
  }

  function PenguinEscaped() {// פונקצייה הגורמת לבריחה של הפונגויין מחור לחור והגברת המהירות ומציג שהמהירות עולה
    setSelectedHole(generateRandom(1, 9, selectedHole));
    let c = count + 1// משתנה לצורך ספירה של מספר הפעמים שהפנגויין בורח
    setcount(c)
    if (count === 20) {
      setspeed(550)
      document.querySelector('.popup').classList.add("active")//הוספת קלס אקטיב שגורם לפופאפ להופיע ברגע שהמהירות עולה 
      setTimeout(() => {
        document.querySelector('.popup').classList.remove("active")// לאחר 3 שניות מהרגע שהפופאפ עולה נמחר את הקלב אקטיב 
      }, 3000);
    }
    if (count === 45) {
      setspeed(450)
      document.querySelector('.popup').classList.add("active")
      setTimeout(() => {
        document.querySelector('.popup').classList.remove("active")
      }, 3000);

    }

    if (count === 55) {
      setspeed(400)
      document.querySelector('.popup').classList.add("active")
      setTimeout(() => {
        document.querySelector('.popup').classList.remove("active")
      }, 3000);
    }
  }

  return (

    <div className="gamebody">
      <div className="game-grid">
        {HoleIds.map((holeId) => (
          <PenguinHole
            key={holeId}
            setScore={PenguinKilled}
            PenguinPopped={holeId === selectedHole}
          />
        ))}
      </div>
      <div className="popup">More Faster!</div>

    </div>

  );

};

function generateRandom(min, max, exclude) { //  פונקציית רדדום המשפיעה על החורים ולפיה הפינגויין זז  מחור לחור 
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (exclude) {
    return num === exclude ? generateRandom(min, max, exclude) : num;
  } else {
    return num;
  }
}

export default Game;