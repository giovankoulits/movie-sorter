//hooks
import React, { useState, useEffect } from 'react';
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

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');

  //Fetch OMDb Api
  const fetchAdditionalData = async (movie) => {
    const title = movie.title;
    const year = movie.release_date.slice(0, 4);
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=b9a5e69d`;
    const request = await fetch(url);
    const response = await request.json();
    setMovies((prev) => [
      ...prev,
      {
        title: movie.title,
        episodeId: movie.episode_id,
        releaseDate: movie.release_date,
        director: movie.director,
        plot: movie.opening_crawl,
        poster: response.Poster,
        id: response.imdbID,
        ratings: calculateRatings(response.Ratings),
      },
    ]);
  };

  //Fetch Swapi Api
  const fetchData = async () => {
    if (!movies.length) {
      const request = await fetch('https://swapi.dev/api/films/?format=json');
      const response = await request.json();
      //Make a fetch call to OMDb Api for each response object
      response.results.forEach(fetchAdditionalData);
    }
  };

  const sortByCriteria = (value) => {
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
      //Copy movies array and sort
      const sortedMovies = Array.from(movies).sort(compare);
      setMovies(sortedMovies);
      setSelectedMovie(0);
      return;
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleMovieSelection = (index) => setSelectedMovie(index);

  const calculateRatings = (ratingsArray) => {
    //Create integer from decimal
    let imdbRating = Number(
      ratingsArray[0]?.Value.substring(
        0,
        ratingsArray[0].Value.indexOf('/')
      ).replace('.', '')
    );
    //Create integer from percentage
    const rottenTomatoesRating = Number(
      ratingsArray[1]?.Value.substring(0, ratingsArray[1].Value.indexOf('%'))
    );
    //Create integer from fraction
    const metacriticRating = Number(
      ratingsArray[2]?.Value.substring(0, ratingsArray[2].Value.indexOf('/'))
    );

    const aggregateRating =
      imdbRating + rottenTomatoesRating + metacriticRating;

    const averageRating = Math.round(aggregateRating / ratingsArray.length);
    return {
      averageRating,
      //Create object keys with spaces to use in Badge components
      ['Internet Movie Database']: imdbRating,
      ['Rotten Tomatoes ']: rottenTomatoesRating,
      ['Metacritic Rating']: metacriticRating,
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Container className='pt-4'>
        <Row className='g-0'>
          <SearchForm onSearch={handleSearch} sortByCriteria={sortByCriteria} />
        </Row>
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
