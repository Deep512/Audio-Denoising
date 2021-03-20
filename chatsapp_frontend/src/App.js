import React, { Component} from 'react';
import './App.css'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import Signin from './components/Views/Signin'
import Signup from './components/Views/Signup'
import Chat from './components/Views/chat/Chat'
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();





class App extends Component {
  render(){
    return(
      <Provider store = {store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" >
              <Signin />
            </Route>

            <Route path="/signup" >
              <Signup />
            </Route>

            <Route path="/message">
              <Chat />
            </Route>

            <Redirect to='/'/>
          </Switch>

        </BrowserRouter>
      </Provider>
           
    )
  }
}

export default App;
