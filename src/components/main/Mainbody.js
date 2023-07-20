import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Grid} from "@mui/core"

// components
import CardList from './CardList';
import Button from '../layout/Button';

// icons
import { SVGs } from '../layout/SVGs';

// css style
import style from "./MainBody.module.css";

const Mainbody = () => {

  const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const response = await axios.get('https://fakestoreapi.com/products');
          setProducts(response.data);
        };

      fetchProducts();
    }, [])

  const categorizedData = {};

  products.forEach((object) => {
    const { category } = object;

    
    if (!categorizedData[category]) {
      categorizedData[category] = [];
    }
    
    categorizedData[category].push(object);
  });
  
  // console.log(Object.values(categorizedData));
  // const categorys  = ;
  console.log({...categorizedData});
  
  return (
    <main>
      <Grid>

      </Grid>
      {/* {console.log(Object.keys(categorizedData))} */}
      <h3>hello there</h3>
      <div className={`${style.storiesHolder}`}>
        <Button className={`${style.prevBtn} d-none d-md-block`}>{ SVGs.chevronLeft }</Button>
          <CardList />
        <Button className={`${style.nextBtn} d-none d-md-block`}>{ SVGs.chevronRight }</Button>
      </div>
    </main>
  )
}

export default Mainbody;


// child arrays each array for one category
// store child arraye in variables
// push vars in new array
// pass the new array to component
// make the  components loop the new array