import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

  const aggregateRating = imdbRating + rottenTomatoesRating + metacriticRating;

  const averageRating = Math.round(aggregateRating / ratingsArray.length);
  return {
    averageRating,
    //Create object keys with spaces for Badge components
    ['IMDb']: imdbRating,
    ['Rotten Tomatoes']: rottenTomatoesRating,
    ['Metacritic']: metacriticRating,
  };
};

export const fetchUpdatedMovies = createAsyncThunk(
  'movies/fetchUpdatedMovies',
  async (movies) => {
    const updatedUrls = movies.map((movie) => {
      const title = movie.title;
      const year = movie.release_date.slice(0, 4);
      const url = `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=b9a5e69d`;
      return url;
    });
    const requestsArray = await Promise.all(
      updatedUrls.map((url) => fetch(url))
    );
    const responsesArray = await Promise.all(
      requestsArray.map((res) => {
        return res.json();
      })
    );

    const updatedMoviesArray = responsesArray.map((response, i) => {
      const movie = movies[i];

      return {
        title: movie?.title,
        episodeId: movie?.episode_id,
        releaseDate: movie?.release_date,
        director: movie?.director,
        plot: movie?.opening_crawl,
        poster: response?.Poster,
        id: response?.imdbID,
        ratings: calculateRatings(response?.Ratings),
      };
    });
    return updatedMoviesArray;
  }
);

export const fetchSwapiMovies = createAsyncThunk(
  'movies/fetchSwapiMovies',
  async () => {
    const request = await fetch('https://swapi.dev/api/films/?format=json');
    const response = await request.json();
    return response.results;
  }
);

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
  search: '',
  selectedMovie: '',
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    prepare: (text) => {
      return { payload: { text } };
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSwapiMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSwapiMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUpdatedMovies.fulfilled, (state, action) => {
        state.status = 'success';
        state.movies.push(...action.payload);
      })
      .addCase(fetchUpdatedMovies.pending, (state, action) => {
        state.status = ' loading';
      })
      .addCase(fetchUpdatedMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getMovies = (state) => state.movies.movies;
export const getUpdatedMovies = (state) => state.movies.updatedMovies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;
export const getMoviesSearch = (state) => state.movies.search;
export const getSelectedMovie = (state) => state.movies.selectedMovie;

export const { addToDo, setSearch, setSelectedMovie, setMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
