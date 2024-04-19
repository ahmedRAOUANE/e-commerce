import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

// components
import Slider from '../components/slider/Slider'
import Offers from '../components/offers/Offers'
import Section from '../components/sections/Section'

const HomePage = () => {
    const user = useSelector((state) => state.userSlice.user);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!user) {
            // then get data from fakestore api


        }
    }, [user])

    return (
        <main>
            {user ? (
                <>
                    <Slider />
                    <Offers />
                    {categories.map(category => (
                        <Section key={category} category={category} sectionTitle={category} />
                    ))}
                </>
            ) : (
                <div>
                    <h1>
                        you have no data
                    </h1>
                    <p className='text-center'>login or register first and add some products</p>
                </div>
            )}
        </main>
    )
}

export default HomePage