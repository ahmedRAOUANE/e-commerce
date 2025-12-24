import React from 'react';

import Star from "@mui/icons-material/Star"
// import HalfStar from "@mui/icons-material/HalfStar"
// import Star from "@mui/icons-material/Star"

const stars = [1, 2, 3, 4, 5]

const Rating = (props) => {
    return (
        <div className="rating-stars">
            <small>{props.stars}</small>
        </div>
    )
}

export default Rating;