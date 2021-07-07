
const FormField = (props) => {

    const ifimage = () => {
        //props=נתונים שמועברים לקומפוננטה מקופמפוננטה אחרת 
        if (props.targetImg === "") {//  בדיקה אם לא העלו עדיין תמונה
            return ""
        }
        else {// אם כן העלו תמונה יחזיר את התמונה
            return props.targetImg
        }
    }
    // בדיקה מה סוג הקובץ 
    switch (props.type) {
        case 'list':// אם התיבה היא מסוג רשימה נחבר לה את רשימת הערים.
            return (
                <div className="field">
                    <datalist id={props.listId}>
                        {props.data.map(item => <option value={item.name}> {item.name} </option>)} {/*הצגת כל הערים ברשימה */}
                    </datalist>
                    <input placeholder={props.name} type="text" list={props.listId} onInput={(event) => { props.action(event.target.value) }} />
                </div>
            )
        case 'file':// אם התיבה היא מסוג קובץ
            if (ifimage() !== "") {// הפעלת הבדיקה אם יש תמונה או אין 
                return (
                    <div className="field"> {/* אם יש תמונה יחזיר את התמונה מתחת לתיבה  */}
                        <input placeholder={props.name} type={props.type} onChange={(event) => { props.action(event.target) }}></input>
                        <img className={props.className} src={props.targetImg} alt="" />
                    </div>
                )
            }
            else {// במידה ואין תמונה לא נתמש בכלל  תמונה 
                return <div className="field">
                    <input placeholder={props.name} type={props.type} onChange={(event) => { props.action(event.target) }}></input>
                </div>


            }

        default:
            return (// מחזיר את כל מה שהוא לא תמונה או קובץ
                <div className="field">

                    <input placeholder={props.name} type={props.type} onInput={(event) => { props.action(event.target.value) }} />
                </div>
            )
    }
}

export default FormField;