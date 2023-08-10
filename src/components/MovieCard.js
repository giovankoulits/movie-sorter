import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { nanoid } from 'nanoid';

const MovieCard = ({ movies, selectedMovie }) => {
  const movie = selectedMovie !== '' ? movies[selectedMovie] : null;
  const display = movie ? 'block' : 'none';

  return (
    <>
      <Row className='mb-3'>
        <Col xs={5}>
          <img
            className='img-fluid rounded'
            style={{ width: '100%' }}
            src={movie?.poster}
            alt=''
          />
        </Col>
        <Col xs={7}>
          <h3>{movie?.title || 'No Movie Selected'}</h3>
          <p>{movie?.plot || ''}</p>
        </Col>
      </Row>
      <h5 style={{ display: display }} className='mb-4'>
        Average Rating:{' '}
        {Array.from(Array(10)).map((star, index) => (
          <FaStar
            key={nanoid()}
            style={{
              color: `${
                Math.round(movie?.ratings.averageRating / 10) > index
                  ? 'orange'
                  : 'gray'
              } `,
            }}
          />
        ))}
      </h5>
      <div style={{ display: display }}>
        <Badge className='badge bg-success  px-3  py-2 rounded-pill me-3'>
          {`Metacritic: ${movie?.ratings.metacriticRating}%`}
        </Badge>
        <Badge className='badge bg-danger  px-3 py-2  rounded-pill me-3'>
          {`Rotten Tomatoes: ${movie?.ratings.rottenTomatoesRating}%`}
        </Badge>
        <Badge className='badge bg-warning px-3   py-2 rounded-pill   '>
          {`IMDB: ${movie?.ratings.imdbRating}%`}
        </Badge>
      </div>
    </>
  );
};

export default MovieCard;
