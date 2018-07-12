const capitalizeFirstLetter = someString => {
  return someString.charAt(0).toUpperCase() + someString.slice(1).toLowerCase();
};

export { capitalizeFirstLetter };
