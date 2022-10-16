import axios from 'axios';

// Import variables of actions:

import {
  GET_MOVIE_DETAIL,
  CLEAR_MOVIE_DETAIL,
  GET_MOVIES,
  GET_TV_SHOWS,
  GET_SEARCH,
  GET_HOME_ALL,
  START_LOADING,
  GET_SERIE_DETAIL,
  CLEAR_SERIE_DETAIL,
  GET_SEASON_DETAIL,
  CLEAR_SEARCH,
  CLEAR_MOVIES,
  CLEAR_SERIES,
  GET_ALL_GENRES,
  GET_MOVIE_GENRE_BY_ID,
  ERROR_FOUND,
  ERROR_CLEAN,
  GET_TV_SHOW_GENRES,
  GET_SERIES_BY_GENRE
} from "./const";

// Actions functions
// Get movie detail:

export function getMovieDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get('http://localhost:3001/movies/' + id);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const clearMovieDetail = () => ({ type: CLEAR_MOVIE_DETAIL });

export function getHomeAll() {
  return async function (dispatch) {
    dispatch({ type: START_LOADING });
    try {
      var json = await axios.get('http://localhost:3001/home');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_HOME_ALL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

// Get movies:
export function getMovies(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        'http://localhost:3001/home/movies/?page=' + page
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearMovies() {
  return {
    type: CLEAR_MOVIES,
  };
}

// Get tvShows:
export function getTvShows(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        'http://localhost:3001/home/series/?page=' + page
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_TV_SHOWS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearTvShows() {
  return {
    type: CLEAR_SERIES,
  };
}

//searchQuery Actions:
export function getSearchByQuery(name, page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        'http://localhost:3001/home/search/?page=' + page + '&name=' + name
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SEARCH,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearSearchByQuery() {
  return {
    type: CLEAR_SEARCH,
  };
}

// TVShowDetail Actions:
export function getSerieDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/tv/' + id);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SERIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const clearSerieDetail = () => ({ type: CLEAR_SERIE_DETAIL });

// TVShowSeasonDetail Actions:
export function getSeasonDetail(id, season_number) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/season/${id}/${season_number}`
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SEASON_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const getAllGenres = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/home/genres/movies');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_ALL_GENRES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export default function cleanError() {
  return {
    type: ERROR_CLEAN,
  };
}

export const getMovieGenreByID = (id, page) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/movies_by_genre?page=${page}&id=${id}`
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIE_GENRE_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};



export const getTVShowGenres = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/genres");
      if(json.status === 204){
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_TV_SHOW_GENRES,
        payload: json.data,
      });
    } catch (error) {
        return dispatch({
          type: ERROR_FOUND,
        });
    } 
  };
};


export const getSeriesByGenre = (genre, page) => {
  
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/home/series_by_genre/?page=" + page + "&genre=" + genre);
      if(json.status === 204){
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SERIES_BY_GENRE,
        payload: json.data,
      });
    } catch (error) {
        return dispatch({
          type: ERROR_FOUND,
        });
    } 
  };
};



