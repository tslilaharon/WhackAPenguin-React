import React, { useState } from "react";
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';



const Login = (props) => {


    if (localStorage.getItem('edit')) {
        localStorage.removeItem('edit')
    }
    // יצירת משנים
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()


    const Checkadmin = () => {// בדיקה אם מנסים להיכנס עם אדמין
        let AdminImage = "images/profile.png"// הגדרת תמונת פרופיל של היוזר שמתחבר
        if (userName === "admin" && password === "admin1234admin") {// אם אלה השדות נתחבר לאדמין.
            let admin = [{ userName, password, AdminImage }]
            alert("successfully login!")
            sessionStorage.clear()
            sessionStorage.setItem('admin', JSON.stringify(admin))
            history.push('admin')
            return true
        }

    }
    const checkUsername = () => {//בדיקת שדה היוזרניים 
        if (userName.length < 60) {
            for (let i = 0; i < userName.length; i++) {
                if ((userName[i] >= 'a' && userName[i] <= 'z') || (userName[i] >= 'A' && userName[i] <= 'Z') || (userName[i] >= '!' && userName[i] <= '/') || (userName[i] >= '1' && userName[i] <= '9')) {
                    continue;
                }
                else {
                    alert('Fix userName')
                    return false;

                }
            }
            return true
        }
    }
    const checkPassword = () => {

        if (password === "admin1234admin") {
            return true
        }
        if (password.length >= 7 && password.length <= 12) {
            let counterAZ = 0
            let counterchar = 0
            let counterNumber = 0;

            for (let i = 0; i < password.length; i++) {
                if ((password[i] >= 'A' && password[i] <= 'Z')) {
                    counterAZ++
                }
                if ((password[i] >= '!' && password[i] <= '/')) {
                    counterchar++
                }
                if ((password[i] >= '1' && password[i] <= '9')) {
                    counterNumber++
                }

            }
            if (counterAZ > 0 && counterchar > 0 && counterNumber > 0) {
                return true;
            }

            else {
                alert('Fix password')
                return false;

            }


        }
        else {
            alert('Fix password')
            return false;

        }


    }

    const signup = (event) => {
        event.preventDefault();
        if (userName === "" || password === "") {
            alert("Must fill in all fields")
            return
        }

        if (checkPassword() && checkUsername()) { // בדיקת השדות בטופס הלוגין

            let res = Checkadmin();// בדיקה האם המשתמש הוא אדמין. אם כן, מתחבר אליו ומפסיק את הפונקצייה 
            if (res === true) {
                return;
            }

            if (localStorage.getItem('user')) {// אם יש יוזר בלוקל סטורג 
                let user = JSON.parse(localStorage.getItem('user'))//ייבוא  היוזרים מתוך הלוקל סטורג

                for (let i = 0; i < user.length; i++) { // עובר על רשימת היוזרים בתוך הלוקל סטורג
                    if (user[i].userName === userName && user[i].password === password) {// בדיקה עם המשתמש והסיסמה זהיים

                        alert("successfully login!")
                        sessionStorage.clear();//  ניקוי הסן סטורג לפני התחברות היוזר בשביל לא ליצור מצה שגם יוזר רגיל וגם אדמין מחוברים ביחד
                        sessionStorage.setItem('user', JSON.stringify(user[i]))
                        history.push('Profile')
                        return
                    }
                    else {
                        continue
                    }



                }
                alert("Faild login! try again...")
                return



            }
            else {
                alert("Faild login! try again...")
                return
            }

        }

    }


    return (

        <div className="login">
            <Navbar />
            <div className="form-login">
                <h1>Log In</h1>
                <form onSubmit={signup}>

                    <input type="username" value={userName} onChange={e => { setUserName(e.target.value); }} placeholder="username"
                    />
                    <input type="password" value={password} onChange={e => { setPassword(e.target.value); }} placeholder="password"
                    />
                    <button className="BtnLogin" type="submit">Login</button>
                    <Link to="/register" className="notreg">
                        <p >Not registered ? Sign up now !</p>
                    </Link>
                </form>
            </div>
        </div>


    )
}
export default Login;