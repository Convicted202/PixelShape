import Downloader from '../fileloaders/Downloader';
import Uploader from '../fileloaders/Uploader';
import { StateConverter } from './StateConverter';

class StateLoader {
  prepareBeforeDownload (state) {
    return StateConverter.convertToExport(state);
  }

  download (state, fileName) {
    Downloader.asJSON(state, fileName);
  }

  prepareAndDownload (state, fileName) {
    const prepared = this.prepareBeforeDownload(state);

    this.download(prepared, fileName);
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
