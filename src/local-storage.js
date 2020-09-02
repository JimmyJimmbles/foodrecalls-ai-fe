const TOKEN_KEY =
  'B0DCD23380A238525875A6D2CEADCC4CC9B101557822A31E080D97AAFB635949';

const saveTokens = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

const getTokens = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};

const deleteTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { saveTokens, getTokens, deleteTokens };
