import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddEducation = ({ addEducation, history, type, setEdu }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    form: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (type === 'userType') {
    return <Redirect to='/menu' />;
  }

  return (
    <Fragment>
      <section className='perfil-form'>
        <div className='info text-center'>
          <h1>Historial Academico</h1>
          <p>
            Agruege la escuela o curso en el que haya estudiado o estudiará.
          </p>
        </div>
        <Alert />
        <form
          className='formulario'
          onSubmit={(e) => {
            e.preventDefault();
            addEducation(formData, history, type);
          }}
        >
          <div className='grupo'>
            <label htmlFor='school'>Escuela:</label>
            <input
              id='school'
              type='text'
              placeholder='Ingrese la escuela.'
              name='school'
              value={school}
              onChange={onChange}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='degree'>Grado o Certificado:</label>
            <input
              type='text'
              placeholder='Ingrese su grado de estudio.'
              name='degree'
              value={degree}
              onChange={onChange}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='fieldofstudy'>Campo de estudio:</label>
            <input
              id='fieldofstudy'
              type='text'
              placeholder='Campo de estudio'
              name='fieldofstudy'
              value={fieldofstudy}
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
              Sigo en la escuela
            </p>
          </div>
          <div className='grupo'>
            <label htmlFor='to'>Hasta:</label>
            <input
              id='to'
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
              placeholder='Alguna descripción que desea aportar.'
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <div className='grupo acciones'>
            <input type='submit' className='btn' value='Terminar' />
            <button className='btn' onClick={(e) => setEdu(false)}>
              Regresar
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  type: state.auth.type,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
