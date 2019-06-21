import React from 'react';
import './App.css';

import { Provider } from 'react-redux'

//React Router
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Header from './components/header/Header'
import Main from './views/main/Main'
import Login from './views/login/Login';
import Register from './views/register/Register'
import Notes from './views/notes/Notes'
import Error404 from './views/error404/Error404'

import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
        </div>

        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/users/Login' exact component={Login} />
          <Route path='/users/register' exact component={Register} />
          <Route path='/notes' exact component={Notes} />
          <Route path='*' component={Error404} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

