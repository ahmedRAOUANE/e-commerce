import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// components
import Rating from "../helpers/Rating"

const Section = (props) => {
    const [products, setProducts] = useState([])

    return (
        <section className={`container`}>
            <h2 className='section-title'>{props.sectionTitle}</h2>
                <div className="cards-container">
                    {products.map(product => (
                        <Link key={product.id} to={`products/${product.category}/${product.id}`} className="card product-card">
                            <div className='card-img'>
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className='card-text'>
                                <h3 className='card-title'>{product.title}</h3>
                                <p className='card-disc'>{product.discription}</p>
                            </div>
                            <div className="card-info">
                                <Rating stars={product.rate} />
                                <small>{product.price}$</small>
                            </div>
                        </Link>
                    ))}
            </div>
        </section>
    )
}

export default Section;
