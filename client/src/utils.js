
export const removeItem = (arr, id) => {
  const index = arr.findIndex((item) => item.id === id);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
};
