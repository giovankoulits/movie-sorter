//Nanoid for unique keys
import { nanoid } from 'nanoid';
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
import Spinner from './components/Spinner';

//Custom Hooks
import { useMovies } from './components/MoviesContext';

function App() {
  const { error, loading } = useMovies();

  return (
    <Container className='pt-4'>
      <SearchForm />
      {loading && <Spinner />}
      {error && <h2 className='text-danger my-4'>{error}</h2>}
      <Row className='g-0'>
        <MoviesTable />
        <MovieCard key={nanoid()} />
      </Row>
    </Container>
  );
}

export default App;
