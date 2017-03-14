function ImageData (width, height) {
  return {
    data: new Uint8ClampedArray(width * height * 4),
    width: width,
    height: height
  }
}

export default ImageData;
