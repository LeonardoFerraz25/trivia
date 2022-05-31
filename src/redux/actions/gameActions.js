export const timeOver = (isTimerOver) => ({
  type: "TIME_OVER",
  payload: isTimerOver,
});

export const clickAssertions = () => ({
  type: "ASSERTIONS",
});

export const setTimer = (timer) => ({
  type: "SET_TIMER",
  payload: timer,
});

export const actionScore = (score) => ({
  type: "SET_SCORE",
  payload: score,
});

export const actionNextQuestion = () => ({
  type: "NEXT_GAME",
});

export const actionRenderButton = () => ({
  type: "RENDER_BUTTON",
});

export const resetState = () => ({
  type: "RESET_STATE",
});
