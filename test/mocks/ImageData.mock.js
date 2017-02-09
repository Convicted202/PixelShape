function ImageData (width, height) {
  return {
    data: new Uint8ClampedArray(width * height * 4),
    width: 100,
    height: 100
  }
}

export default ImageData;
