//Hooks
import { useRef } from 'react';
//Bootstrap components
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Bootstrap icons
import { ImSearch } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  getMovies,
  setSelectedMovie,
  setMovies,
} from '../features/movies/moviesSlice';

const SearchForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const movies = useSelector(getMovies);

  //Sorting Function
  const sortByCriteria = (value) => {
    //Sorting Function
    const compare = (movieA, movieB) => {
      //Sort according to rating
      if (movieA[value]?.averageRating) {
        return movieA[value].averageRating > movieB[value].averageRating
          ? -1
          : movieA[value].averageRating < movieB[value].averageRating
          ? 1
          : 0;
      }
      //Sort according to year or episode
      return movieA[value] > movieB[value]
        ? 1
        : movieA[value] < movieB[value]
        ? -1
        : 0;
    };

    if (movies.length > 0) {
      const sortedMovies = Array.from(movies).sort(compare);
      dispatch(setMovies(sortedMovies));
      //Display first movie after sorting
      dispatch(setSelectedMovie(0));
      return;
    }
  };

  return (
    <Row className='g-0'>
      <div
        className='px-3  my-form-bg'
        style={{
          /* background: 'var(--bg-form)', */
          borderRadius: '5px',
        }}
      >
        <Form>
          <Row>
            <Col xs={12} md={3}>
              <Form.Select
                className='mt-3 mb-0 my-md-3'
                onChange={(e) => {
                  if (e.target.value) {
                    //Remove "Sort By" option after selection
                    inputRef.current.style.display = 'none';
                    sortByCriteria(e.target.value);
                  }
                }}
              >
                <option ref={inputRef} style={{ color: 'gray' }}>
                  Sort By
                </option>
                <option value='releaseDate'>Year</option>
                <option value='episodeId'>Episode</option>
                <option value='ratings'>Rating</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={9}>
              <InputGroup className='my-3'>
                <InputGroup.Text>
                  <ImSearch style={{ color: 'var(--star-color)' }} />
                </InputGroup.Text>
                <Form.Control
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  placeholder='Search Movies'
                />
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </Row>
  );
};

export default SearchForm;
