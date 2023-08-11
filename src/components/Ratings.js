import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { nanoid } from 'nanoid';

const Ratings = ({ movie, movies }) => {
  return (
    <>
      {Array.from(Array(10)).map((star, index) => (
        <FaStarHalfAlt
          className='fs-6'
          key={nanoid()}
          style={{
            color: `${
              Math.round(movie?.ratings.averageRating / 10) > index
                ? '#F0B53D'
                : 'gray'
            } `,
          }}
        />
      ))}
    </>
  );
};

export default Ratings;
