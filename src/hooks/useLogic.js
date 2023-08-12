import { useEffect, useState } from 'react';

const useLogic = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //Fetch OMDb Api
  const fetchAdditionalData = async (movie) => {
    try {
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
          poster: response?.Poster,
          id: response?.imdbID,
          ratings: calculateRatings(response.Ratings),
        },
      ]);
    } catch (error) {
      console.log(error);
      setError('Oops! Something went wrong with the OMDb Api.');
    }
  };

  //Fetch Swapi Api
  const fetchData = async () => {
    setLoading(true);
    if (!movies.length) {
      try {
        const request = await fetch('https://swapi.dev/api/films/?format=json');
        const response = await request.json();
        //Make a fetch call to OMDb Api for each response object
        response.results.forEach(fetchAdditionalData);
      } catch (err) {
        console.log(error);
        setError('Oops! Something went wrong with the swapi api.');
      }
      setLoading(false);
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

  return {
    movies,
    search,
    selectedMovie,
    error,
    loading,
    sortByCriteria,
    handleSearch,
    handleMovieSelection,
  };
};

export default useLogic;
