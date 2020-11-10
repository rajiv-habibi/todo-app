import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Grid,
  Toolbar,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { addTodo, getTodo } from "../../actions/todoAction";
import TodoItem from "../TodoItem";
import { signout } from "../../actions/authAction";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  nav: {
    background: "none",
  },
  navItem: {
    background: "none",
    color: "black",
    justifyContent: "space-between",
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(3, 3, 3),
  },

  containerSpace: {
    margin: theme.spacing(0, 6),
  },
  dialog: {
    // margin: theme.spacing(0, 10),
  },
  emptyTodo: {
    fontSize: "2.5rem",
    color: "#bbbdbf",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  circular: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const [modalTask, setModalTask] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);
  const loading = useSelector((state) => state.todoReducer.loading);
  const history = useHistory();
  const login = useSelector((state) => state.authReducer.login);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData) {
      dispatch(getTodo(userData.uid));
    } else {
      history.push("/signin");
    }
  }, []);

  const submitTodo = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const data = {
      title: taskInput,
      userId: userData.uid,
    };
    dispatch(addTodo(data));
    setModalTask(false);
  };
  const handleSignout = () => {
    dispatch(signout());
    history.push("/signin");
    localStorage.clear();
    console.log(login);
  };

  return (
    <>
      <AppBar position="static" className={classes.nav}>
        <Toolbar className={classes.navItem}>
          <Button
            onClick={() => setModalTask(true)}
            style={{
              background: "#1EACCB",
              color: "white",
              // width: "100px",
            }}
          >
            Add Task
          </Button>
          <Dialog
            className={classes.dialog}
            open={modalTask}
            onClose={() => setModalTask(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <TextField
              id="standard-basic"
              onInput={(e) => setTaskInput(e.target.value)}
              style={{ padding: "2em" }}
            />
            <DialogActions>
              <Button onClick={() => setModalTask(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={submitTodo} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            onClick={handleSignout}
            style={{
              background: "#565C59",
              color: "white",
              // width: "100px",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {loading ? (
        <div className={classes.circular}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Grid container item>
            <Typography
              style={{
                textAlign: "center",
                width: "100%",
                color: "#A0A0A0",
                fontSize: "1.5rem",
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              {todos.length > 0 ? "My Todo List" : ""}
            </Typography>
          </Grid>
          <Grid container>
            <Grid item md={2} />
            <Grid item xs={12} md={8} justify="center" alignItems="center">
              {todos.length > 0 ? (
                todos.map((todo) => {
                  return <TodoItem item={todo.title} id={todo.id} />;
                })
              ) : (
                <Typography className={classes.emptyTodo}>No todos</Typography>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default TodoList;
