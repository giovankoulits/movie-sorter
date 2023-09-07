//Components
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import { Col } from 'react-bootstrap';
//hooks
import { useMovies } from '../MoviesContextReducer';
//
import { nanoid } from 'nanoid';

const MoviesTable = () => {
  const { state } = useMovies();
  const { movies, search } = state;
  return (
    <Col xs={12} xl={6}>
      <Table className='pb-0 mb-0 '>
        <tbody>
          {/* filter movies  according to search */}
          {movies.length > 0 &&
            movies
              .filter((movie) => {
                return search.toLowerCase() === ''
                  ? movie
                  : movie.title?.toLowerCase().includes(search.toLowerCase()) || //parse letters
                      movie?.releaseDate.includes(search); //parse numbers
              })
              .map((movie, index) => (
                <TableRow key={nanoid()} index={index} movie={movie} />
              ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default MoviesTable;
