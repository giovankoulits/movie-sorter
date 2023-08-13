import { nanoid } from 'nanoid';
//hooks
import { useEffect, useState, useRef } from 'react';
//bootstrap components
import { Badge } from 'react-bootstrap';

const useLogic = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const targetElement = useRef();

  const scrollToView = () => {
    const element = targetElement;
    element.current.scrollIntoView();
  };

  //Fetch from OMDb Api
  const fetchOmdbData = async (movie) => {
    try {
      const title = movie.title;
      const year = movie.release_date.slice(0, 4);
      const url = `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=b9a5e69d`;
      const request = await fetch(url);
      const response = await request.json();

      setMovies((prev) => [
        ...prev,
        {
          title: movie?.title,
          episodeId: movie?.episode_id,
          releaseDate: movie?.release_date,
          director: movie?.director,
          plot: movie?.opening_crawl,
          poster: response?.Poster,
          id: response?.imdbID,
          ratings: calculateRatings(response?.Ratings),
        },
      ]);
    } catch (error) {
      console.log(error);
      setError('Oops! Something went wrong with the OMDb Api.');
    }
  };

  //Fetch from Swapi Api
  const fetchSwapiData = async () => {
    setLoading(true);
    if (!movies.length) {
      try {
        const request = await fetch('https://swapi.dev/api/films/?format=json');
        const response = await request.json();
        //Make a fetch call to OMDb Api for each response object
        response.results.forEach(fetchOmdbData);
      } catch (err) {
        console.log(error);
        setError('Oops! Something went wrong with the swapi api.');
      }
      setLoading(false);
    }
  };

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
      setMovies(sortedMovies);
      //Display first movie after sorting
      setSelectedMovie(0);
      return;
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleMovieSelection = (movieIndex) => setSelectedMovie(movieIndex);

  const calculateRatings = (ratingsArray) => {
    //Parse integer from decimal
    let imdbRating = Number(
      ratingsArray[0]?.Value.substring(
        0,
        ratingsArray[0].Value.indexOf('/')
      ).replace('.', '')
    );
    //Parse integer from percentage
    const rottenTomatoesRating = Number(
      ratingsArray[1]?.Value.substring(0, ratingsArray[1].Value.indexOf('%'))
    );
    //Parse integer from fraction
    const metacriticRating = Number(
      ratingsArray[2]?.Value.substring(0, ratingsArray[2].Value.indexOf('/'))
    );

    const aggregateRating =
      imdbRating + rottenTomatoesRating + metacriticRating;

    const averageRating = Math.round(aggregateRating / ratingsArray.length);
    return {
      averageRating,
      //Create object keys with spaces for Badge components
      ['IMDb']: imdbRating,
      ['Rotten Tomatoes']: rottenTomatoesRating,
      ['Metacritic']: metacriticRating,
    };
  };

  const calculateRatingColor = (rating) => {
    if (rating) {
      if (rating < 60) return 'danger'; //red
      if (rating >= 60 && rating < 72) return 'warning'; //yellow
      if (rating >= 72) return 'success'; //green
    }
  };

  const createRatingBadges = (movie) => {
    let badges = [];
    let className =
      'badge text-light px-3 py-2 rounded-pill me-2 fw-normal mb-2 fw-bold bg-gradient';
    if (movie?.ratings) {
      for (const key in movie.ratings) {
        if (key === 'averageRating') {
          continue; // Skip badge for Average rating
        }
        let rating = movie.ratings[key];
        let bg = calculateRatingColor(rating);
        badges.push(
          <Badge
            key={nanoid()}
            style={{ fontSize: '13px' }}
            className={`${className} bg-${bg}`}
          >{`${key}: ${rating} %`}</Badge>
        );
      }
    }
    return badges;
  };

  useEffect(() => {
    fetchSwapiData();
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
    calculateRatingColor,
    createRatingBadges,
    targetElement,
    scrollToView,
  };
};

export default useLogic;
