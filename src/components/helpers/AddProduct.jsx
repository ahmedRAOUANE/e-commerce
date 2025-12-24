import { v4 as uuidv4, v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { db, storage } from "../../firebase";
import React, { useRef, useState } from 'react';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddProduct = () => {
    const user = useSelector(state => state.userSlice.user);

    const nameRef = useRef()
    const descRef = useRef()
    const priceRef = useRef()
    const countRef = useRef()
    const categoryRef = useRef()
    const [displayedImgs, setDisplayedImgs] = useState([])

    const addProduct = async (e) => {
        e && e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            desc: descRef.current.value,
            price: priceRef.current.value,
            count: countRef.current.value,
            imgs: displayedImgs,
            category: categoryRef.current.value,
            id: `${user.uid}_${uuidv4()}`
        }

        try {
            // upload the product to privet folder
            const productDocRef = doc(db, "privetProducts", user.uid);
            const productDoc = await getDoc(productDocRef);

            if (productDoc.exists()) {
                await updateDoc(productDocRef, {
                    products: arrayUnion(payload)
                })
            } else {
                await setDoc(productDocRef, {
                    products: [payload]
                })
            }
        } catch (err) {
            console.log("Error uploading paylaod: ", err);
        }
    }

    const addImgsURLs = async (e) => {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const img = files[i];
            const imageName = `${uuidv4()}_${img.name}`;

            const imgRef = ref(storage, `products/${user.uid}/imgs/${imageName}`);
            try {
                await uploadBytes(imgRef, img);

                const url = await getDownloadURL(imgRef);

                setDisplayedImgs(prev => [...prev, url]);

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        addProduct();
    }

    const removeImage = async (e) => {
        e.preventDefault();
        const imgUrl = e.target.id;

        // it adds the class to the correct node and its next parent
        const parentNode = e.currentTarget.parentNode;
        parentNode.classList.add("hide");

        try {
            const imgRef = ref(storage, imgUrl);

            await deleteObject(imgRef);

            setDisplayedImgs(prevImgs => prevImgs.filter(img => img !== imgUrl));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }

    return (
        <div>
            <h2 className="title text-center">Add Product</h2>
            <div className="box column">
                <form className="box column">
                    <input required ref={nameRef} type="text" placeholder='product name' />
                    <input required ref={descRef} type="text" placeholder='product description' />
                    <div className="box">
                        <input required ref={priceRef} type="number" placeholder='price' />
                        <input required ref={countRef} type="number" placeholder='count' />
                    </div>
                    <input required ref={categoryRef} type="text" placeholder='product category' />
                    <div className="box product-imgs full-width">
                        <label htmlFor="imgs" className='button full-width'>add image</label>
                        <input required onChange={(e) => addImgsURLs(e)} type="file" id='imgs' multiple className='hide' />
                    </div>

                    <div className="diplay-imgs box wrap">
                        {displayedImgs.map((img, idx) => (
                            <div className='image-container' key={idx} style={{ position: "relative" }}>
                                <button id={img} className='x' onClick={removeImage}>X</button>
                                <img src={img} alt={`img-${idx + 1}`} />
                            </div>
                        ))}
                    </div>

                    <button onClick={addProduct} className='full-width'>add product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct