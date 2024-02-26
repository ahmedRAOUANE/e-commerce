import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const NavList = ({ className }) => {
    const [ActivePage, setActivePage] = useState(0);
    const categoryList = useSelector(state => state.categorySlice.categories);

    const handleActivePage = (page) => {
        setActivePage(page)
    }
    return (
        <ul className={`navigation-bottom ${className}`}>
            {["Home", ...categoryList, "Pages", "Contact"].map((link, idx) => (
                <li onClick={() => handleActivePage(idx)} className={`button icon ${idx === ActivePage ? "active" : ""}`} key={link}>
                    <Link to={`/${link === "Home" ? '' : link}`}>{link}</Link>
                </li>
            ))}
        </ul>
    )
}

export default NavList