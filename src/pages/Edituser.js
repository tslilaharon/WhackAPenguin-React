import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import FormFeild from "../components/formField";
import { useHistory } from 'react-router-dom';

const EditUser = (props) => { // זהה לטופס ההרשמה


    const history = useHistory()
    //  יצירת משתנים 
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
    //////////////////////////////////////////////////////////////////////////////////////////
    // ייבוא קובץ הערים
    useEffect(() => {
        getCitiesFromJson();
    }, []);

    const getCitiesFromJson = async () => {
        let response = await fetch('./data/israel-cities.json');
        let data = await response.json(); //the values
        setCities(data);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // בדיקת כל שדה בטופס
    const checkUsername = () => {
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
                alert('Fix First Name')
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
                alert('Fix Last Name')
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
            alert("Fix House Number ")
            return false
        }

        return true
    }
    ////////////////////////////////////////////////////////////////////

    // בדיקה האם כל השדות לא ריקים ואם הסיסמאות תואמות
    const checkForm = () => {
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
    //פונקציית עריכת הפרטים
    const signup = (event) => {
        event.preventDefault();
        if (checkForm() && checkUsername() && checkPassword() && checkImage() && checkName() && checkLastName() && checkEmail() && checkDate() && checkAdress() && checkHouseNumber()) {
            let userFromLS = JSON.parse(localStorage.getItem('user'))//ייבוא היוזרים מתוך הלוקל סטורג
            if (JSON.parse(localStorage.getItem('user'))) {//  בדיקה אם יש יוזר בתוך הלוקל סטורג 
                for (let i = 0; i < userFromLS.length; i++) {// מעבר על כל היוזרים ובדיקה שלא קיים אותו מייל
                    if (email === userFromLS[i].email) {
                        alert("The Email already exists in the system")
                        return;
                    }
                }
            }
            if (localStorage.getItem('edit')) { // אם יש יוזר שהוא במצב עריכה בתוך לוקל סטורג מגיעים לפה רק דרך הדך של האדמין
                let userfromadmin = JSON.parse(localStorage.getItem('edit'))// יבוא פרטי היוזר שאותו נרצה לערוך
                for (let i = 0; i < userFromLS.length; i++) { // עוברים על כל היוזרים מתוך הלוקל סטורג 
                    if (userFromLS[i].email === userfromadmin["email"])// אם יש את אותו מייל גם ליוזר מהלוקל סטורג וגם ליוזר שאותו נרצה לערוך 
                    // עדכון כל פרטי היוזר מתוך הלוקל סטורג עם אותו מייל של היוזר שאותו אני רוצים לערוך 
                    {
                        userFromLS[i].userName = userName
                        userFromLS[i].email = email
                        userFromLS[i].password = password
                        userFromLS[i].adsress = adsress
                        userFromLS[i].profileImg = profileImg
                        userFromLS[i].birthday = birthday
                        userFromLS[i].city = city
                        userFromLS[i].lastname = lastname
                        userFromLS[i].housenumber = housenumber
                        userFromLS[i].firstname = firstname
                        localStorage.setItem('user', JSON.stringify(userFromLS)) // החזרת היוזר המעודכן לתך הלוקל סטורג 
                        localStorage.removeItem('edit')// מחיקת היוזר שאותו כבר ערכנו מתוך הלוקל סטורג
                        alert("Your details updated!")
                        history.push('admin')
                        return
                    }
                    else {
                        continue
                    }
                }

            }
            // במידה והגענו דרך הדך של הפרופיל 
            let userFromSS = JSON.parse(sessionStorage.getItem('user'))

            for (let i = 0; i < userFromLS.length; i++) {// מעבר על כל היוזרים מתוך הלוקל סטורג

                if ((userFromLS[i].email === userFromSS.email)) {// בדיקה אם יוזר מתוך רשימת היוזרים המייל שלו שווה למייל שנמצא בתוך ה סשן סטורגן
                    //עדכון היוזר הספציפי
                    userFromLS[i].userName = userName
                    userFromLS[i].email = email
                    userFromLS[i].password = password
                    userFromLS[i].adsress = adsress
                    userFromLS[i].profileImg = profileImg
                    userFromLS[i].birthday = birthday
                    userFromLS[i].city = city
                    userFromLS[i].lastname = lastname
                    userFromLS[i].housenumber = housenumber
                    userFromLS[i].firstname = firstname
                    break;
                }

            }
            localStorage.setItem('user', JSON.stringify(userFromLS))// מחזיר את רשימת יוזרים העדכנית אל תוך הלוקל סטורג
            if (sessionStorage.getItem('user')) { // עדכון היוזר בתוך הסשן שטורג
                userFromSS["userName"] = userName
                userFromSS["email"] = email
                userFromSS["password"] = password
                userFromSS["city"] = city
                userFromSS["adsress"] = adsress
                userFromSS["profileImg"] = profileImg
                userFromSS["birthday"] = birthday
                userFromSS["firstname"] = firstname
                userFromSS["lastname"] = lastname
                userFromSS["housenumber"] = housenumber


                sessionStorage.setItem('user', JSON.stringify(userFromSS)) // מחזיר את היוזר המעודכן לתוך הסשן סטורג
                alert("Your details updated!")
                history.push('profile')
                return
            }

        }
        // הסשן סטורג קיים רק אם מתבצי לוגין
        else {
            alert("There are invalid fields")
        }
    }



    const uploadImage = (input) => { // העלאת תמונה והמרתה לבייס 64
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setProfileImg(e.target.result);
            }

            reader.readAsDataURL(input.files[0]); //convert to base64 string
        }
    }


    return ( //החזרת מבנה  הטופס

        <div className="register">
            <Navbar></Navbar>
            <div className="formShadow">
                <div className="form">
                    <form onSubmit={signup}>
                        <div className="fields">
                            <h1>Update User</h1>
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
                        <button className="BtnRegister" type="submit">Update</button>
                        <button className="BtnReset" type="reset">reset</button>

                    </form>
                </div>
            </div>
        </div>
    )
}





export default EditUser;