import React from 'react'
import './style.css'
import Stars from './Stars'

interface ContainerProps {  }

const RatingContainer: React.FC<ContainerProps> = () => {
    return (
        <div className='ratingContainer'>
            <p>Calificación:</p>
            <Stars />
        </div>
    )
}

export default RatingContainer