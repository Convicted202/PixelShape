const isInBounds = (arr, index) => (index < arr.length) && (index > -1);

export default class Immutable {
  static push (arr, value) {
    return [
      ...arr,
      value
    ];
  }

  static pop (arr) {
    return arr.slice(0, -1);
  }

  static shift (arr) {
    return arr.slice(1);
  }

  static unshift (arr, value) {
    return [
      value,
      ...arr
    ];
  }

  static remove (arr, index) {
    return [
      ...arr.slice(0, index),
      ...arr.slice(index + 1)
    ];
  }

  static insert (arr, value, index) {
    return [
      ...arr.slice(0, index),
      value,
      ...arr.slice(index)
    ];
  }

  static swapWithPrevious (arr, index) {
    if (!isInBounds(arr, index) || !isInBounds(arr, index - 1)) return [...arr];
    return [
      ...arr.slice(0, index - 1),
      arr[index],
      arr[index - 1],
      ...arr.slice(index + 1)
    ];
  }

  static swapWithNext (arr, index) {
    if (!isInBounds(arr, index) || !isInBounds(arr, index + 1)) return [...arr];
    return [
      ...arr.slice(0, index),
      arr[index + 1],
      arr[index],
      ...arr.slice(index + 2)
    ];
  }
}
