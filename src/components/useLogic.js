import { nanoid } from 'nanoid';
//hooks
import { useRef } from 'react';
//bootstrap components
import { Badge } from 'react-bootstrap';

const useLogic = () => {
  const targetElement = useRef();

  const scrollToView = () => {
    const element = targetElement;
    element.current.scrollIntoView();
  };

  const calculateRatingColor = (rating) => {
    if (rating) {
      if (rating < 60) return 'danger'; //red
      if (rating >= 60 && rating < 72) return 'warning'; //yellow
      if (rating >= 72) return 'success'; //green
    }
  };

  const createRatingBadges = (movie) => {
    let badges = [];
    let className =
      'badge text-light px-3 py-2 rounded-pill me-2 fw-normal mb-2 fw-bold bg-gradient';
    if (movie?.ratings) {
      for (const key in movie.ratings) {
        if (key === 'averageRating') {
          continue; // Skip badge for Average rating
        }
        let rating = movie.ratings[key];
        let bg = calculateRatingColor(rating);
        badges.push(
          <Badge
            key={nanoid()}
            style={{ fontSize: '13px' }}
            className={`${className} bg-${bg}`}
          >{`${key}: ${rating} %`}</Badge>
        );
      }
    }
    return badges;
  };

  return {
    calculateRatingColor,
    createRatingBadges,
    targetElement,
    scrollToView,
  };
};

export default useLogic;
