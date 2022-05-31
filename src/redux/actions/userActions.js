export const actionSetUser = ({ name, email }) => ({
  type: "SET_USER",
  payload: {
    name,
    email,
  },
});

export const actionSetTokem = (token) => ({
  type: "SET_TOKEN",
  payload: token,
});

export const actionPicture = (picture) => ({
  type: "SET_PICTURE",
  payload: picture,
});