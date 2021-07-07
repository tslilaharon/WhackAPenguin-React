import React from 'react';
import Navbar from '../components/Navbar';
import backgroundvideo from "./video/snow.mp4";




const Home = () => {

    if (localStorage.getItem('edit'))// לוודא שלא נשאר יוזר במצב עריכה 
    {
        localStorage.removeItem('edit')
    }

    return (
        <>

            <Navbar />
            <video id="video" autoPlay loop muted>
                <source src={backgroundvideo} type='video/mp4' />
            </video>
            <div className="titlehome">
                <h2 className="h2home">whack<br />a<br /><span>penguin</span></h2>
            </div>

        </>

    )
}
export default Home;