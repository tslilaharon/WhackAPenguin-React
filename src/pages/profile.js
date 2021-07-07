import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';


const Profile = () => {
    // יצירת משתנים
    const [profileImg, setProfileImg] = useState('')
    const [adsress, setAdress] = useState('')
    const [housenumber, setHousenumber] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [birthday, setDate] = useState('')
    const [city, setCity] = useState('')
    const history = useHistory()


    useEffect(() => {

        if (sessionStorage.getItem('admin')) { //בדיקה אם הפרופיל הוא  אדמין
            let image = "images/profile.png"
            setProfileImg(image)
            setUserName("Admin")
            return

        }
        if (localStorage.getItem('edit')) { //בדיקה שלא נשאר יוזר שהוא במצב עריכה 
            localStorage.removeItem('edit')
        }

        if (sessionStorage.getItem('user')) {// בודק איזה יוזר מחובר בסשן סטורג ומציד את כל הפרטים שלו
            let login = JSON.parse(sessionStorage.getItem('user'))
            let imagep = login["profileImg"]
            setProfileImg(imagep)
            setUserName(login["userName"])
            setAdress(login["adsress"])
            setHousenumber(login["housenumber"])
            setEmail(login["email"])
            setDate(login["birthday"])
            setCity(login["city"])
            return
        }
        else {
            setProfileImg("images/user.png")// מציד רק תמונה 
        }
    }
        , []);


    const Logout = () => {// מתנתק ומוחק את הסשן שטורג
        if (sessionStorage.getItem('user') || sessionStorage.getItem('admin')) {
            sessionStorage.clear();
            history.push('login')

        }
    }
    if (sessionStorage.getItem('admin') === null && sessionStorage.getItem('user') === null) { // מנסה לקחת מתוך הסשן סטורג יוזר או אדמין אם אין הוא ירשום שצריך להתחבר.
        alert("You must be logged in")
        history.push('login')
    }
    const editiser = () => {// פונקציה שמעבירה לעמות של העריכת פרטים
        history.push('edituser')
    }

    return (
        <div className="profile">
            <Navbar />
            <div className="CardProfile">
                <h1>
                    Profile
            </h1>
                <img id="imageprofile1" src={profileImg} alt=""></img>
                <h1 className="titleh1">{userName}</h1>
                <p>{email}</p>
                <p>{`${adsress} ${housenumber}  ${city}`}</p>
                <p>{birthday}</p>

                <button className="btn1" onClick={editiser}>Update details</button>
                <Link to="/WhackAPenguin">
                    <button className="btn2">Play Game</button>
                </Link>
                <button className="btn3" onClick={Logout}>Log out</button>
            </div>
        </div>

    )
}
export default Profile;