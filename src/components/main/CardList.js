import React, { useState, useEffect } from 'react';

// css style
import style from './CardList.module.css'

// components
import Card from "../layout/Card";
import Button from '../layout/Button';

const CardList = () => {
    const [products, setProducts] = useState([]);

    const data = [
        {
        "id": 1,
        "name": "iPhone 12",
        "image": "iphone12.jpg",
        "description": "The latest iPhone with a stunning design and powerful features.",
        "price": 999.99
      },
      {
        "id": 2,
        "name": "Samsung Galaxy S21",
        "image": "galaxys21.jpg",
        "description": "A flagship Android phone with a brilliant display and high-performance capabilities.",
        "price": 899.99
      },
      {
        "id": 3,
        "name": "Sony PlayStation 5",
        "image": "ps5.jpg",
        "description": "The next-generation gaming console for immersive gaming experiences.",
        "price": 499.99
      },
      {
        "id": 4,
        "name": "Apple MacBook Pro",
        "image": "macbookpro.jpg",
        "description": "A powerful laptop with a stunning Retina display and advanced performance.",
        "price": 1499.99
      },
      {
        "id": 5,
        "name": "Canon EOS R5",
        "image": "eosr5.jpg",
        "description": "A professional-grade mirrorless camera with high-resolution image quality and advanced features.",
        "price": 3799.99
      },
      {
        "id": 6,
        "name": "Samsung QLED Q90R",
        "image": "qledq90r.jpg",
        "description": "A premium 4K QLED TV with exceptional picture quality and smart features.",
        "price": 2499.99
      },
      {
        "id": 7,
        "name": "Nintendo Switch",
        "image": "switch.jpg",
        "description": "A versatile gaming console that can be used both as a handheld and a home console.",
        "price": 299.99
      },
      {
        "id": 8,
        "name": "DJI Mavic Air 2",
        "image": "mavicair2.jpg",
        "description": "A compact drone with a powerful camera and intelligent flight modes for capturing stunning aerial footage.",
        "price": 799.99
      },
      {
        "id": 9,
        "name": "Bose QuietComfort 35 II",
        "image": "qc35ii.jpg",
        "description": "Premium wireless headphones with industry-leading noise cancellation and immersive sound quality.",
        "price": 349.99
      },
      {
        "id": 10,
        "name": "Fitbit Charge 4",
        "image": "fitbitcharge4.jpg",
        "description": "An advanced fitness tracker with built-in GPS and heart rate monitoring.",
        "price": 149.99
      }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('./product.json');
                const data = await response.json();
                setProducts(data.products)
            } catch (err) {
                <div>no data found</div>
            }
        };

        fetchProducts();
    }, [])

  return (
    <div className={`d-flex ${style.cardHolder}`}>
        {data.map(product => (
            <Card className={`${style.card}`} key={product.id} id={product.id} title={product.name}>
                <p>{ product.description }</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <p className='d-flex align-items-center m-0'>{product.price}</p>
                    <Button>show more...</Button>
                </div>
            </Card>
        )
        )}
    </div>
  )
}

export default CardList