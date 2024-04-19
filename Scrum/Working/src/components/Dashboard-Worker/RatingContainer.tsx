import React from 'react'
import './style.css'
import Stars from './Stars'

interface ContainerProps { 
    rating: number
 }

const RatingContainer: React.FC<ContainerProps> = ({ rating }) => {
    return (
        <div className='ratingContainer'>
            <p>Calificación:</p>
            <Stars rating={rating}/>
        </div>
    )
}

export default RatingContainer