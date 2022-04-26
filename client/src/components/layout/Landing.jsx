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
        titulo='¡Bienvenido a BatizLab!'
        descripcion='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
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
          <h1>¡Visualiza proyectos del CECyT 9!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            earum porro voluptatem! Voluptas vel quasi eius et magni ratione
            eos. Iure, earum. Quos voluptatem voluptate voluptatum cupiditate
            maxime, minus culpa?
          </p>
          <div className='iconos'>
            <img src={ver} className='icono' alt='ojo' />
            <img src={codigo} className='icono' alt='codigo' />
          </div>
        </div>

        <div className='text-center info'>
          <h1>¡Comparte tus proyectos!</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod nobis
            quasi nihil veniam earum velit dolorem explicabo, voluptatum unde
            dolores, rerum tempora voluptates repellat aliquam. Eaque
            consequatur laborum ea doloremque.
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
          <p>Lorem ipsum dolor sit amet consectetur,</p>
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
              <div className=' text-center'>
                <h1 className='degradado relative'>Iniciar Sesión</h1>
                <p className='relative'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita.
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officia doloribus.
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
