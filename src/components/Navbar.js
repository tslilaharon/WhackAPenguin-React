import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';




const Navbar = (props) => {

    const history = useHistory() // יצירת משתנה לצורך שימוש בהיסטוריה
    const logo = "images/logonew1.png"// לוגו

    const Logout = () => // פונקציה של התנתקות מהמערכת לאחר במתחברים למערכת לוחצים התנתקות.
    {
        if (sessionStorage.getItem('user') || sessionStorage.getItem('admin'))//בודק אם יש משתמש בתוך סשן סטורג
        {

            sessionStorage.clear();//  ניקוי הסשן סטורג ההתנתקות עצמה
            history.push('login')// מעבר לדף הלוגין לאחר ההתנתקות

        }
    }


    const [image, setImage] = useState() // יצירת משתנה לתמונת הפרופיל
    useEffect(() => {// כל פעם שפותחים את האתר היוז אפקט קורה
        if (sessionStorage.getItem('admin')) {//בדיקה אם אדמין מחובר 
            let imagep = "images/profile.png"// אם כן הוא משנה ת התמונה לתמונה של האדמין 
            setImage(imagep)// השמת תמונה חדשה דרך פונקציית הסט של התמונה
            return
        }

        if (sessionStorage.getItem('user')) {// במקרה שיש יוזר רגיל
            let login = JSON.parse(sessionStorage.getItem('user'))// משיכת פרטי היוזר מתוך הסשן סטורג
            let imagep = login["profileImg"]//הגדרת התמונה מתוך היוזר שנמצא בסשן סטורג
            setImage(imagep)//שמת תמונה חדשה דרך פונקציית הסט של התמונה
            return
        }
        else {// במקרה שאין משתמש מחובר ולא אדמין 
            setImage("images/user.png")
        }
    }
        , []);

    /////////////////////////////////////////////////////////


    // במקרה שיש אדמין מחובר נחזיר את תפריט המתאים לאדמין בלי הלינק לפרופיל
    if (sessionStorage.getItem('admin')) {
        return (
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/">
                        <img className="logo" src={logo} alt=""></img>
                    </Link>
                </div>
                <ul>
                    <li className="nav-item">
                        <Link to="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin">
                            <span>Admin</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login">
                            <span onClick={Logout}>Logout</span> {/* בלחיצה על התנתקות עובר לפונקציית ההתנתקות*/}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register">
                            <span>Register</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin">
                            <img id="imageprofile" src={image} alt="" width="40px" height="40px"></img>
                        </Link>
                    </li>

                </ul>
            </nav>
        )

    }

    ///////////////////////////////////////////////////////////////

    //במקרה שיש יוזר מחובר נחזיר את תפריט המתאים ליוזר בלי הלינק לאדמין

    if (sessionStorage.getItem('user')) {
        return (
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/">
                        <img className="logo" src={logo} alt=""></img>
                    </Link>
                </div>
                <ul>
                    <li className="nav-item">
                        <Link to="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profile">
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login">
                            <span onClick={Logout}>Logout</span> {/* בלחיצה על התנתקות עובר לפונקציית ההתנתקות*/}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register">
                            <span>Register</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profile">
                            <img id="imageprofile" src={image} alt="" width="40px" height="40px"></img>
                        </Link>
                    </li>

                </ul>
            </nav>
        )

    }

    ///////////////////////////////////////////////////////////////

    // במידה ואף יוזר לא מחובר מציג תפריט עם האדמין ועם הפרופיל
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img className="logo" src="images\logonew1.png" alt=""></img>
                </Link>
            </div>
            <ul>
                <li className="nav-item">
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Profile">
                        <span>Profile</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin">
                        <span>Admin</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login">
                        <span>LogIn</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register">
                        <span>Register</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Profile">
                        <img id="imageprofile" src={image} alt="" width="40px" height="40px"></img>
                    </Link>
                </li>

            </ul>
        </nav>
    )

}


export default Navbar;