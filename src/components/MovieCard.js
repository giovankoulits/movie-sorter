import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Ratings from './Ratings';
import { nanoid } from 'nanoid';
const MovieCard = ({ movies, selectedMovie }) => {
  const movie = selectedMovie !== '' ? movies[selectedMovie] : null;
  const display = movie ? 'block' : 'none';
  const badgeStyle =
    'badge bg-light bg-gradient border border-info border-1   text-secondary px-3 fs-6 py-2 rounded-pill me-2 fw-normal mb-3';

  const iterateRatings = () => {
    let badges = [];
    if (movie?.ratings) {
      for (const key in movie.ratings) {
        if (key === 'averageRating') {
          continue;
        }
        badges.push(
          <Badge
            className={badgeStyle}
          >{`${key}: ${movie.ratings[key]} %`}</Badge>
        );
      }
    }
    return badges;
  };

  function calculateRatingColor() {
    const rating = movie?.ratings.averageRating;
    if (rating) {
      if (rating < 60) return 'danger';
      if (rating >= 60 && rating < 75) return 'warning';
      if (rating >= 75) return 'success';
    }
  }

  return (
    <>
      <Row className='mb-3'>
        {movies.length > 0 && (
          <h3 className='fw-bold mb-4'>
            {movie?.title || 'No Movie Selected'}
          </h3>
        )}
        <Col xs={4} xxl={4}>
          <img
            className='img-fluid rounded'
            src={movie?.poster}
            alt={movie?.title}
          />
        </Col>
        <Col xs={8} xxl={8}>
          <p key={nanoid()} className='p-0'>
            {movie?.plot}
          </p>
        </Col>
        <div style={{ display: display }}>
          <h4 className='my-3 fw-normal'>Directed by {movie?.director}</h4>
          <h5 className='mb-4 fw-normal'>
            Average Score:{' '}
            {/*   <Ratings
              fs={'16px'}
              averageRating={movie?.ratings?.averageRating}
            /> */}
            <Badge className='ms-2 fs-5' bg={calculateRatingColor()}>
              {movie?.ratings?.averageRating}
            </Badge>
          </h5>
          {iterateRatings()}
        </div>
      </Row>
    </>
  );
};

export default MovieCard;
