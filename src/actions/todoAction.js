import { database } from "../config/firebase";

export const addTodo = (data) => (dispatch) => {
  database.ref("todos/" + data.userId).push({
    title: data.title,
  });
};

export const updateTodo = (data) => (dispatch) => {
  const urlUpdate = database.ref(`todos/${data.userId}/${data.todoId}`);
  urlUpdate.set({ title: data.title }, function (error) {
    if (error) {
      console.log("error");
    } else {
      console.log("success");
    }
  });
};

export const deleteTodo = (data) => (dispatch) => {
  const urlDelete = database.ref(`todos/${data.userId}/${data.todoId}`);
  urlDelete.remove();
};

export const getTodo = (userId) => (dispatch) => {
  const url = database.ref("todos/" + userId);
  new Promise((resolve, reject) => {
    dispatch({ type: "LOADING_TODOS", value: true });
    url.on("value", (snapshot) => {
      let data = [];
      if (snapshot.val() == null) {
        dispatch({ type: "LOADING_TODOS", value: false });
      } else {
        dispatch({ type: "LOADING_TODOS", value: false });
        const vals = snapshot.val();
        for (let key in vals) {
          data.push({
            ...vals[key],
            id: key,
          });
        }
      }
      dispatch({ type: "GET_TODOS", value: data });
    });
  });
};

// export const getTodo = () => (dispatch) => {
//   dispatch({ type: "LOADING_TODOS", value: true });
//   database.ref("todos").on("value", (snap) => {
//     const vals = snap.val();
//     let data = [];
//     if (vals == null) {
//       dispatch({ type: "LOADING_TODOS", value: false });
//     } else {
//       dispatch({ type: "LOADING_TODOS", value: false });
//       Object.keys(vals).map((key) =>
//         data.push({
//           ...vals[key],
//           id: key,
//         })
//       );
//     }
//     console.log(vals);
//     dispatch({ type: "GET_TODOS", value: data });
//   });
// };
