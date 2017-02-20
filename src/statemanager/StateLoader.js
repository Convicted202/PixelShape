import Downloader from '../fileloaders/Downloader';
import Uploader from '../fileloaders/Uploader';
import { StateConverter } from './StateConverter';

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
}

export default new StateLoader();
