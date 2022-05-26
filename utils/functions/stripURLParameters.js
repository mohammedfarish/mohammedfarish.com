const stripURLParameters = (url) => {
  const urlParts = url.split("?");
  return urlParts[0];
};

export default stripURLParameters;
