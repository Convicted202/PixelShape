import FileSaver from 'file-saver';

const Type = {
  JSON: 'application/json',
  GIF: 'image/gif'
};

export default class Downloader {
  static asGIF (data, name = 'myGif.gif') {
    const len = data.length,
          bytes = [];

    let i = 0, blob = null;

    for (; i < len; i++)
      bytes[i] = data.charCodeAt(i);

    blob = new Blob([new Uint8Array(bytes)], { type: Type.GIF });
    FileSaver.saveAs(blob, name);
  }

  static asJSON (data, name = 'myJSON.json') {
    const json = JSON.stringify(data);

    let blob = null;

    blob = new Blob([json], { type: Type.JSON });
    FileSaver.saveAs(blob, name);
  }
}
