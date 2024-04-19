import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData } from '../../store/searchSlice';

// icons 
import SearchIcon from '@mui/icons-material/Search';

const Search = ({className}) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const categories = useSelector(state => state.categorySlice.categories);
    const [selectedCategory, setSelectedCategory] = useState('electronics');

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