export default (str = '', length = 30) => {
  if (str.length > length) {
    return str.substring(0, length) + '...';
  } else {
    return str;
  }
};
