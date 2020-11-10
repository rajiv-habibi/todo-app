import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  TextField,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import { updateTodo, deleteTodo } from "../../actions/todoAction";

const useStyles = makeStyles((theme) => ({
  iconSpace: {
    margin: theme.spacing(0, 3),
  },
  list: {
    textDecoration: "none",
    fontStyle: "none",
    "&:hover": {
      textDecoration: "line-through",
      fontStyle: "italic",
      cursor: "pointer",
    },
  },
  listDone: {
    textDecoration: "line-through",
    fontStyle: "italic",
    "&:hover": {
      textDecoration: "none",
      fontStyle: "none",
      cursor: "pointer",
    },
  },
}));

const TodoItem = ({ item, id }) => {
  const classes = useStyles();
  const [editInput, setEditInput] = useState("");
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [done, setDone] = useState(false);

  const submitEdit = () => {
    const userId = JSON.parse(localStorage.getItem("userInfo"));
    const data = {
      title: editInput,
      todoId: id,
      userId: userId.uid,
    };
    dispatch(updateTodo(data));
    setModalEdit(false);
  };
  const modalChange = () => {
    setTitle(item);
    setModalEdit(true);
  };
  const handleDelete = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const data = {
      todoId: id,
      userId: userData.uid,
    };
    dispatch(deleteTodo(data));
    setDialogDelete(false);
  };
  return (
    <>
      <Divider variant="middle" />
      <List>
        <ListItem>
          <ListItemText
            primary={item}
            className={done ? classes.listDone : classes.list}
            onClick={() => setDone(!done)}
          />
          <ListItemSecondaryAction className={classes.iconSpace}>
            <EditIcon
              style={{ cursor: "pointer" }}
              className={classes.iconSpace}
              onClick={modalChange}
            ></EditIcon>
            <Dialog
              className={classes.dialog}
              open={modalEdit}
              onClose={() => setModalEdit(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <TextField
                id="standard-basic"
                margin="dense"
                defaultValue={title}
                onChange={(e) => setEditInput(e.target.value)}
                style={{
                  padding: "2em",
                }}
                fullWidth
              />
              <DialogActions>
                <Button
                  onClick={() => setModalEdit(false)}
                  style={{ color: "#006064", fontWeight: "500" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitEdit}
                  style={{ color: "#006064", fontWeight: "500" }}
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
            <DeleteIcon
              onClick={() => setDialogDelete(true)}
              style={{ cursor: "pointer" }}
            ></DeleteIcon>
            <Dialog open={dialogDelete}>
              <DialogContentText style={{ padding: "2em" }}>
                Are you sure want to delete this todo ?
              </DialogContentText>
              <DialogActions>
                <Button
                  onClick={() => setDialogDelete(false)}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider variant="middle" />
    </>
  );
};
export default TodoItem;
