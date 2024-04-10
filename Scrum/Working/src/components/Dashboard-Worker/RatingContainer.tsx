import './style.css'

interface ContainerProps {  }

const RatingContainer: React.FC<ContainerProps> = () => {
    return (
        <div className='ratingContainer'>
            <p>Rating</p>
            <p>Estrellitas</p>
        </div>
    )
}

export default RatingContainer