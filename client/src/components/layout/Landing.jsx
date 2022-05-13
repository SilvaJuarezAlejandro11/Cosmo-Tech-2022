import React from 'react';
import Main from './Main';
import { useState } from 'react';

import ver from '../../img/ver.png';
import codigo from '../../img/codigo.svg';
import compartir from '../../img/compartir.svg';
import proyecto from '../../img/proyecto.svg';
import Login from '../auth/Login';
import Register from '../auth/Register';
import RegisterStudent from '../auth/RegisterStudent';
import RegisterTeacher from '../auth/RegisterTeacher';

const Landing = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(false);
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);

  return (
    <>
      <Main
        titulo='¡Bienvenido a Cosmo-Tech!'
        descripcion='El lugar donde las innovaciones no paran de sorprendernos.'
      >
        <a href='#iniciarSesion' className='btn'>
          Iniciar Sesión
        </a>
        <a href='#iniciarSesion' className='btn'>
          Registrarse
        </a>
      </Main>
      <section className='introduccion contenedor'>
        <div className='text-center info'>
          <h1>¡Visualiza proyectos escolares!</h1>
          <p>
            Aqui podras checar los proyectos realizados en las escuelas, tanto
            de los estudiantes que actualmente cursan como de los habilidosos
            profesores{' '}
          </p>
          <div className='iconos'>
            <img src={ver} className='icono' alt='ojo' />
            <img src={codigo} className='icono' alt='codigo' />
          </div>
        </div>

        <div className='text-center info'>
          <h1>¡Comparte tus proyectos!</h1>
          <p>
            Si eres un estudiante, ven y registrate, y se parte de la grandiosa
            comunidad que se ayuda mutuamente y comparte tus conocimientos con
            otros, Registrate justo en el apartado de abajo.{' '}
          </p>
          <div className='iconos'>
            <img className='icono' src={compartir} alt='compartir' />
            <img className='icono' src={proyecto} alt='proyecto' />
          </div>
        </div>
      </section>
      <section className='contenedor'>
        <div className='info text-center ' id='iniciarSesion'>
          <h1>¡Ingresa ahora!</h1>
          <p>Revisa como quieres ingresar aqui abajo.</p>
        </div>
        <div className='opciones'>
          {user || student || teacher ? (
            ''
          ) : login ? (
            <Login setLogin={setLogin} />
          ) : (
            <button
              onClick={(e) => setLogin(true)}
              className='opcion iniciar-sesion'
            >
              <div className='text-center'>
                <h1 className='degradado relative'>Iniciar Sesión</h1>
                <p className='relative'>
                  Ingresa nuevamente para seguir explorando las funciones que
                  Cosmo-Tech te da.
                </p>
              </div>
            </button>
          )}
          {login || student || teacher ? (
            ''
          ) : user ? (
            <Register setUser={setUser} setLogin={setLogin} />
          ) : (
            <button onClick={(e) => setUser(true)} className='opcion invitado'>
              <div className='text-center'>
                <h1 className='degradado relative'>Invitado</h1>
                <p className='relative'>
                  Explora, descubre y descarga nuevos proyectos para probarlos
                  en tu mismo dispositivo.
                </p>
              </div>
            </button>
          )}
          {login || user || teacher ? (
            ''
          ) : student ? (
            <RegisterStudent setStudent={setStudent} setLogin={setLogin} />
          ) : (
            <button
              onClick={(e) => setStudent(true)}
              className='opcion estudiante'
            >
              <div className='text-center'>
                <h1 className='degradado relative'>Estudiante</h1>
                <p className='relative'>
                  Crea y comparte tus proyectos. Hazte conocer en el mundo
                  técnologico.
                </p>
              </div>
            </button>
          )}
          {login || user || student ? (
            ''
          ) : teacher ? (
            <RegisterTeacher setTeacher={setTeacher} setLogin={setLogin} />
          ) : (
            <button
              onClick={(e) => setTeacher(true)}
              className='opcion profesor'
            >
              <div className='text-center'>
                <div>
                  <h1 className='degradado relative'>Profesor</h1>
                  <p className='relative'>
                    Revisa, ayuda y apoya a tus alumno. Guialos a ser
                    profesionales.
                  </p>
                </div>
              </div>
            </button>
          )}
          {/* <!-- opcion --> */}
        </div>
        {/* <!-- Fin de opciones --> */}
      </section>
    </>
  );
};

export default Landing;
