import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Badge } from 'react-bootstrap';
import Ratings from './Ratings';
const MovieCard = ({ movies, selectedMovie }) => {
  const movie = selectedMovie !== '' ? movies[selectedMovie] : null;
  const display = movie ? 'block' : 'none';
  const badgeStyle =
    'badge bg-light bg-gradient border border-info border-1 text-info px-3  py-2 rounded-pill me-2 fw-normal mb-3';

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
          <p className='p-0'>{movie?.plot || ''}</p>
        </Col>
        <h4 className='my-4' style={{ display: display }}>
          Directed by {movie?.director}
        </h4>
        <h5 style={{ display: display }} className='mb-4'>
          Average Rating: <Ratings movie={movie} />
        </h5>
        <div style={{ display: display }}>
          <Badge className={badgeStyle}>
            {`Internet Movie Database: ${movie?.ratings.imdbRating}%`}
          </Badge>
          <Badge className={badgeStyle}>
            {`Rotten Tomatoes: ${movie?.ratings.rottenTomatoesRating}%`}
          </Badge>
          <Badge className={badgeStyle}>
            {`Metacritic: ${movie?.ratings.metacriticRating}%`}
          </Badge>
        </div>
      </Row>
    </>
  );
};

export default MovieCard;
