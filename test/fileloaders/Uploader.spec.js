import test from 'blue-tape';
import Uploader from '../../src/fileloaders/Uploader';

let json = {
    a: 1,
    b: 2
  },
  str = JSON.stringify(json);


test('Uploader =>', (expect) => {
  expect.test('::asJSONAsync:resolution', (expect) => {
    let file = new File({
      buffer: new Buffer(str),
      name: 'newfile.pxlsh',
      type: 'application/json'
    });

    return Uploader.asJSONAsync(file)
      .then(dataObject => {
        expect.deepEqual(dataObject.json, json, 'Should provide incoming json further');
        expect.equal(dataObject.file, file, 'Should provide incoming file further');
      });
  });

  expect.test('::asJSONAsync:rejection1', (expect) => {
    let file = new File({
      buffer: new Buffer(str),
      name: 'newfile.random',
      type: 'application/json'
    });

    return Uploader.asJSONAsync(file)
      .then(
        null,
        error => {
          expect.deepEqual(error, 'Supplied file is not of .pxlsh type', 'Should throw if supplied file has different extension');
        });
  });

  expect.test('::asJSONAsync:rejection2', (expect) => {
    str += 'abc';

    let file = new File({
      buffer: new Buffer(str),
      name: 'newfile.pxlsh',
      type: 'application/json'
    });

    return Uploader.asJSONAsync(file)
      .then(
        null,
        error => {
          expect.deepEqual(error, 'Cannot read file. Supplied file is corrupted', 'Should throw if supplied file has unreadable data');
        });
  });

  expect.end();
});
