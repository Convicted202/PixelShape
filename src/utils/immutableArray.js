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
      ...arr.slice(0, index + 1),
      value,
      ...arr.slice(index + 1)
    ];
  }

  static swapWithPrevious (arr, index) {
    return [
      ...arr.slice(0, index - 1),
      arr[index],
      arr[index - 1],
      ...arr.slice(index + 1)
    ];
  }

  static swapWithNext (arr, index) {
    return [
      ...arr.slice(0, index),
      arr[index + 1],
      arr[index],
      ...arr.slice(index + 2)
    ];
  }
}
