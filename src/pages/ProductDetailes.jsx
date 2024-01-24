import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// styles
import "../styles/productDetailes.css"
import axiosClient from '../axiosClient';

const ProductDetailes = () => {
  const [product, setProduct] = useState({
    category: "category",
    description:
      "description",
    id: 9,
    image:
      "",
    price: 64,
    rating: { rate: 0, count: 0 },
    title:
      "title",
  });

  const { id } = useParams();

  useEffect(() => {
    axiosClient.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
  }, [id])

  return (
    <div className='container product-container'>
      <div className='product-info'>
        <div className='text'>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div>
            <small>{product.rating.rate}</small>
            <small>{product.price}$</small>
          </div>
        </div>
        <div className='img'>
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className='button-container'>
        <button className='button primary'>buy now</button>
        <button className='button secondary'>inbox</button>
      </div>
    </div>
  )
}

export default ProductDetailes;