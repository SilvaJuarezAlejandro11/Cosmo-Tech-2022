import {
  GET_PROJECTS,
  GET_PROJECT,
  NO_PROJECTS,
  CLEAR_PROJECT,
  CLEAR_PROJECTS,
  PROJECT_ERROR,
  PROJECT_DELETED,
  CREATE_FAIL,
  EDIT_FAIL,
} from '../actions/types';

const initialState = {
  project: [],
  projects: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT:
    case PROJECT_DELETED:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };

    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        project: [],
        loading: false,
      };

    case CREATE_FAIL:
    case EDIT_FAIL:
      return {
        ...state,
        project: payload,
        error: payload,
        loading: false,
      };

    case CLEAR_PROJECT:
      return {
        ...state,
        project: [],
        loading: false,
      };
    case CLEAR_PROJECTS:
      return {
        ...state,
        projects: [],
        loading: false,
      };

    case NO_PROJECTS:
      return {
        ...state,
        projects: [],
        loading: false,
      };

    default:
      return state;
  }
}
