import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Signup from "../Signup";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { signin } from "../../actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TodoList from "../TodoList";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  test: {
    background: "blue",
  },
  text: {
    fontSize: "2rem",
    marginBottom: "2em",
  },
  side: {
    background: `linear-gradient( 112.9deg,  rgba(112,255,151,1) 6.2%, rgba(70,195,255,1) 99.7% )`,
    color: "white",
    height: "100%",
    width: "100%",
    textAlign: "center",
    margin: "auto",
    // background: "red",
  },
}));

function Signin() {
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.errorSignin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    const res = await dispatch(signin({ email, password })).catch((err) => err);
    localStorage.setItem("userInfo", JSON.stringify(res));

    if (res) {
      console.log("login success");
      localStorage.setItem("login", true);
      setEmail("");
      setPassword("");
      history.push("/dashboard");
    } else {
      console.log("login failed");
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      justify="flex-end"
      alignItems="center"
    >
      <Hidden smDown>
        <Grid item container md={6} className={classes.side}>
          <Typography
            align="center"
            style={{
              fontSize: "2.5rem",
              fontWeight: "200",
              width: "100%",
              marginTop: "4em",
            }}
          >
            <span style={{ fontWeight: "800" }}>PLAN</span> Your Work And <br />{" "}
            Work Your <span style={{ fontWeight: "800" }}>PLAN</span>
            <p
              style={{
                fontSize: "1.4rem",
                marginTop: "0.5em",
              }}
            >
              <span style={{ fontWeight: "300" }}>Sign in to get started</span>
            </p>
          </Typography>

          <Box width="100%">
            <Typography
              style={{
                flexDirection: "column",
                width: "100%",
                fontSize: "1.4rem",
              }}
            >
              Need an account ?
            </Typography>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  textAlign: "center",
                  color: "white",
                  border: "1px solid white",
                  padding: "10px 30px",
                  marginTop: "2em",
                }}
              >
                Sign up
              </Button>
            </Link>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={TodoList} />
            </Switch>
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={1} md={1} />
      <Grid
        item
        container
        xs={10}
        md={4}
        direction="column"
        justify="flex-end"
        style={{}}
      >
        <Typography align="center" className={classes.text}>
          Sign in
        </Typography>
        <TextField
          id="outlined-password-input"
          label="Email"
          type="email"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{ margin: "1em 0" }}
        />{" "}
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "1em 0" }}
        />
        <div style={{ position: "relative" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignin}
            style={{
              margin: "4em 0",
              padding: "10px 10px",
              background: loading ? "grey" : error ? "#e8453a" : "#5CCF7C",
              boxShadow: loading
                ? "none"
                : error
                ? "0 7px 23px -2px rgba(232, 69, 58,70%)"
                : "0 7px 23px -2px rgba(27,191,73,70%)",

              width: "100%",
            }}
          >
            {error ? error.message : "sign in"}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                top: "40%",
                left: "48%",
                color: "white",
              }}
            />
          )}
        </div>
        <Hidden mdUp>
          <Typography style={{}}>Need an account ?</Typography>
          <Link to="/signup">
            <Typography> Sign up </Typography>
          </Link>
        </Hidden>
      </Grid>
      <Grid item xs={1} md={1} />
    </Grid>
  );
}

export default Signin;
