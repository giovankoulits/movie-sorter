import { nanoid } from 'nanoid';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const Ratings = ({ fs, averageRating }) => {
  const halfStar =
    parseInt(averageRating?.toString().slice(-1)) > 2 ? true : false;
  const style = { fontSize: `${fs}`, color: '#F0B855' };
  return (
    <>
      {Array.from(Array(10)).map((star, index) => {
        if (Math.round(averageRating / 10) > index) {
          if (Math.round(averageRating / 10) - index === 1 && halfStar) {
            return (
              <BsStarHalf
                className={`${fs} me-1`}
                key={nanoid()}
                style={style}
              />
            );
          }
          return (
            <BsStarFill className={`${fs} me-1`} key={nanoid()} style={style} />
          );
        } else {
          return (
            <BsStar className={`${fs} me-1`} style={style} key={nanoid()} />
          );
        }
      })}
    </>
  );
};

export default Ratings;
