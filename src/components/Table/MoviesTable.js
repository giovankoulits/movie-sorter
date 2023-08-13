import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import { nanoid } from 'nanoid';

const MoviesTable = ({
  movies,
  search,
  handleMovieSelection,
  selectedMovie,
  scrollToView,
}) => {
  return (
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
                handleMovieSelection={handleMovieSelection}
                search={search}
                movie={movie}
                selectedMovie={selectedMovie}
              />
            ))}
      </tbody>
    </Table>
  );
};

export default MoviesTable;
