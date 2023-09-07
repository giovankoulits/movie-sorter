//Components
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import { Col } from 'react-bootstrap';
//
import { nanoid } from 'nanoid';
//Hooks
import { useMovies } from '../MoviesContext';

const MoviesTable = () => {
  const { movies, search } = useMovies();
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
