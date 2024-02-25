import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import Section from '../components/sections/Section'
import Offers from '../components/offers/Offers'
import axiosClient from '../axiosClient'

const Products = () => {
    const { category } = useParams();

    useEffect(() => {
        axiosClient.get(`/products/${category}`)
    })
    return (
        <main>
            <Offers />
            <Section category={category} sectionTitle={category} />
            <Section category={category} sectionTitle={category} />
            <Section category={category} sectionTitle={category} />
            <Section category={category} sectionTitle={category} />
        </main>
    )
}

export default Products