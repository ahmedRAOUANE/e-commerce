import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { setIsOpen, setType } from '../store/popupSlice';

const AddProducts = () => {
  const user = useSelector(state => state.userSlice.user);
  const publicProducts = useSelector(state => state.productsSlice.products);
  const isOpen = useSelector(state => state.popupSlice.isOpen);

  const [privetProducts, setPrivetProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = async () => {
      try {
        const productsDocRef = doc(db, "privetProducts", user.uid);
        const productsDoc = await getDoc(productsDocRef);

        if (!productsDoc.exists()) {
          setDoc(productsDocRef, {
            products: []
          })
        } else {
          setPrivetProducts(productsDoc.data().products);
        }
      } catch (err) {
        console.log("Error getting products: ", err);
      }
    }

    return () => unsub();
  }, [user.uid])

  const openPopup = () => {
    dispatch(setType("window-addProduct"));
    dispatch(setIsOpen(!isOpen));
  }

  const editProduct = (id) => {
    openPopup();
    console.log("product id: ", id);
  }

  return (
    <div className='container'>
      {privetProducts.length === 0
        ? (
          <div className="box">
            <h2>you have no products yet</h2>
            <button onClick={openPopup}>add products</button>
          </div>
        )
        : (
          <div className="box column">
            <div className="box wrap">
              {privetProducts.map(product => (
                <div key={product.id} className="card product-card box column">
                  <div className="card-image">
                    <img src={product.imgs[0]} alt={product.name} />
                  </div>
                  <div className="box column card-body full-width">
                    <h3 className='card-title text-start full-width'>{product.name}</h3>
                    <div className="card-text text-start full-width">
                      <p>{product.desc}</p>
                    </div>
                    <div className="card-actions box full-width">
                      <button onClick={() => editProduct(product.id)} className="edit">Edit</button>
                      <button className="edit">Public</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={openPopup}>add products</button>
          </div>
        )}
    </div>
  )
}

export default AddProducts