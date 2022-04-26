import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({ addExperience, history, type, setExp }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    form: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (type === 'userType' || type === 'studentType') {
    return <Redirect to='/menu' />;
  }

  return (
    <Fragment>
      <section className='perfil-form'>
        <div className='info text-center'>
          <h1>Experiencia Laboral</h1>
          <p>Agregue cualquier trabajo que ha tenido o tendrá.</p>
        </div>
        <Alert />
        <form
          className='formulario'
          onSubmit={(e) => {
            e.preventDefault();
            addExperience(formData, history, type);
          }}
        >
          <div className='grupo'>
            <label htmlFor='title'>Trabajo:</label>
            <input
              id='title'
              type='text'
              placeholder='Ingrese su ocupación.'
              name='title'
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='company'>Compañia:</label>
            <input
              id='company'
              type='text'
              placeholder='Ingrese la compañia.'
              name='company'
              value={company}
              onChange={onChange}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='location'>Ubicacion:</label>
            <input
              id='location'
              type='text'
              placeholder='Ingrese la ubicación.'
              name='location'
              value={location}
              onChange={onChange}
            />
          </div>
          <div className='grupo'>
            <label htmlFor='from'>Desde:</label>
            <input
              id='from'
              type='date'
              name='from'
              value={from}
              onChange={onChange}
            />
            <p>
              <input
                type='checkbox'
                name='current'
                checked={current}
                value={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              Sigo en el trabajo
            </p>
          </div>
          <div className='grupo'>
            <label htmlFor='to'>Hasta:</label>
            <input
              type='date'
              name='to'
              value={to}
              onChange={onChange}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className='grupo'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              id='description'
              name='description'
              placeholder='Job Description'
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <div className='grupo acciones'>
            <input type='submit' className='btn' value='Terminar' />
            <button className='btn' onClick={(e) => setExp(false)}>
              Regresar
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  type: state.auth.type,
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
