function ImageData () {
  let args = [...arguments], initial;

  if (arguments.length < 2) {
    throw new TypeError(`
      Failed to construct 'ImageData': 2 arguments required, but only ${arguments.length} present.
    `);
  }

  if (args.length > 2) initial = args.shift();

  if (initial && !(initial instanceof Uint8ClampedArray)) {
    throw new TypeError(`
      Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'
    `);
  }

  if (initial && initial.length !== 4 * args[0] * args[1]) {
    throw new Error(`
      Failed to construct 'ImageData': The input data byte length is not a multiple of (4 * width * height)
    `);
  }

  return {
    data: initial || new Uint8ClampedArray(4 * args[0] * args[1]),
    width: args[0],
    height: args[1]
  }
}

export default ImageData;
