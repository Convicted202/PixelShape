import FileSaver from 'file-saver';

const Type = {
  JSON: 'application/json',
  GIF: 'image/gif'
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

  static asGIF (data, name = 'myGif.gif') {
    const blob = Downloader.prepareGIFBlob(data);
    FileSaver.saveAs(blob, name);
  }

  static asJSON (data, name = 'myJSON.json') {
    const blob = Downloader.prepareJSONBlob(data);
    FileSaver.saveAs(blob, name);
  }
}
