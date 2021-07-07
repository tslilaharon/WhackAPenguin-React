import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import FormFeild from "../components/formField";
import { Link, useHistory } from 'react-router-dom';


const Register = (props) => {

    //  יצירת משתנים 
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [adsress, setAdress] = useState('')
    const [housenumber, setHousenumber] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setDate] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    // כל משתנה שנוצר הוא השדה עצמו כל שינוי בשדה ישנה את המשתנה
    /////////////////////////////////////////////////////////////

    //יבוא קובץ הערים
    useEffect(() => {
        getCitiesFromJson();
    }, []);

    const getCitiesFromJson = async () => {
        let response = await fetch('./data/israel-cities.json');
        let data = await response.json(); //the values
        setCities(data);
    }

    if (localStorage.getItem('edit')) {
        localStorage.removeItem('edit')
    }
    //////////////////////////////////////////////////////////////////////

    // בדיקות כל שדה בטופס
    const checkUsername = () => {
        if (userName.length < 60) {
            for (let i = 0; i < userName.length; i++) {

                if ((userName[i] >= 'a' && userName[i] <= 'z') || (userName[i] >= 'A' && userName[i] <= 'Z') || (userName[i] >= '!' && userName[i] <= '/') || (userName[i] >= '1' && userName[i] <= '9')) {
                    continue;
                }
                else {
                    alert('Fix userName\n Only English letters, numbers and special characters can be filled out. Make sure the text length does not exceed 60 characters.')
                    return false;

                }
            }
            return true
        }
        else {
            alert("user name bigger 60")
            return false
        }
    }
    const checkPassword = () => {
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
                alert('Fix password \n Contains 7 to 12 characters. Make sure there is at least one special character, a capital letter and a number.')
                return false;

            }


        }
        else {
            alert('Fix password')
            return false;

        }


    }

    const checkImage = () => {
        let ending = profileImg.split(';')[0].split('/')[1];

        //stop
        if (ending === "png" || ending === "jpeg" || ending === "jpg") {
            return true;
        }
        else {
            alert("Only files can be uploaded 'jpeg' or 'png' !")
        }

    }
    const checkName = () => {
        for (let i = 0; i < firstname.length; i++) {
            if (((firstname[i] >= 'a' && firstname[i] <= 'z') || (firstname[i] >= 'A' && firstname[i] <= 'Z')) && (isNaN(firstname) === true)) {
                continue
            }
            else {
                alert('Fix First Name \n You can only fill in text')
                return false
            }

        }
        return true
    }
    const checkLastName = () => {

        for (let i = 0; i < lastname.length; i++) {
            if (((lastname[i] >= 'a' && lastname[i] <= 'z') || (lastname[i] >= 'A' && lastname[i] <= 'Z')) && (isNaN(lastname) === true)) {
                continue
            }
            else {
                alert('Fix First Name \n You can only fill in text')
                return false
            }
        }
        return true


    }
    const checkEmail = () => {

        for (let i = 0; i < email.length; i++) {
            if (isNaN(email[i]) === false) {
                return alert("Please enter an email address without numbers")
            }
        }
        let ending = "";
        for (let i = email.length - 3; i < email.length; i++) {

            ending += email[i];

        }
        if (ending === "com") {
            return true
        }
        else {
            alert("The e-mail address must end in .com")
            return false
        }

    }
    const checkDate = () => {

        let year = "";
        for (let i = 0; i < 4; i++) {
            year += birthday[i]

        }
        let d = new Date();
        let n = d.getFullYear();
        if ((year - n) === 0 || (n - year) >= 120) {
            alert("Incorrect age field")
            return false
        }
        else {
            return true
        }


    }
    const checkAdress = () => {
        for (let i = 0; i < adsress.length; i++) {
            if (((adsress.charCodeAt(i) >= 0x590) && (adsress.charCodeAt(i) <= 0x5FF)) || (adsress[i] === " ")) {
                continue
            }
            else {
                alert("An address must be entered in Hebrew only")
                return false

            }

        }
        return true
    }
    const checkHouseNumber = () => {

        if (isNaN(housenumber) === true || Number(housenumber) <= 0) {
            alert("Fix House Number \nNumber only. Make sure there are no negative numbers.")
            return false
        }

        return true
    }

    ////////////////////////////////////////////////////////////////////

    // בדיקת הטופב עצמו
    const checkForm = () => {// בודק אם כל השדות מלאים ואם הסיסמאות תואמות
        if (userName === '' || password === '' || confirmPassword === '' || city === '') {
            alert('All fields must be filled out')
            return false;
        }
        if (password === confirmPassword)
            return true;
        else {
            alert(`The passwords do not match`)
            return false;
        }
    }
    ///////////////////////////////////////////////////////////////////////////
    // פונקציית ההרשמה 
    const signup = (event) => {
        event.preventDefault(); // ביטול ההתנהגות הדיפולטיבית של שליחת הטופס
        // בדיקת כל השדות בטופס
        if (checkForm() && checkUsername() && checkPassword() && checkImage() && checkName() && checkLastName() && checkEmail() && checkDate() && checkAdress() && checkHouseNumber()) {
            let user = [{ userName, password, city, profileImg, firstname, lastname, adsress, housenumber, email, birthday }] // יצירת מערך עם כל הפרטים של היוזר
            if (JSON.parse(localStorage.getItem('user'))) { // בדיקה אם קיים יוזר במערכת 
                //json.pars= החזרת הסטרינג מתוך החלוקל סטורג לאובייקט
                let userFromLS = JSON.parse(localStorage.getItem('user')) // יבוא היוזר מתוך הלוקל סטורג
                for (let i = 0; i < userFromLS.length; i++) {// מעבר על היוזרירם שנמצאים בתוך הלוקל סטורג
                    if (user[0].email === userFromLS[i].email) { // אם נמצא שיש מייל זהה ירשום הודעה
                        alert("The Email already exists in the system")
                        return;
                    }
                }
                userFromLS.push(null)// יצירת מקום ריק ליוזר חדש
                userFromLS[userFromLS.length - 1] = user[0];// הוספת היוזר החדש למערך היוזרים בתוך הלוקל סטורג
                localStorage.setItem('user', JSON.stringify(userFromLS))
                alert(`successfully registered!`)
                history.push('login')
                return;

            }
            else {// במידה ואין בכלל יוזר בתוך הלוקל סטרג הוא ייצור אחד.
                localStorage.setItem('user', JSON.stringify(user))
                alert(`successfully registered!`)
                history.push('login')

            }

        }
        else {
            alert("There are invalid fields")
        }
    }

    const uploadImage = (input) => { // העלאת תמונה והמרה לבייס 64
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setProfileImg(e.target.result);
            }

            reader.readAsDataURL(input.files[0]); //convert to base64 string
        }
    }



    return (

        <div className="register">
            <Navbar></Navbar>
            <div className="formShadow">
                <div className="form">
                    <form onSubmit={signup}>
                        <div className="fields">
                            <h1>Register</h1>
                            <FormFeild className="field1" type="text" name="First Name" action={setFirstName} />
                            <FormFeild className="field1" type="text" name="Last Name" action={setLastName} />
                            <FormFeild className="field1" type="text" name="User Name" action={setUserName} />
                            <FormFeild className="field1" type="email" name="Email" action={setEmail} />
                            <FormFeild className="field1" type="password" name="Password" action={setPassword} />
                            <FormFeild className="field1" type="password" name="Confirm Password" action={setConfirmPassword} />
                            <FormFeild className="field1" type="date" name="Birthday" action={setDate} />
                            <FormFeild className="field1" type="list" listId="listOfCities" data={cities} name="City" action={setCity} />
                            <FormFeild className="field1" type="text" name="Address" action={setAdress} />
                            <FormFeild className="field1" type="text" name="House number" action={setHousenumber} />
                            <FormFeild className="rimage" type="file" name="Upload image" targetImg={profileImg} action={uploadImage} />
                        </div>
                        <button className="BtnRegister" type="submit">Register</button>
                        <button className="BtnReset" type="reset">reset</button>
                        <Link to="/login" className="notreg">
                            <p >Are you a registered user? Sign in now!</p>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;