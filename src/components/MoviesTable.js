import Table from 'react-bootstrap/Table';
import { nanoid } from 'nanoid';
import Ratings from './Ratings';
import Td from './Td';

const MoviesTable = ({ movies, search, selectMovie }) => {
  return (
    <Table className='pb-0 mb-0 ' hover>
      <tbody>
        {movies
          .filter((movie) => {
            return search.toLowerCase() === ''
              ? movie
              : movie.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((movie, index) => (
            <tr key={nanoid()} onClick={(e) => selectMovie(index)}>
              <Td search={search} movieData={movie.episodeId} />
              <Td search={search} movieData={movie.title} />
              <Td search={search} movieData={movie.releaseDate} />

              <td className='py-3'>
                <Ratings
                  fs={'16px'}
                  averageRating={movie?.ratings.averageRating}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default MoviesTable;
