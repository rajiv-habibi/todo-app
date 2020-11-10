import firebase from "../config/firebase";

export const signup = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        dispatch({ type: "LOADING", value: false });
        resolve(true);
      })
      .catch((error) => {
        dispatch({ type: "ERROR_SIGNUP", value: error });
        dispatch({ type: "LOADING", value: false });
        reject(false);
      });
  });
};

export const signin = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        dispatch({ type: "LOADING", value: true });
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            const dataUser = {
              email: res.user.email,
              uid: res.user.uid,
            };
            dispatch({ type: "LOADING", value: false });
            dispatch({ type: "LOGIN", value: true });
            localStorage.setItem("login", true);
            console.log(localStorage.getItem("login"));
            dispatch({ type: "USER", value: dataUser });
            resolve(dataUser);
          })
          .catch((error) => {
            dispatch({ type: "LOADING", value: false });
            dispatch({ type: "LOGIN", value: false });
            localStorage.setItem("login", false);

            dispatch({ type: "ERROR_SIGNIN", value: error });
            reject(false);
          });
      });
  });
};

export const signout = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => dispatch({ type: "LOGIN", value: false }))
    .catch(() => console.log("signout failed"));
};
