import Ratings from '../Ratings';
import TableCell from './TableCell';
const TableRow = ({ movie, search, selectMovie, index }) => {
  return (
    <tr onClick={(e) => selectMovie(index)}>
      <TableCell search={search} movieData={movie?.episodeId} />
      <TableCell search={search} movieData={movie?.title} />
      <TableCell search={search} movieData={movie?.releaseDate} />
      <td className='py-3'>
        <Ratings fs={'16px'} averageRating={movie?.ratings.averageRating} />
      </td>
    </tr>
  );
};

export default TableRow;
