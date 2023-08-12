//bootstrap components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
//
import { nanoid } from 'nanoid';

const MovieCard = ({ movies, selectedMovie }) => {
  //Set movie according to index of table row
  const movie = selectedMovie !== '' ? movies[selectedMovie] : null;
  //Display nothing if no selected movie
  const display = movie ? 'block' : 'none';
  const badgeStyle =
    'badge bg-light bg-gradient border border-info border-1 text-secondary px-3 fs-6 py-2 rounded-pill me-2 fw-normal mb-3';

  const createRatingBadges = () => {
    let badges = [];
    if (movie?.ratings) {
      for (const key in movie.ratings) {
        if (key === 'averageRating') {
          continue;
        }
        badges.push(
          <Badge
            key={nanoid()}
            className={badgeStyle}
          >{`${key}: ${movie.ratings[key]} %`}</Badge>
        );
      }
    }
    return badges;
  };

  const calculateRatingColor = () => {
    const rating = movie?.ratings.averageRating;
    if (rating) {
      if (rating < 60) return 'danger'; //red
      if (rating >= 60 && rating < 75) return 'warning'; //yellow
      if (rating >= 75) return 'success'; //green
    }
  };

  return (
    <Row className='mb-3'>
      {movies.length > 0 && (
        <h3 className='fw-bold mb-4'>{movie?.title || 'No Movie Selected'}</h3>
      )}
      <Col xs={4} xxl={4}>
        <img
          className='img-fluid rounded'
          src={movie?.poster}
          alt={movie?.title}
        />
      </Col>
      <Col xs={8} xxl={8}>
        <p className='p-0'>{movie?.plot}</p>
      </Col>
      <div style={{ display: display }}>
        <h4 className='my-3 fw-normal'>Directed by {movie?.director}</h4>
        <h5 className='mb-4 fw-normal'>
          Average Score:{' '}
          <Badge className='ms-2 fs-5' bg={calculateRatingColor()}>
            {movie?.ratings?.averageRating}
          </Badge>
        </h5>
        {createRatingBadges()}
      </div>
    </Row>
  );
};

export default MovieCard;
