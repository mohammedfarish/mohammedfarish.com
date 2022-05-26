const stripHTML = (str) => str.replace(/<[^>]*>/g, "");

export default stripHTML;
