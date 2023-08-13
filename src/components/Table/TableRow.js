import Ratings from '../Ratings';
import TableCell from './TableCell';

const TableRow = ({
  movie,
  search,
  handleMovieSelection,
  index,
  selectedMovie,
  scrollToView,
}) => {
  const selected = index === selectedMovie;

  return (
    <tr
      style={{ backgroundColor: selected ? 'var(--selected-bg)' : '' }}
      onClick={(e) => {
        scrollToView();
        handleMovieSelection(index);
      }}
    >
      <TableCell search={search} movieData={movie?.episodeId} />
      <TableCell search={search} movieData={movie?.title} />
      <td className='py-3 bg-transparent'>
        <Ratings fs={'14px'} averageRating={movie?.ratings.averageRating} />
      </td>
      <TableCell search={search} movieData={movie?.releaseDate} />
    </tr>
  );
};

export default TableRow;
