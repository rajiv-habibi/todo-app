const initialState = {
  loading: false,
  login: false,
  logout: false,
  user: {},
  errorSignin: "",
  errorSignup: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.value,
      };
    case "LOGIN":
      return {
        ...state,
        login: action.value,
      };
    case "USER":
      return {
        ...state,
        user: action.value,
      };
    case "LOGOUT":
      return {
        ...state,
        logout: action.value,
      };
    case "ERROR_SIGNIN":
      return {
        ...state,
        errorSignin: action.value,
      };
    case "ERROR_SIGNUP":
      return {
        ...state,
        errorSignup: action.value,
      };
    default:
      return state;
  }
};

export default authReducer;
