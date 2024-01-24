import React, { useEffect, useState } from 'react';

// style
import './offers.css';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const Offers = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axiosClient.get('/products?limit=3')
            .then(response => {
                setProducts(response.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="container offers cards-container">
            {products.map(product => (
                <div key={product.id} id={product.id} className='card backgrounded-card'>
                    <div className="card-img">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="card-text">
                        <div>
                            <h3 className="card-title">{product.title}</h3>
                            <h4>{product.discount}</h4>
                        </div>
                        <div className="card-actions button-container">
                            <Link to={`/products/${product.category}/${product.id}`} className="button primary">Buy now</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Offers;