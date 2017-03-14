import Downloader from '../fileloaders/Downloader';
import Uploader from '../fileloaders/Uploader';
import { StateConverter } from './StateConverter';
import GifLoader from '../libs/GifLoader';

class StateLoader {
  serializeForDownload (state) {
    return StateConverter.convertToExport(state);
  }

  prepareForDownload (state, fileName) {
    const serialized = this.serializeForDownload(state);

    return Downloader.prepareJSONBlobAsync(serialized, fileName);
  }

  prepareAfterUploadAsync (data) {
    const subState = StateConverter.convertToImport(data.json);

    return Promise.resolve({ file: data.file, json: subState });
  }

  // calls calback with { file, json }
  upload (file, callback) {
    Uploader.asJSONAsync(file)
      .then(this.prepareAfterUploadAsync.bind(this))
      .then(callback);
  }

  uploadGif (gif, callback) {
    const loader = GifLoader({ gif });

    loader.load()
      .then(frames => {
        const frame = frames[0],
              fps = Math.round(100 / frame.delay),
              width = frame.data.width,
              height = frame.data.height;

        const subState = StateConverter.createStateFromFramesData(frames, fps, width, height);

        return Promise.resolve({ file: gif, json: subState });
      })
      .then(callback);
  }
}

export default new StateLoader();
