import React from 'react'
import './App.scss';
import store from './store';
import {history} from './store';
// import Home from './public/Home';
import { Provider } from 'react-redux';
import {Login} from './login'
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Home from './public/Home';
import { PrivateRoute } from './PrivateRoute';
import Leaderboard from './leaderboard/Leaderboard';
import Canvas from './game/Canvas';


function App() {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
      <Switch>
      <Route path="/userLogin" component={Login}/>
      <PrivateRoute path="/" exact={true} component={Home}/>
      <PrivateRoute path="/leaderboard" exact={true} component={Leaderboard}/>
      <PrivateRoute path="/solo" exact={true} component={Canvas}/>
      </Switch>
        </ConnectedRouter>
    </Provider>
  )
}
export default App