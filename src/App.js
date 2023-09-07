//Nanoid for unique keys
import { nanoid } from 'nanoid';
//hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
//funcs from slice
import {
  getMoviesStatus,
  fetchSwapiMovies,
  fetchUpdatedMovies,
} from './features/movies/moviesSlice';
// Styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//Components
import SearchForm from './components/SearchForm';
import MoviesTable from './components/Table/MoviesTable';
import MovieCard from './components/MovieCard';
import useLogic from './components/useLogic';
//Spinner for loading state
import Spinner from './components/Spinner';

function App() {
  const { targetElement, scrollToView } = useLogic();
  /*   const error = useSelector(getMoviesError); */
  const loading = useSelector(getMoviesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSwapiMovies())
      .unwrap()
      .then((movies) => dispatch(fetchUpdatedMovies(movies)));
  }, []);

  return (
    <Container className='pt-4'>
      <SearchForm />
      {loading === 'loading' && <Spinner />}
      <Row className='g-0'>
        <MoviesTable scrollToView={scrollToView} />
        <MovieCard ref={targetElement} />
      </Row>
    </Container>
  );
}

export default App;
