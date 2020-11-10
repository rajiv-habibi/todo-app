import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { Link, Switch, Route } from "react-router-dom";
import Signin from "../Signin";
import { signup } from "../../actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";

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
  wrapper: {
    position: "relative",
  },
  circleProgress: {
    position: "absolute",
  },
}));

function Signup() {
  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const error = useSelector((state) => state.authReducer.errorSignup);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Please match the password");
    } else {
      const res = await dispatch(signup({ email, password })).catch(
        (err) => err
      );
      if (res) {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
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
            variant="h1"
            align="center"
            style={{
              fontSize: "2.5rem",
              fontWeight: "200",
              width: "100%",
              marginTop: "4em",
            }}
          >
            A Goal Without A Plan <br />
            Is Just A <span style={{ fontWeight: "800" }}>WISH</span>
            <Typography
              variant="h1"
              style={{
                fontSize: "1.4rem",
                marginTop: "0.5em",
              }}
            >
              <span style={{ fontWeight: "300" }}>Sign up to get started</span>
            </Typography>
          </Typography>
          <Box width="100%">
            <Typography
              style={{
                flexDirection: "column",
                width: "100%",
                fontSize: "1.4rem",
              }}
            >
              Already have an account ?{" "}
            </Typography>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  textAlign: "center",
                  color: "white",
                  border: "1px solid white",
                  padding: "10px 30px",
                  marginTop: "2em",
                }}
              >
                Sign in
              </Button>
            </Link>
            <Switch>
              <Route exact path="/signin" component={Signin} />
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
          Sign up
        </Typography>
        <TextField
          id="outlined-password-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Email"
          type="email"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: "1em 0" }}
        />{" "}
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: "1em 0" }}
        />
        <TextField
          label="Confirm Passwords"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: "1em 0" }}
        />{" "}
        <Typography
          style={{
            color: "red",
            display: password !== confirmPassword ? "block" : "none",
          }}
        >
          Password Doesn't match
        </Typography>
        <div style={{ position: "relative" }}>
          <Button
            variant="contained"
            // onClick={handleRegister}
            disabled={loading}
            onClick={handleRegister}
            style={{
              margin: "4em 0",
              padding: success ? "20px 10px" : "10px 10px",
              background: loading
                ? "grey"
                : success
                ? "#5CCF7C"
                : error
                ? "#e8453a"
                : "#5CCF7C",
              boxShadow: loading
                ? "none"
                : success
                ? "0 7px 23px -2px rgba(27,191,73,70%)"
                : error
                ? "0 7px 23px -2px rgba(232, 69, 58,70%)"
                : "0 7px 23px -2px rgba(27,191,73,70%)",
              color: loading ? "black" : "white",
              width: "100%",
            }}
          >
            {success ? "" : error ? error.message : "Sign up"}
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
          {success && (
            <CheckIcon
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
          <Typography style={{}}>Already have an account ?</Typography>
          <Link to="/signin">
            <Typography> Sign in </Typography>
          </Link>
        </Hidden>
      </Grid>
      <Grid item xs={1} md={1} />
    </Grid>
  );
}

export default Signup;
