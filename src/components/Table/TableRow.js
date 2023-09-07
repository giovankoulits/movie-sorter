import Ratings from '../Ratings';
import TableCell from './TableCell';
//hooks
import { useMovies } from '../MoviesContextReducer';

const TableRow = ({ movie, index }) => {
  const { dispatch, ACTIONS, state, scrollToView } = useMovies();
  const { selectedMovieIndex, search } = state;
  const selected = index === selectedMovieIndex;

  return (
    <tr
      style={{ backgroundColor: selected ? 'var(--selected-bg)' : '' }}
      onClick={(e) => {
        scrollToView();
        dispatch({ type: ACTIONS.SELECT_MOVIE, payload: index });
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
