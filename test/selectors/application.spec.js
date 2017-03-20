import test from 'blue-tape';
import sinon from 'sinon';

import {
  getApplication,
  getProjectGuid,
  getResetPaletteState,
  getGridState,
  getStretchState,
  getCurrentAnchor,
  getImageSize,
  getImageSizeWidth,
  getImageSizeHeight,
  getPixelSize,
  getOptimalPixelSize,
  getSurfaceWidth,
  getSurfaceHeight,
  getUnscaledSurfaceWidth,
  getUnscaledSurfaceHeight,
  getSpritesheetDownloadOption,
  getGifDownloadOption,
  getProjectDownloadOption,
  getPaletteDownloadOption
} from '../../src/selectors/application';

const state = {
  undoables: {
    present: {
      application: {
        projectGuid: 'random',
        size: {
          width: 32,
          height: 32
        },
        pixelSize: 10,
        optimalPixelSize: 20,
        surfaceConstraints: {
          width: 2000,
          height: 2000
        },
        resetPalette: false,
        grid: false,
        stretch: false,
        anchor: 'oo',
        downloadOptions: {
          includeGif: true,
          includeSpritesheet: true,
          includeProject: true,
          includePalette: true
        }
      }
    }
  }
};

test('application =>', (expect) => {
  expect.test('::getApplication', (expect) => {
    const next = getApplication({
      undoables: {
        present: {
          application: 'app'
        }
      }
    });

    expect.equal(next, 'app', 'Should return present state of application');
    expect.end();
  });

  expect.test('::getProjectGuid', (expect) => {
    const next = getProjectGuid(state);

    expect.equal(next, 'random', 'Should return application guid');
    expect.end();
  });

  expect.test('::getResetPaletteState', (expect) => {
    const next = getResetPaletteState(state);

    expect.false(next, 'Should return status of resetPalette toggle');
    expect.end();
  });

  expect.test('::getGridState', (expect) => {
    const next = getGridState(state);

    expect.false(next, 'Should return status of grid toggle');
    expect.end();
  });

  expect.test('::getStretchState', (expect) => {
    const next = getStretchState(state);

    expect.false(next, 'Should return status of stretch toggle');
    expect.end();
  });

  expect.test('::getStretchState', (expect) => {
    const next = getStretchState(state);

    expect.false(next, 'Should return status of stretch toggle');
    expect.end();
  });

  expect.test('::getCurrentAnchor', (expect) => {
    const next = getCurrentAnchor(state);

    expect.equal(next, 'oo', 'Should return status of resize anchor');
    expect.end();
  });

  expect.test('::getImageSize', (expect) => {
    const next = getImageSize(state);

    expect.deepEqual(next, { width: 32, height: 32 }, 'Should return current image size');
    expect.end();
  });

  expect.test('::getImageSizeWidth', (expect) => {
    const next = getImageSizeWidth(state);

    expect.equal(next, 32, 'Should return current image width');
    expect.end();
  });

  expect.test('::getImageSizeHeight', (expect) => {
    const next = getImageSizeHeight(state);

    expect.equal(next, 32, 'Should return current image height');
    expect.end();
  });

  expect.test('::getPixelSize', (expect) => {
    const next = getPixelSize(state);

    expect.equal(next, 10, 'Should return current pixel size');
    expect.end();
  });

  expect.test('::getOptimalPixelSize', (expect) => {
    const next = getOptimalPixelSize(state);

    expect.equal(next, 20, 'Should return current optimal pixel size');
    expect.end();
  });

  expect.test('::getSurfaceWidth', (expect) => {
    const next = getSurfaceWidth(state);

    expect.equal(next, 320, 'Should return pixel size multiplied by surface width');
    expect.end();
  });

  expect.test('::getSurfaceHeight', (expect) => {
    const next = getSurfaceHeight(state);

    expect.equal(next, 320, 'Should return pixel size multiplied by surface height');
    expect.end();
  });

  expect.test('::getUnscaledSurfaceWidth', (expect) => {
    const next = getUnscaledSurfaceWidth(state);

    expect.equal(next, 640, 'Should return optimal pixel size multiplied by surface width');
    expect.end();
  });

  expect.test('::getUnscaledSurfaceHeight', (expect) => {
    const next = getUnscaledSurfaceHeight(state);

    expect.equal(next, 640, 'Should return optimal pixel size multiplied by surface height');
    expect.end();
  });

  expect.test('::getSpritesheetDownloadOption', (expect) => {
    const next = getSpritesheetDownloadOption(state);

    expect.true(next, 'Should return current status of download spritesheet toggle');
    expect.end();
  });

  expect.test('::getGifDownloadOption', (expect) => {
    const next = getGifDownloadOption(state);

    expect.true(next, 'Should return current status of download gif toggle');
    expect.end();
  });

  expect.test('::getProjectDownloadOption', (expect) => {
    const next = getProjectDownloadOption(state);

    expect.true(next, 'Should return current status of download project toggle');
    expect.end();
  });

  expect.test('::getPaletteDownloadOption', (expect) => {
    const next = getPaletteDownloadOption(state);

    expect.true(next, 'Should return current status of download palette toggle');
    expect.end();
  });

  expect.end();
});
