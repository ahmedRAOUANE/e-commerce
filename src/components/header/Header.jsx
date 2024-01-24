import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// icons
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

import './header.css';
import axiosClient from '../../axiosClient';

const list = localStorage.getItem('TOKEN') != null ? (
    ["My cart", "check out", "logout"].map((link) => (
        <li key={link}>
            <Link to={`/${link}`}>{link}</Link>
        </li>
    ))
) : (
    ["login", "register"].map((link) => (
        <li key={link}>
            <Link to={`/${link}`}>{link}</Link>
        </li>
    ))
)

const Header = () => {
    const [ActivePage, setActivePage] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const { navCatigory } = useParams();

    const handleActivePage = (page) => {
        setActivePage(page)
    }

    useEffect(() => {
        axiosClient.get('/products/categories')
            .then(response => {
                setCategoryList(response.data);
            })
    })

    return (
        <header>
            <div className='container'>
                <div className='navigation-top'>
                    <div className='button-container'>
                        <button className='icon'>$USD</button>
                        <select className='button icon'>
                            <option value="english">english</option>
                            <option value="arabic">arabic</option>
                        </select>
                    </div>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className='navigation-center'>
                    <div>
                        <h2><Link to='/'>Logo</Link></h2>
                    </div>
                    <div className='input-container button-container'>
                        <select className='button icon search-by'>
                            {categoryList.map(category => (
                                <option key={category} selected={category === navCatigory && true} value={category}>{category}</option>
                            ))}
                        </select>
                        <div>
                            <input className='text' placeholder='search' />
                            <SearchIcon />
                        </div>
                    </div>
                    <div className='button-container'>
                        <button className='search-btn icon'><SearchIcon /></button>
                        <Link to='/inbox' className='button icon'><InboxIcon /></Link>
                        <Link to='/help' className='button icon'><HeadsetMicIcon /></Link>
                    </div>
                </div>
                <ul className='navigation-bottom'>
                    {["Home", ...categoryList, "Pages", "Contact"].map((link, idx) => (
                        <li onClick={() => handleActivePage(idx)} className={idx === ActivePage ? "active" : ""} key={link}>
                            <Link to={`/${link === "Home" ? '' : link}`}>{link}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header;
