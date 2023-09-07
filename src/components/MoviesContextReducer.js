import { nanoid } from 'nanoid';
//hooks
import {
  useEffect,
  useRef,
  useReducer,
  createContext,
  useContext,
} from 'react';
//bootstrap components
import { Badge } from 'react-bootstrap';

export const MoviesContext = createContext(null);
export function useMovies() {
  return useContext(MoviesContext);
}

const MoviesContextReducer = ({ children }) => {
  //

  const ACTIONS = {
    FETCH_DATA: 'fetch-data',
    SORT_MOVIES: 'sort-movies',
    SEARCH_MOVIES: 'search-movies',
    SELECT_MOVIE: 'select-movie',
    SET_ERROR: 'set-error',
    SET_LOADING: 'set-loading',
  };

  const [state, dispatch] = useReducer(reducer, {
    movies: [],
    search: '',
    selectedMovieIndex: '',
    error: false,
    loading: false,
  });

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.FETCH_DATA:
        return { ...state, movies: [...state.movies, action.payload] };
      case ACTIONS.SORT_MOVIES:
        return { ...state, movies: [...action.payload] };
      case ACTIONS.SEARCH_MOVIES:
        return { ...state, search: action.payload };
      case ACTIONS.SELECT_MOVIE:
        return { ...state, selectedMovieIndex: action.payload };
      case ACTIONS.SET_ERROR:
        return { ...state, error: action.payload };
      case ACTIONS.SET_LOADING:
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  }

  //Ref for creating scroll on click
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
      dispatch({
        type: ACTIONS.FETCH_DATA,
        payload: {
          title: movie?.title,
          episodeId: movie?.episode_id,
          releaseDate: movie?.release_date,
          director: movie?.director,
          plot: movie?.opening_crawl,
          poster: response?.Poster,
          id: response?.imdbID,
          ratings: calculateRatings(response?.Ratings),
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Oops! Something went wrong with the OMDb Api.',
      });
    }
  };

  //Fetch from Swapi Api
  const fetchSwapiData = async () => {
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: true,
    });
    if (!state.movies.length) {
      try {
        const request = await fetch('https://swapi.dev/api/films/?format=json');
        const response = await request.json();
        //Make a fetch call to OMDb Api for each response object
        response.results.forEach(fetchOmdbData);
      } catch (err) {
        console.log(err);

        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'Oops! Something went wrong with the swapi api.',
        });
      }
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false,
      });
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

    if (state.movies.length > 0) {
      const sortedMovies = Array.from(state.movies).sort(compare);
      dispatch({
        type: ACTIONS.SORT_MOVIES,
        payload: sortedMovies,
      });
      //Display first movie after sorting
      dispatch({ type: ACTIONS.SELECT_MOVIE, payload: 0 });
      return;
    }
  };

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

  return (
    <MoviesContext.Provider
      value={{
        state,
        sortByCriteria,
        ACTIONS,
        calculateRatingColor,
        createRatingBadges,
        targetElement,
        scrollToView,
        dispatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextReducer;
