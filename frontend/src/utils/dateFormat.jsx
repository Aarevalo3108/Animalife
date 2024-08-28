


const dateFormat = (date) => {
  const dateObj = new Date(date);
  return dateObj.toISOString().slice(0, 10).split('-').reverse().join('-');
};
export default dateFormat