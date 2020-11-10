import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Box, Container, Button } from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import Signin from "../Signin";
import Signup from "../Signup";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "linear-gradient(#48C6F9,#5DE4ED)",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
    },
  },
  wrapper: {
    color: "white",
    textAlign: "center",
  },
  header: {
    margin: theme.spacing(5, 0),
    justifyContent: "space-between",
    height: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: "1.5rem",
  },
  signIn: {
    background: "#979797",
    padding: "10px 20px",
    borderRadius: "3px",
    margin: theme.spacing(0, 5),
    cursor: "pointer",
    color: "white",

    "&:hover": {
      background: "#A0A0A0",
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 2),
      padding: "10px 15px",
    },
  },
  signUp: {
    background: "#3CE4AB",
    borderRadius: "3px",
    padding: "10px 20px",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    "&:hover": {
      background: "#47EBB3",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 15px",
    },
  },
  cta: {
    background: "#59BDF5",
    padding: "20px 50px",
    color: "white",
    fontWeight: "400",
    marginTop: "4em",

    "&:hover": {
      background: "#52B9F3",
    },
  },
  desc: {
    fontWeight: "200",
    fontSize: "2rem",
    width: "70%",
    margin: "auto",
    marginTop: ".5em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      width: "100%",
    },
  },
  text: {
    fontSize: "4.5rem",
    textAlign: "center",
    marginTop: "4.5em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
      marginTop: "4em",
    },
    [theme.breakpoints.only("md")]: {
      marginTop: "7em",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontWeight: "600",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Container maxWidth="lg" className={classes.wrapper}>
        <Grid item container className={classes.header}>
          <Typography className={classes.headerText}>todo.it</Typography>
          <Box
            style={{
              display: "flex",
            }}
          >
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Typography className={classes.signIn}>Sign in</Typography>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography className={classes.signUp}>Sign up</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Typography className={classes.text}>
            <Box className={classes.title}>Be organized is cool</Box>
            <Box className={classes.desc}>
              Todo.it is a simple,fast and reliable management app that ready to
              organize your daily tasks.
            </Box>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button className={classes.cta}>Get started</Button>
            </Link>
          </Typography>
        </Grid>
      </Container>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </Grid>
  );
};

export default Home;
