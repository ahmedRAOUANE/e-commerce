import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Search from './Search'
import { Link } from 'react-router-dom';
import NavList from './NavList';
import { setIsOpen, setType } from '../../store/popupSlice';
import AddProduct from './AddProduct';

const Popup = ({ isOpen, type }) => {
    const searchedData = useSelector(state => state.searchSlice.filteredData);
    const dispatch = useDispatch()

    const closePopup = () => {
        dispatch(setIsOpen(false));
        dispatch(setType(""));
    }

    return isOpen && (
        <div
            className='overlay full-width'
            onClick={closePopup}
            style={{
                position: 'absolute',
                top: "0",
                left: "0",
                backgroundColor: 'rgb(0, 0, 0, 65%)',
                zIndex: 300,
                height: '100%'
            }}
        >
            <div className="window" style={{
                inset: type === 'list-nav' && "0 50% 0 0",
                height: type !== 'list-nav' && "80%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: 'white',
                padding: "10px",
                overflow: "scroll",
                borderRadius: "10px",
                boxShadow: "var(--box-shadow)",
            }}>
                {type === 'window-search' && (
                    <div className="popup window-search container">
                        <Search />
                        <div className="cards-container">
                            {searchedData.map(card => (
                                <Link to={`/products/${card.category}/${card.id}`} className="card product-card">
                                    <div className="card-img">
                                        <img src={card.image} alt={card.title} />
                                    </div>
                                    <div className="card-text">
                                        <h3 className="card-title">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <div className="card-info">
                                        <div className="rating-stars">
                                            <small></small>
                                            <small>{card.rating.rate}</small>
                                        </div>
                                        <small>{card.price}</small>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                {type === 'search' && (
                    <div className="popup window-search">
                        <div className="cards-container">
                            {searchedData.map(card => (
                                <a className="card product-card" href="/products/electronics/9" previewlistener="true">
                                    <div className="card-img">
                                        <img src={card.image} alt={card.title} />
                                    </div>
                                    <div className="card-text">
                                        <h3 className="card-title">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <div className="card-info">
                                        <div className="rating-stars">
                                            <small></small>
                                            <small>{card.rating.rate}</small>
                                        </div>
                                        <small>{card.price}</small>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                {type === 'window-inbox' && (
                    <div className="popup window-inbox">inbox</div>
                )}
                {type === 'window-help' && (
                    <div className="popup window-help">help</div>
                )}
                {type === 'list-nav' && (
                    <div className="popup list-nav">
                        <h1>AStore</h1>
                        <NavList />
                    </div>
                )}
                {type === "window-addProduct" && (
                    <AddProduct />
                )}
            </div>
        </div>
    )
}

export default Popup