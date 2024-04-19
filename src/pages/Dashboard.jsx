import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import "../styles/dashboard.css";

const optionList = [
    {
        title: "customize",
        link: "customize",
        content: "customize your owne website"
    },
    {
        title: "products",
        link: "products",
        content: "add, edit and handle your products"
    },
    {
        title: "activities",
        link: "activities",
        content: "have an eye on your products and website"
    },

]

const Dashboard = () => {
    const user = useSelector(state => state.userSlice.user)

    return (
        <div className='dashboard container box wrap'>
            <div className="info-holder box column">
                <div className="profile-photo ">
                    <img src={user.photoURL} alt="profile_photo" />
                </div>
                <h2>{user.displayName}</h2>

                <Link to={"edit-profile"} className='button'>Edit profile</Link>
            </div>
            <div className="options-holder box">
                <ul className=' box wrap'>
                    {optionList.map((el, idx) => (
                        <Link key={idx} to={el.link}>
                            <li className="card backgrounded-card">
                                <h3 className="card-title">{el.title}</h3>
                                <div className="card-body">
                                    <p className="card-text">
                                        {el.content}
                                    </p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard