import React from "react";
import { Link } from 'react-router-dom';

const DialogueCard = (props) => {// הדיאלוג עם המשתמש לדוגמא: כפתור חזרה לפרופיל, הצגת הנקודות ,והתחלת הממשחק

  return (
    <div className="bodycard">
      <div className="card">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <button onClick={() => props.buttonClick()}>{props.button}</button>
      </div>
      <Link className="LinkBtnBack" to="profile">
        <p className="btnBack">Back to profile</p>
      </Link>
    </div>

  );

};

export default DialogueCard;