import React, { useCallback, useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';

// icons
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// styles
import './slider.css';
import { Link } from 'react-router-dom';


const Slider = () => {

    const [images, setImages] = useState(
        [
            {
                label: "San Francisco – Oakland Bay Bridge, United States",
                imgPath:
                    "C:Users/Administrator/Desktop/reacte-commerce/src/assets/imgs/img1.jpg",
                id: 1,
                discount: "save 10% sale",
                discription: "is good for you!",
                category: "watches",
            },
            {
                label: "Bird",
                imgPath: "srcassetsimgsimg2.jpg",
                category: "electronics",
                id: 2,
            },
            {
                label: "Bali, Indonesia",
                category: "blog",
                imgPath: "srcassetsimgsimg3.jpg",
                id: 3,
            },
            {
                label: "Goč, Serbia",
                category: "electronics",
                imgPath: "srcassetsimgsimg4.jpg",
                id: 4,
            },
        ]
    );
    const [activeStep, setAciveStep] = useState(0);

    const maxSteps = images.length - 1;

    const [currentStep, setCurrentStep] = useState(activeStep);

    const handleNext = useCallback(() => {
        setCurrentStep(prev => maxSteps - prev > 0 ? prev + 1 : 0)
        setAciveStep(prev => prev + 1)
    }, [maxSteps])

    const handleBack = () => {
        setCurrentStep(prev => maxSteps - prev < maxSteps ? prev - 1 : maxSteps)
        setAciveStep(prev => prev - 1)
    };

    const handleStepChange = (step) => {
        setCurrentStep(step)
    };

    useEffect(() => {
        axiosClient.get('/products?limit=4')
            .then(response => {
                setImages(response.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        const timer = setInterval(handleNext, 3000);

        return () => clearInterval(timer);
    }, [handleNext])

    return (

        <div className="container slider-container">
            <div className="text-container">
                <h2>{images[currentStep].title}</h2>
                <div className="button-container"><Link to={`/products/${images[currentStep].category}/${images[currentStep].id}`} className="button primary">Buy now</Link></div>
            </div>
            <div className="imgs-container">
                <img src={images[currentStep].image} alt={images[currentStep].label} />

                <div className="button-container controller-container">
                    <button className="controller" onClick={handleBack}><KeyboardArrowLeft /></button>
                    <button className="controller" onClick={handleNext}><KeyboardArrowRight /></button>
                </div>
            </div>
            <ul className="bullet-container">
                {images.map((bulett, idx) => (
                    <li key={idx} onClick={() => handleStepChange(idx)} className={bulett.id === currentStep + 1 ? "active" : ''}></li>
                ))}
            </ul>
        </div>
    );
}

export default Slider;