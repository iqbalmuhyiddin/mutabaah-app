const formatNumber = num => {
  if (!num) {
    return 0;
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export default formatNumber;
