const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  timeOut: false,
  timer: 30,
  round: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case "TIME_OVER":
    return {
      ...state, timeOut: action.payload,
    };
  case "ASSERTIONS":
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case "SET_TIMER":
    return {
      ...state, timer: action.payload,
    };
  case "SET_SCORE":
    return {
      ...state, score: action.payload,
    };
  case "NEXT_GAME":
    return {
      ...state,
      round: state.round + 1,
      isButtonRender: false,
    };
  case "RESET_STATE":
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default gameReducer;
