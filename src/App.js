import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TodoList from "./components/TodoList";
import Home from "./components/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
const theme = createMuiTheme({
  spacing: 0,
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.login ? (
        <Component {...rest} />
      ) : rest.userData ? (
        <Component {...rest} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

function App() {
  // const login = localStorage.getItem("login");
  const login = useSelector((state) => state.authReducer.login);
  const userData = localStorage.getItem("userInfo");

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute
            path="/dashboard"
            component={TodoList}
            login={login}
            userData={userData}
          />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
