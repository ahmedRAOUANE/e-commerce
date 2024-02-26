import React from 'react'
import Modal from 'react-modal'
import ReactModal from 'react-modal'
import { useSelector } from 'react-redux';

// components
import Search from './Search'
import { Link } from 'react-router-dom';
import NavList from './NavList';

ReactModal.setAppElement("#root");

const Popup = ({ isOpen, requestClose, type }) => {
    const searchedData = useSelector(state => state.searchSlice.filteredData);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={requestClose}
            style={{
                overlay: {
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgb(0, 0, 0, 65%)',
                    zIndex: 3,
                },
                content: {
                    inset: type === 'list-nav' ? "0 50% 0 0" : '40px'
                }
            }}
        >
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
        </Modal>
    )
}

export default Popup