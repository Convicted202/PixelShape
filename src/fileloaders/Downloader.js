import FileSaver from 'file-saver';

const Type = {
  JSON: 'application/json',
  GIF: 'image/gif',
  PNG: 'image/png'
};

const toBlobPolyfill = (canvas, callback, type, quality) => {
  let binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
      len = binStr.length,
      arr = new Uint8Array(len),
      i = 0;

  for (; i < len; i++) arr[i] = binStr.charCodeAt(i);

  callback(
    new Blob([arr], {
      type: type || Type.PNG
    })
  );
};

const toBlob = canvas => {
  const realToBlob = canvas.toBlob
          ? canvas.toBlob.bind(canvas)
          : toBlobPolyfill.bind(null, canvas);

  return function (cb, type, quality) {
    realToBlob(cb, type, quality);
  };
};

export default class Downloader {
  static prepareGIFBlob (data) {
    const len = data.length,
          bytes = [];

    let i = 0;

    for (; i < len; i++)
      bytes[i] = data.charCodeAt(i);

    return new Blob([new Uint8Array(bytes)], { type: Type.GIF });
  }

  static prepareJSONBlob (data) {
    const json = JSON.stringify(data);

    return new Blob([json], { type: Type.JSON });
  }

  static canvasAsPNG (canvas, name = 'myPng.png') {
    toBlob(canvas)(blob => {
      FileSaver.saveAs(blob, name);
    }, Type.PNG);
  }

  static asGIF (data, name = 'myGif.gif') {
    const blob = Downloader.prepareGIFBlob(data);
    FileSaver.saveAs(blob, name);
  }

  static asJSON (data, name = 'myJSON.json') {
    const blob = Downloader.prepareJSONBlob(data);
    FileSaver.saveAs(blob, name);
  }
}
