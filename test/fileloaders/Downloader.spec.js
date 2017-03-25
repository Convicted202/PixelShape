import test from 'blue-tape';
import Downloader from '../../src/fileloaders/Downloader';

const canvas = new RenderingContext2d(100, 100).canvas;

test('Downloader =>', (expect) => {
  expect.test('::prepareGIFBlobAsync', (expect) => {
    return Downloader.prepareGIFBlobAsync('abcd', 'newfile.gif')
      .then(dataObject => {
        const blob = dataObject.blob;
        expect.equal(blob.type, 'image/gif', 'Should encode data as gif');
        expect.equal(dataObject.name, 'newfile.gif', 'Should create object with specific file name');
      });
  });

  expect.test('::prepareJSONBlobAsync', (expect) => {
    return Downloader.prepareJSONBlobAsync('abcd', 'newfile.json')
      .then(dataObject => {
        const blob = dataObject.blob;
        expect.equal(blob.type, 'application/json', 'Should encode data as json');
        expect.equal(dataObject.name, 'newfile.json', 'Should create object with specific file name');
      });
  });

  expect.test('::prepareCanvasBlobAsync', (expect) => {
    return Downloader.prepareCanvasBlobAsync(canvas, 'newfile.png')
      .then(dataObject => {
        const blob = dataObject.blob;
        expect.equal(blob.type, 'image/png', 'Should encode data as png');
        expect.equal(dataObject.name, 'newfile.png', 'Should create object with specific file name');
      });
  });

  expect.end();
});
