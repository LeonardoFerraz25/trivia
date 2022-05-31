const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  token: '',
  picture: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case "SET_USER":
    return {
      ...state, name: action.payload.name, gravatarEmail: action.payload.email,
    };
  case "SET_TOKEN":
    localStorage.setItem('token', action.payload);
    return {
      ...state, token: action.payload,
    };
  case "SET_PICTURE":
    return {
      ...state,
      picture: action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
