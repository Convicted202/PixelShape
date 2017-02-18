import test from 'blue-tape';
import sinon from 'sinon';
import RenderingContext2d from '../mocks/RenderingContext2d.mock';
import ImageData from '../mocks/ImageData.mock.js';

import {
  enableImageSmoothing,
  disableImageSmoothing,
  drawGrid
} from '../../src/utils/canvasUtils';

import { getColor, putColor } from '../../src/utils/colorUtils';

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

  expect.end();
});
