const initialState = {
  todos: [],
  loading: false,
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.value,
      };
    case "LOADING_TODOS":
      return {
        ...state,
        loading: action.value,
      };

    default:
      return state;
  }
};
export default todoReducer;
