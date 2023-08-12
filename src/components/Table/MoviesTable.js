import Table from 'react-bootstrap/Table';
import { nanoid } from 'nanoid';
import TableRow from './TableRow';

const MoviesTable = ({ movies, search, selectMovie }) => {
  return (
    <Table className='pb-0 mb-0 ' hover>
      <tbody>
        {/* filter movies  according to search */}
        {movies
          .filter((movie) => {
            return search.toLowerCase() === ''
              ? movie
              : movie.title?.toLowerCase().includes(search.toLowerCase()) ||
                  movie?.releaseDate.includes(search);
          })
          .map((movie, index) => (
            <TableRow
              key={nanoid()}
              index={index}
              selectMovie={selectMovie}
              search={search}
              movie={movie}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default MoviesTable;
