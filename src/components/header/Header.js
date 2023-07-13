import React, { useState } from 'react';

// svvg icons
import { SVGs } from '../layout/SVGs';

// components
import Button from "./../layout/Button";
import DesctopHeader from './DesctopHeader';
import Modal from '../layout/Modal';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const navHandler = (v) => {
        setShowNav(!showNav && v);
    }

    return (
        <header className='bg-dark d-md-block desctop'>
            <DesctopHeader />
            <div>
                <div
                    className='text-light d-flex align-items-center justify-content-between justify-content-md-center'
                >
                    <Button 
                        className="navbar-toggler d-md-none" 
                        type="button" 
                        dataBsToggle="collapse" 
                        dataBsTarget="#navbarsExample08" ariaControls="navbarsExample08" 
                        ariaExpanded="false" 
                        ariaLabel="Toggle navigation"
                        onClick={navHandler}
                    >
                        <span className="navbar-toggler-icon">
                            {showNav? "X" : SVGs.bars}
                        </span>
                    </Button>
                    <h2 className='text-center'>uncrate</h2>
                    <div className='d-flex align-items-center'>
                        <Button
                            className='text-light'
                        >
                            {SVGs.searchIcon}
                        </Button>
                        <Button
                            className='text-light'
                        >
                            {SVGs.cartShoping}
                        </Button>
                    </div>
                </div>
            </div>
            <Modal isOpen={showNav} onClose={navHandler} >
                <div className='m-auto w-100 p-3'>
                    <ul className="navbar-nav d-flex justify-content-between w-100">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">follow @uncrate</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">uncrate.com</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">uncrate.supply</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">uncrate.tv</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown" aria-expanded="false">language: </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">english</a></li>
                                <li><a className="dropdown-item" href="/">espano</a></li>
                                <li><a className="dropdown-item" href="/">francais</a></li>
                                <li><a className="dropdown-item" href="/">deutsch</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Modal>
        </header>
    )
}

export default Header