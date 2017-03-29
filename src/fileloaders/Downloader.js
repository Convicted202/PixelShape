import FileSaver from 'file-saver';
import JSZip from 'jszip';

import { Files } from '../defaults/constants';

const toBlobPolyfill = (canvas, callback, type, quality) => {
  let binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
      len = binStr.length,
      arr = new Uint8Array(len),
      i = 0;

  for (; i < len; i++) arr[i] = binStr.charCodeAt(i);

  callback(
    new Blob([arr], {
      type: type || Files.MIMETYPE.PNG
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
  static prepareGIFBlobAsync (data, name) {
    return new Promise(resolve => {
      const len = data.length,
            bytes = [];

      let i = 0;

      for (; i < len; i++)
        bytes[i] = data.charCodeAt(i);

      resolve({
        blob: new Blob([new Uint8Array(bytes)], { type: Files.MIMETYPE.GIF }),
        name
      });
    });
  }

  static prepareJSONBlobAsync (data, name) {
    return new Promise(resolve => {
      const json = JSON.stringify(data);

      resolve({
        blob: new Blob([json], { type: Files.MIMETYPE.JSON }),
        name
      });
    });
  }

  static prepareHTMLBlobAsync (dataHTML, name) {
    return new Promise(resolve => {
      const serializer = new XMLSerializer(),
            html = serializer.serializeToString(dataHTML);

      resolve({
        blob: new Blob([html], { type: Files.MIMETYPE.HTML }),
        name
      });
    });
  }

  static prepareCanvasBlobAsync (canvas, name) {
    return new Promise(resolve => {
      toBlob(canvas)(blob => {
        resolve({
          blob,
          name
        });
      }, Files.MIMETYPE.PNG);
    });
  }

  static asFiles (asyncFileArr /* [{name: ..., blob: ...}] */) {
    asyncFileArr.forEach(promise =>
      promise.then(blobObj =>
        FileSaver.saveAs(blobObj.blob, blobObj.name)
      )
    );
  }

  static asZIP (asyncFileArr /* [{name: ..., blob: ...}] */, name = 'myZip.zip') {
    const zip = new JSZip();

    Promise.all(asyncFileArr)
      .then(() =>
        zip.generateAsync(
          {
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: {
              level: 6
            }
          },
          data => console.log(data.percent | 0)
        ).then(blob => FileSaver.saveAs(blob, name))
      );

    asyncFileArr.forEach(promise =>
      promise.then(blobObj =>
        zip.file(
          blobObj.name,
          blobObj.blob,
          { binary: true }
        )
      )
    );
  }
}
