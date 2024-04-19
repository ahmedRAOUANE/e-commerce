import React from 'react'
import { useParams } from 'react-router-dom'

// components
import Section from '../components/sections/Section'
import Offers from '../components/offers/Offers'

const Products = () => {
    const { category } = useParams();

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