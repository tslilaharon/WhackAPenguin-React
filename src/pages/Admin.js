import React from 'react';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom';


const Admin = () => {

    const history = useHistory()

    if (localStorage.getItem('edit')) {
        localStorage.removeItem('edit')
    }
    const deleteuser = (user) => // פונקציית מחיקת יוזר 
    {
        let userfromStorage = JSON.parse(localStorage.getItem('user')) // יובוא יוזרים מתוך הלוקל סטורג
        let userscopy = [] // יצירת מערך  העתקה ריק שאליו נעתיק את כל היוזרים חוץ מהיוזר אותו נרצה למחוק.
        for (let i = 0; i < userfromStorage.length; i++) { // מעבר על כל היוזרים מתוך הלוקל סטורג 
            if (userfromStorage[i].email !== user["email"])// אם המייל של היוזר מתוך הלוקל לא  שווה למייל של היוזר אותו אנחנו רוצים למחוק 
            {
                userscopy.push(userfromStorage[i]) // הוספה של כל היוזרים שאין להם את אותו המייל של היוזר שאנו רוצים למחוק
            }

        }
        localStorage.setItem('user', JSON.stringify(userscopy))//  החזרת היוזרים בתוך הלוקל סטורג 
        window.location.reload();// טעינה מחדש של העמוד

    }
    const edituser = (user) =>// פונקציית עריכת היוזר
    {
        let user1 = user;
        localStorage.setItem('edit', JSON.stringify(user1))// יצירת יוזר בשביל עריכה בתוך הלוקל סטוקרג כדי שנדע על איזה יוזר לבצע את העריכה 
        history.push("Edituser")
        return
    }


    if (sessionStorage.getItem('admin'))// אם האדמין מחובר
    {
        if (localStorage.getItem('user'))// בדיקה אם יש יוזרים במערכת כדי להציגם בדך של האדמין
        {
            let users = JSON.parse(localStorage.getItem('user'))// יבוא היוזרים מתוך הלוקל סטורג
            return (
                <>
                    <Navbar />
                    <table className="tableAdmin">
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Email</th>
                            <th>Adress</th>
                            <th>Birthday</th>
                            <th>Full name</th>
                            <th>UserName</th>
                            <th>Image</th>

                        </tr>


                        {users.map(u => { //  עובר על כל יוזר כמו בלולאת פוראיטש
                            return <> <tr>
                                {/* לכל יוזר מחזיר את הפרטים שלו*/}
                                <td><i class="fas fa-pencil-alt" onClick={() => { edituser(u) }}></i></td>
                                <td><i class="fas fa-trash-alt" onClick={() => { deleteuser(u) }}></i></td>
                                <td>{u.email}</td>
                                <td>{u.adsress}</td>
                                <td>{u.birthday}</td>
                                <td>{u.firstname + " " + u.lastname}</td>
                                <td>{u.userName}</td>
                                <td><img className="imagetable" src={u.profileImg} alt="" width="60px" height="60px" ></img></td>

                            </tr>
                            </>
                        })
                        }

                    </table>

                </>


            )
        }

        else { // במידה ואין יוזרים בלוקל סטורג יחזיר טבלה ריקה
            return (
                <>
                    <Navbar />
                    <table className="tableAdmin">
                        <tr>
                            <th>Admin</th>
                            <th>Email</th>
                            <th>Adress</th>
                            <th>Birthday</th>
                            <th>Full name</th>
                            <th>UserName</th>
                            <th>Image</th>

                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                </>


            )

        }

    }
    else { // במידה ולא מחובר בתור אדמין מתבקש להתחבר לאדמין.
        return (
            <>
                <Navbar />
                <h1 className="notadmin">Please login with a Admin</h1>
            </>


        )

    }
}



export default Admin;
