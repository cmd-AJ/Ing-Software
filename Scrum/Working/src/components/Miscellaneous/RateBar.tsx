import React, { useEffect, useState } from 'react';
import Stars from './Stars';

interface ContainerProps {
    rating: number;
}

const RateBar: React.FC<ContainerProps> = ({ rating }) => {
    const [rateArray, setRateArray] = useState<Array<number>>([]);

    useEffect(() => {
        const newRateArray: Array<number> = [];

        for (let i = 0; i < Math.floor(rating); i++) {
            newRateArray.push(1); // Represents a full star
        }

        if (parseFloat((rating % 1).toFixed(2)) !== 0) {
            newRateArray.push(parseFloat((rating % 1).toFixed(2))); // Represents a partial star
        }

        while (newRateArray.length !== 5) {
            newRateArray.push(0); // Represents an empty star
        }

        setRateArray(newRateArray);
    }, [rating]);

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {rateArray.map((rate, index) => (
                <Stars key={index} rating={rate} />
            ))}
        </div>
    );
}

export default RateBar;
