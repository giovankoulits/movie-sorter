import Table from 'react-bootstrap/Table';
import { nanoid } from 'nanoid';
import { FaStar } from 'react-icons/fa';

const MoviesTable = ({ movies, search, selectMovie }) => {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>EPISODE</th>
          <th>TITLE</th>
          <th>RELEASE DATE</th>
          <th>RATING</th>
        </tr>
      </thead>
      <tbody>
        {movies
          .filter((movie) => {
            return search.toLowerCase() === ''
              ? movie
              : movie.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((movie, index) => (
            <tr key={nanoid()} onClick={(e) => selectMovie(index)}>
              <td>EPISODE: {movie.episodeId}</td>
              <td>{movie.title}</td>
              <td>{movie.releaseDate}</td>
              <td className='movie-rating'>
                {movie?.ratings.averageRating}
                {/*    {Array.from(Array(10)).map((star) => (
                  <FaStar key={nanoid()} style={{ color: 'orange' }} />
                ))} */}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default MoviesTable;
