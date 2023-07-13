import React from 'react'



function DesctopHeader() {
  return (
        <nav className="navbar navbar-expand navbar-dark d-none d-md-block" aria-label="Tenth navbar example">
            <div className="container">
                <div className="collapse navbar-collapse justify-content-center" id="navbarsExample08">
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
            </div>
        </nav>
  )
}

export default DesctopHeader