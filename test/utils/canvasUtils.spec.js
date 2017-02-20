import test from 'blue-tape';
import sinon from 'sinon';

import {
  enableImageSmoothing,
  disableImageSmoothing,
  drawGrid,
  createCanvas,
  resizeImageData,
  extendImageData,
  combineImageDataToCanvas,
  combineColorPaletteToCanvas
} from '../../src/utils/canvasUtils';

import { getColor, putColor, getPixelFromImageData } from '../../src/utils/colorUtils';

test('Canvas Utils =>', (expect) => {
  expect.test('::enableImageSmoothing', (expect) => {
    const context = new RenderingContext2d();
    enableImageSmoothing(context);
    expect.true(context.imageSmoothingEnabled, 'Should apply image smoothing to context');
    expect.end();
  });

  expect.test('::disableImageSmoothing', (expect) => {
    const context = new RenderingContext2d();
    disableImageSmoothing(context);
    expect.false(context.imageSmoothingEnabled, 'Should remove image smoothing from context');
    expect.end();
  });

  expect.test('::drawGrid', (expect) => {
    const context = new RenderingContext2d(),
          gutter = 2, stroke = '#000';

    drawGrid(context, 5, 2);
    expect.ok(context.clearRect.called, 'Should clear canvas before drawing grid');
    expect.equal(context.lineTo.callCount, 40, 'Should create vertical and horizontal lines');
    expect.ok(context.lineWidth === gutter && context.strokeStyle === stroke, 'Should set grid options');
    expect.ok(context.stroke.called, 'Should draw actual grid');
    expect.end();
  });

  expect.test('::createCanvas', (expect) => {
    const canvas = createCanvas(100, 100);

    expect.ok(canvas.width === 100 && canvas.height === 100, 'Should create a canvas with width and height specified');
    expect.end();
  });

  expect.test('::resizeImageData', (expect) => {
    const iData = resizeImageData(new ImageData(5, 5), 100, 100);

    expect.ok(iData.width === 100 && iData.height === 100, 'Should return new image data of requested size');
    expect.end();
  });

  // need to add more tests to test all possible cases
  expect.test('::extendImageData', (expect) => {
    const iData = new ImageData(1, 1);

    putColor(iData, 0, [255, 255, 255, 255]);

    const _iData = extendImageData(iData, 3, 3, 'oo'),
          index = getPixelFromImageData(_iData, 1, 1);

    expect.deepEqual(getColor(_iData, 0), [0, 0, 0, 0], 'Should not touch other pixel than the central one');
    expect.deepEqual(getColor(_iData, index), [255, 255, 255, 255], 'Should not touch other pixel than the central one');
    expect.end();
  });

  expect.test('::combineImageDataToCanvas', (expect) => {
    const iDatas = [new ImageData(5, 5), new ImageData(5, 5)],
          canvas = combineImageDataToCanvas(iDatas, 5, 5);

    expect.ok(canvas.width === 10 && canvas.height === 5, 'Should create a resulting canvas of proper size');
    expect.end();
  });

  expect.test('::combineColorPaletteToCanvas', (expect) => {
    const colors = ['#000000', '#ffffff'],
          canvas = combineColorPaletteToCanvas(colors, 100, 500);

    expect.ok(canvas.width === 500 && canvas.height === 200, 'Should create a resulting canvas of proper size');
    expect.end();
  });

  expect.end();
});
