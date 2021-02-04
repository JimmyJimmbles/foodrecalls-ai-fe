const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const saveTokens = (token) =>
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

const getTokens = () => JSON.parse(localStorage.getItem(TOKEN_KEY));

const deleteTokens = () => localStorage.removeItem(TOKEN_KEY);

export { saveTokens, getTokens, deleteTokens };
