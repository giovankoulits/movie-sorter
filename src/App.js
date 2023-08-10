///hooks
import React, { useState, useEffect } from 'react';
///styles and bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
///components
import SearchForm from './components/SearchForm';
import MoviesTable from './components/MoviesTable';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  ///
  useEffect(() => {
    const fetchData = async () => {
      if (!movies.length) {
        fetch('https://swapi.dev/api/films')
          .then((res) => res.json())
          .then((data) =>
            data.results.forEach((movie) => {
              fetch(
                `https://www.omdbapi.com/?t=${
                  movie.title
                }&y=${movie.release_date.slice(0, 4)}&apikey=b9a5e69d`
              )
                .then((res) => res.json())
                .then((res) => {
                  return res;
                })
                .then((updatedMovie) => {
                  setMovies((prev) => [
                    ...prev,
                    {
                      title: movie.title,
                      episodeId: movie.episode_id,
                      releaseDate: movie.release_date,
                      plot: movie.opening_crawl,
                      poster: updatedMovie.Poster,
                      id: updatedMovie.imdbID,
                      ratings: calculateRatings(updatedMovie.Ratings),
                    },
                  ]);
                });
            })
          );
      }
    };
    fetchData();
  }, []);

  function sortByCriteria(value) {
    const compare = (movieA, movieB) => {
      if (movieA[value]?.averageRating) {
        if (movieA[value].averageRating > movieB[value].averageRating) {
          return -1;
        }
        if (movieA[value].averageRating < movieB[value].averageRating) {
          return 1;
        }
        return 0;
      }
      if (movieA[value] > movieB[value]) {
        return 1;
      }
      if (movieA[value] < movieB[value]) {
        return -1;
      }
      return 0;
    };

    if (movies) {
      const sortedMovies = Array.from(movies).sort(compare);
      setMovies(sortedMovies);
      setSelectedMovie('');
      return;
    }
  }

  /*     let sortedMovies = copiedMovies.sort((a, b) => {
      return a.first_name.toLowerCase() < a.first_name.toLowerCase();
    }); */

  function onSearch(e) {
    setSearch(e.target.value);
  }

  function selectMovie(index) {
    setSelectedMovie(index);
  }

  const calculateRatings = (ratingsArray) => {
    let imdbRating = ratingsArray[0]?.Value.substring(
      0,
      ratingsArray[0].Value.indexOf('/')
    ).replace('.', '');
    const rottenTomatoesRating = ratingsArray[1]?.Value.substring(
      0,
      ratingsArray[1].Value.indexOf('%')
    );

    const metacriticRating = ratingsArray[2]?.Value.substring(
      0,
      ratingsArray[2].Value.indexOf('/')
    );

    const aggregateRating =
      Number(imdbRating) +
      Number(rottenTomatoesRating) +
      Number(metacriticRating);
    const averageRating = Math.round(aggregateRating / ratingsArray.length);
    return {
      averageRating,
      imdbRating,
      rottenTomatoesRating,
      metacriticRating,
    };
  };

  return (
    <div>
      <Container>
        <Row>
          <h1 className='text-center mt-4'>Movie Sorter</h1>
          <SearchForm onSearch={onSearch} sortByCriteria={sortByCriteria} />
        </Row>
        <Row>
          <Col xs={12} xl={6}>
            <MoviesTable
              movies={movies}
              search={search}
              selectMovie={selectMovie}
            />
          </Col>
          <Col xs={12} xl={6}>
            <MovieCard movies={movies} selectedMovie={selectedMovie} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
