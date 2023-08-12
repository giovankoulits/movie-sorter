//hooks
//nanoid for unique keys
import { nanoid } from 'nanoid';
// styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//components
import SearchForm from './components/SearchForm';
import MoviesTable from './components/Table/MoviesTable';
import MovieCard from './components/MovieCard';
import useLogic from './hooks/useLogic';
//Spinner for loading state
import Spinner from './components/Spinner';

function App() {
  const {
    movies,
    search,
    selectedMovie,
    error,
    loading,
    sortByCriteria,
    handleSearch,
    handleMovieSelection,
  } = useLogic();

  return (
    <div style={{ height: '100vh' }}>
      <Container className='pt-4'>
        <Row className='g-0'>
          <SearchForm onSearch={handleSearch} sortByCriteria={sortByCriteria} />
        </Row>
        {loading && <Spinner />}
        {error && <h2 className='text-danger my-4'>{error}</h2>}
        <Row className='g-0'>
          <Col xs={12} xl={6}>
            <MoviesTable
              movies={movies}
              search={search}
              selectMovie={handleMovieSelection}
            />
          </Col>
          <Col className='ps-xl-4 py-3' xs={12} xl={6}>
            <MovieCard
              key={nanoid()}
              movies={movies}
              selectedMovie={selectedMovie}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
