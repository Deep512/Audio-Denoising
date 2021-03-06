import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Signin from "./components/Views/Signin";
import Signup from "./components/Views/Signup";
import User from "./components/Views/user/User";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { createBrowserHistory } from "history";

const appHistory = createBrowserHistory();
const store = ConfigureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter history={appHistory}>
                    <Switch>
                        <Route exact path="/">
                            <Signin />
                        </Route>

                        <Route path="/signup">
                            <Signup />
                        </Route>

                        <Route path="/usr/:type">
                            <User />
                        </Route>

                        <Redirect to="/" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
