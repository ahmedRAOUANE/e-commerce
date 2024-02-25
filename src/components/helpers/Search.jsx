import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../axiosClient';
import { setFilteredData } from '../../features/searchSlice';

// icons 
import SearchIcon from '@mui/icons-material/Search';

const Search = ({className}) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const categories = useSelector(state => state.categorySlice.categories);
    const [selectedCategory, setSelectedCategory] = useState('electronics');

    useEffect(() => {
        const getProductsByCategory = async () => {
            axiosClient.get(`/products/category/${selectedCategory}`)
                .then(async (res) => {
                    const data = await res.data.filter(product => product.title.includes(searchTerm));
                    dispatch(setFilteredData(data));
                })
        }

        const timer = setTimeout(getProductsByCategory, 500);
        return () => clearTimeout(timer);
    }, [selectedCategory, searchTerm, categories, dispatch]);

    return (
        <div className={`box input-container ${className}`}>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className='button icon search-by'>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <div className='box'>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='text' placeholder='search' />
                <SearchIcon />
            </div>
        </div>
    )
}

export default Search