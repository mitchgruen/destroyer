// Makes important properties on Axios return objects easier to access
const simpleError = (err) => {
  return err.response.data;
};

export { simpleError };
