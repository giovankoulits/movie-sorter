//Bootstrap components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
//Hooks
import { useMovies } from './MoviesContext';

const MovieCard = () => {
  const {
    movies,
    selectedMovie,
    createRatingBadges,
    calculateRatingColor,
    targetElement,
  } = useMovies();

  const movie = selectedMovie !== '' ? movies[selectedMovie] : null;
  const display = movie ? 'block' : 'none';

  return (
    <Col className='ps-xl-4 py-3' xs={12} xl={6}>
      <Row ref={targetElement} className='mb-3'>
        {/* check that the movies array is full before displaying heading*/}
        {movies.length > 0 && (
          <h3
            style={{ color: 'var(--heading-color)' }}
            className=' mb-4  fw-bold'
          >
            {movie?.title || 'Select a movie from the table'}
          </h3>
        )}
        <Col xs={4}>
          <img
            className='img-fluid rounded'
            src={movie?.poster}
            alt={movie?.title}
          />
        </Col>
        <Col xs={8}>
          <p className='p-0'>{movie?.plot}</p>
        </Col>
        <div style={{ display: display }}>
          <h5
            style={{ color: 'var(--heading-color)' }}
            className='my-3 fw-bold'
          >
            Directed by {movie?.director}
          </h5>
          <h5
            style={{ color: 'var(--heading-color)' }}
            className='mb-4 fw-normal'
          >
            Average Score:{' '}
            <Badge
              style={{ borderRadius: '10px' }}
              className='ms-2 fs-4 bg-gradient '
              bg={calculateRatingColor(movie?.ratings.averageRating)}
            >
              {movie?.ratings?.averageRating}
            </Badge>
          </h5>
          {createRatingBadges(movie)}
        </div>
      </Row>
    </Col>
  );
};

export default MovieCard;
