export function mergeSort(array) {
  let mid = Math.floor(array.length / 2);
  if (array.length === 1) {
    return array;
  }

  const sortedLeft = mergeSort(array.slice(0, mid));
  const sortedRight = mergeSort(array.slice(mid));

  return compare(sortedLeft, sortedRight);

  function compare(left, right) {
    let sortedArr = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
    }
    return [...sortedArr, ...left, ...right];
  }
}
