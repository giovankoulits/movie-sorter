import { nanoid } from 'nanoid';
//Bootstrap icons
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const Ratings = ({ fs, averageRating }) => {
  //Add half-full star for ratings with last digit > 2
  const halfStar =
    parseInt(averageRating?.toString().slice(-1)) > 2 ? true : false;
  const style = { fontSize: `${fs}`, color: 'var(--star-color) ' };
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
            <BsStarFill
              className={`${fs} me-1 `}
              key={nanoid()}
              style={style}
            />
          );
        }
        return <BsStar className={`${fs} me-1`} style={style} key={nanoid()} />;
      })}
    </>
  );
};

export default Ratings;
