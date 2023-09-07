import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getMoviesSearch, getMovies } from '../../features/movies/moviesSlice';
import { Col } from 'react-bootstrap';
const MoviesTable = ({ scrollToView }) => {
  const search = useSelector(getMoviesSearch);
  const movies = useSelector(getMovies);
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
                <TableRow
                  scrollToView={scrollToView}
                  key={nanoid()}
                  index={index}
                  search={search}
                  movie={movie}
                />
              ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default MoviesTable;
