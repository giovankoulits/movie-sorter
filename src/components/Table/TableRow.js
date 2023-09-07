import Ratings from '../Ratings';
import TableCell from './TableCell';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedMovie,
  getSelectedMovie,
  getMoviesSearch,
} from '../../features/movies/moviesSlice';
const TableRow = ({ movie, index, scrollToView }) => {
  const search = useSelector(getMoviesSearch);
  const selectedMovie = useSelector(getSelectedMovie);
  const selected = index === selectedMovie;
  const dispatch = useDispatch();
  return (
    <tr
      style={{ backgroundColor: selected ? 'var(--selected-bg)' : '' }}
      onClick={(e) => {
        scrollToView();
        dispatch(setSelectedMovie(index));
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
