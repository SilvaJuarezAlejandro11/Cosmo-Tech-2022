import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROJECTS,
  GET_PROJECT,
  CLEAR_PROJECT,
  CLEAR_PROJECTS,
  PROJECT_ERROR,
  PROJECT_DELETED,
  EDIT_FAIL,
  CREATE_FAIL,
} from './types';

//? Obtener todos los proyectos

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/projects');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
  dispatch({ type: CLEAR_PROJECT });
};

//? Obtener los proyectos del usuario

export const getCurrentProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/projects/me');

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
  dispatch({ type: CLEAR_PROJECTS });
};

//? Obtener el proyecto a través del ID

export const getProjectById = (proId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/projects/${proId}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProject = (data, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(`/api/projects`, data, config);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert('Proyecto Agregado!', 'success'));
    history.push('/me/projects');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_FAIL,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const updateProject = (data, proId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(`/api/projects/${proId}`, data, config);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });

    dispatch(getCurrentProjects());
    dispatch(setAlert('Proyecto Editado!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: EDIT_FAIL,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    dispatch(getCurrentProjects());
  }
};

//? Agregar gantt y sus tareas

export const addGantt = (formData, proId) => async (dispatch) => {
  console.log(proId);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/api/projects/gantt/${proId}`,
      formData,
      config
    );

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert('Tarea/Subtarea Agregada!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_FAIL,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    dispatch(getProjectById(proId));
  }
};

//? Borrar Tarea o Subtarea

export const deleteTask = (projectId, taskId) => async (dispatch) => {
  if (
    window.confirm(
      '¿Estas seguro de borrar la tarea? Si la tarea tiene subtareas; tendrás que crear otra tarea con la misma ID para poder verlas de nuevo'
    )
  ) {
    try {
      const res = await axios.delete(
        `/api/projects/gantt/${projectId}/${taskId}`
      );
      dispatch({
        type: GET_PROJECT,
        payload: res.data,
      });
      dispatch(setAlert('Tarea/Subtarea borrada!', 'success'));
    } catch (err) {
      dispatch({
        type: CREATE_FAIL,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

//? Borrar proyecto

export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm('¿Estas seguro de borrar el proyecto? No habrá vuelta atrás')
  ) {
    try {
      const res = await axios.delete(`/api/projects/${id}`);

      dispatch({
        type: PROJECT_DELETED,
        payload: res.data,
      });

      dispatch(setAlert('Proyecto Elminado!', 'success'));
      dispatch(getCurrentProjects());
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
