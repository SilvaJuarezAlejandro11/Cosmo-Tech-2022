//? CSS
import './Normalize.css';
import './App.css';

//? React

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

//? Componentes

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/routing/PrivateRoute';
import Projects from './components/projects/Projects';
import MyProjects from './components/my-projects/MyProjects';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import CreateProject from './components/project-forms/CreateProject';
import EditProject from './components/project-forms/EditProject';
import Project from './components/project/Project';
import Verification from './components/auth/Verification';
//? Redux

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

//? utils
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          {
            //? Rutas públicas
          }

          <Route exact path='/' component={Landing} />

          <Switch>
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />

            {
              //? Rutas privadas
            }
            <Route
              exact
              path='/verification/account'
              component={Verification}
            />
            <Route
              exact
              path='/verification/account/:id'
              component={Verification}
            />
            <PrivateRoute exact path='/menu' component={Projects} />
            <PrivateRoute exact path='/me/projects' component={MyProjects} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path='/create-project'
              component={CreateProject}
            />
            <Route exact path='/edit-project/:id' component={EditProject} />
            <Route exact path='/project/:id' component={Project} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
