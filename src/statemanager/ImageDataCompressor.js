import pako from 'pako';

// This will be used to serialize and deserialize imageData
export default class ImageDataCompressor {
  // imageData could be an object instead of an ImageData entity
  // so for the sake of compatibility need to have width and height provided
  static compress (imageData, width, height) {
    let iData = imageData.data,
        iDataArray,
        deflated;

    // 1. first convert object to Uint8ClampedArray
    // 2. then deflate
    // 3. then convert to array to get rid of extra keys
    //
    // just in case if length is messed up
    iData.length = width * height * 4;
    iDataArray = Array.prototype.slice.call(iData, 0);

    iDataArray = Uint8Array.from(iDataArray);
    deflated = pako.deflate(iDataArray);

    return Array.from(deflated);
  }

  // imageData is an array, so need to know what width and height are
  static decompress (imageData, width, height) {
    let iData = imageData.data,
        iDataArray,
        inflated;

    iDataArray = Uint8Array.from(iData);

    inflated = pako.inflate(iDataArray);
    iDataArray = Uint8ClampedArray.from(inflated);

    return new ImageData(iDataArray, width, height);
  }
}
