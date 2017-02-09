const Extension = {
  PIXEL_SHAPE: '.pxlsh',
  JSON: '.json',
  GIF: '.gif'
};

const Errors = {
  BAD_EXTENSION: `Supplied file is not of ${Extension.PIXEL_SHAPE} type`,
  FILE_CORRUPTED: 'Cannot read file. Supplied file is corrupted'
};

export default class Uploader {
  static asJSONAsync (file) {
    return new Promise((resolve, reject) => {
      const fReader = new FileReader();

      if (!file.name.match(Extension.PIXEL_SHAPE)) reject(Errors.BAD_EXTENSION);

      fReader.addEventListener('load', e => {
        let json;

        try {
          json = JSON.parse(e.target.result);
        } catch (ex) {
          reject(Errors.FILE_CORRUPTED);
        }

        resolve({ file, json });
      });

      fReader.addEventListener('onerror', e => {
        reject(e.message);
      });

      fReader.readAsText(file);
    });
  }
}
