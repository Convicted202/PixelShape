import test from 'blue-tape';
import sinon from 'sinon';
import Bucket from '../../src/modules/bucket/Bucket';

let bucket;

const before = () => {
  const rndrCtx = new RenderingContext2d(5, 5),
        bfrCtx = new RenderingContext2d(5, 5);

  bucket = new Bucket();
  bucket._buffer = bfrCtx;
  bucket._ctx = rndrCtx;
};

test('Bucket =>', (expect) => {
  expect.test('::onMouseDown', (expect) => {
    before();

    bucket.draw = sinon.spy();
    bucket.onMouseDown(1, 1);

    expect.ok(bucket.mouseDown, 'Should set mouseDown toggle to true');
    expect.ok(bucket.draw.called, 'Should do the drawing on mouseDown');
    expect.end();
  });

  expect.test('::onMouseMove', (expect) => {
    before();

    bucket.handleGhostPixelMove = sinon.spy();
    bucket.onMouseMove(1, 1);

    expect.equal(bucket.state.size, 1, 'Should set pixel size to minimum of 1');
    expect.ok(bucket.handleGhostPixelMove.called, 'Should do the drawing of ghost pixel on mouseMove');
    expect.false(bucket.mouseDown, 'Should unset mouseDown toggle to false');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    bucket.mouseDown = true;
    bucket.onMouseUp(1, 1);
    expect.false(bucket.mouseDown, 'Should unset mouseDown toggle to false');

    bucket.mouseDown = false;
    bucket.onMouseUp(1, 1);
    expect.false(bucket.mouseDown, 'Should not modify mouseDown toggle if previously set to false');
    expect.end();
  });

  expect.test('::draw', (expect) => {
    before();

    bucket.state.color = '#808080'; // rgba(128, 128, 128, 255)
    bucket._naturalImageData = new ImageData(5, 5);
    bucket.draw(bucket._ctx, 1, 1);
    const data = bucket._naturalImageData.data,
          amount = Object.keys(data).filter(part => data[part] === 128).length,
          expected = 5 * 5 * 3;

    expect.equal(amount, expected, 'Should fill imageData with white');
    expect.end();
  });

  expect.end();
});
