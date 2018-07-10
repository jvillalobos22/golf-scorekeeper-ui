const getLoggedInUser = ({ authenticationState }) => {
  const loggedInUser = authenticationState.loggedIn
    ? {
        _id: authenticationState.user_id,
        displayName: authenticationState.user_display_name
      }
    : null;
  return loggedInUser;
};

export { getLoggedInUser };
