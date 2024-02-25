import React, { useEffect, useState } from 'react'

// components
import Slider from '../components/slider/Slider'
import Offers from '../components/offers/Offers'
import Section from '../components/sections/Section'
import axiosClient from '../axiosClient'

const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosClient.get("/products/categories").then(response => {
            setCategories(response.data);
        })
    }, [])

    return (
        <main>
            <Slider />
            <Offers />
            {categories.map(category => (
                <Section key={category} category={category} sectionTitle={category} />
            ))}
        </main>
    )
}

export default HomePage