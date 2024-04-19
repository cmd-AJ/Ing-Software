import React from 'react';
import './stars.css';

interface ContainerProps {
  rating : number
}

const Stars: React.FC<ContainerProps> = ({ rating }) => {
  return (
    <>
      <svg style={{ display: 'none' }}>
        <defs>
          <symbol id="fivestars">
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
              fill="white"
              fillRule="evenodd"
            />
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
              fill="white"
              fillRule="evenodd"
              transform="translate(24)"
            />
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
              fill="white"
              fillRule="evenodd"
              transform="translate(48)"
            />
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
              fill="white"
              fillRule="evenodd"
              transform="translate(72)"
            />
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
              fill="white"
              fillRule="evenodd"
              transform="translate(96)"
            />
          </symbol>
        </defs>
      </svg>
      <div className="rating">
        <progress className="rating-bg" value={rating} max="5"></progress>
        <svg>
          <use xlinkHref="#fivestars" />
        </svg>
      </div>
    </>
  );
};

export default Stars;
