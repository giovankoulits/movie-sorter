//Nanoid for unique keys
import { nanoid } from 'nanoid';

// Styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Components
import SearchForm from './components/SearchForm';
import MoviesTable from './components/Table/MoviesTable';
import MovieCard from './components/MovieCard';
import useLogic from './components/useLogic';
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
    calculateRatingColor,
    createRatingBadges,
    targetElement,
    scrollToView,
  } = useLogic();

  return (
    <Container className='pt-4'>
      <Row className='g-0'>
        <SearchForm onSearch={handleSearch} sortByCriteria={sortByCriteria} />
      </Row>
      {loading && <Spinner />}
      {error && <h2 className='text-danger my-4'>{error}</h2>}
      <Row className='g-0'>
        <Col xs={12} xl={6}>
          <MoviesTable
            selectedMovie={selectedMovie}
            handleMovieSelection={handleMovieSelection}
            movies={movies}
            search={search}
            scrollToView={scrollToView}
          />
        </Col>
        <Col className='ps-xl-4 py-3' xs={12} xl={6}>
          <MovieCard
            ref={targetElement}
            key={nanoid()}
            movies={movies}
            selectedMovie={selectedMovie}
            calculateRatingColor={calculateRatingColor}
            createRatingBadges={createRatingBadges}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
