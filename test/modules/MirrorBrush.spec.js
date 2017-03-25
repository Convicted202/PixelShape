import test from 'blue-tape';
import sinon from 'sinon';
import MirrorBrush from '../../src/modules/mirrorbrush/MirrorBrush';
import lineTo from '../importStubs/lineTo.stub';

let mirrorbrush;

const before = () => {
  const rndrCtx = new RenderingContext2d(5, 5),
        bfrCtx = new RenderingContext2d(5, 5);

  mirrorbrush = new MirrorBrush();
  mirrorbrush._buffer = bfrCtx;
  mirrorbrush._ctx = rndrCtx;
};

test('MirrorBrush =>', (expect) => {
  expect.test('::constructor', (expect) => {
    before();

    expect.ok(mirrorbrush.shift, 'Should initialize shifts');
    expect.end();
  });

  expect.test('::getMirrorGhost', (expect) => {
    before();

    const actual = mirrorbrush.getMirrorGhost(mirrorbrush._ctx, 2, 2),
          expected = {
            x: 2,
            y: 3
          };

    expect.deepEqual(actual, expected, 'Should calculate mirror ghost position');
    expect.end();
  });

  expect.test('::mirroredPixelDraw', (expect) => {
    before();

    mirrorbrush.drawPixelCell = sinon.spy();

    mirrorbrush.mirroredPixelDraw(mirrorbrush._ctx, 2, 2);
    expect.ok(mirrorbrush.drawPixelCell.calledWith(mirrorbrush._ctx, 2, 2), 'Should execute original brush drawing');
    expect.ok(mirrorbrush.drawPixelCell.calledWith(mirrorbrush._ctx, 2, 3), 'Should execute mirrored brush drawing');
    expect.end();
  });

  expect.test('::mirroredDraw', (expect) => {
    before();

    mirrorbrush.draw = sinon.spy();

    mirrorbrush.mirroredDraw(mirrorbrush._ctx, 2, 2, 3, 3);
    expect.ok(mirrorbrush.draw.calledWith(mirrorbrush._ctx, 2, 2, 3, 3), 'Should execute original brush drawing');
    expect.ok(mirrorbrush.draw.calledWith(mirrorbrush._ctx, 2, 3, 3, 2), 'Should execute mirrored brush drawing');
    expect.end();
  });

  expect.test('::handleGhostPixelMove', (expect) => {
    before();

    mirrorbrush.clearPixelCell = sinon.spy();
    mirrorbrush.drawPixelCell = sinon.spy();

    mirrorbrush.handleGhostPixelMove(2, 2);

    expect.ok(mirrorbrush.clearPixelCell.calledTwice, 'Should clear both last brush drawing and last mirrored drawing');
    expect.ok(mirrorbrush.drawPixelCell.calledTwice, 'Should draw both new brush drawing and new mirrored drawing');
    expect.end();
  });

  expect.test('::onMouseDown', (expect) => {
    before();

    mirrorbrush.mirroredPixelDraw = sinon.spy();
    mirrorbrush.onMouseDown(1, 1);

    expect.ok(mirrorbrush.mouseDown, 'Should set mouseDown toggle to true');
    expect.ok(mirrorbrush.mirroredPixelDraw.calledWith(mirrorbrush._ctx), 'Should do the drawing on mouseDown');
    expect.end();
  });

  expect.test('::onMouseMove', (expect) => {
    before();

    mirrorbrush.handleGhostPixelMove = sinon.spy();
    mirrorbrush.mirroredDraw = sinon.spy();
    mirrorbrush.onMouseMove(1, 1);

    expect.ok(mirrorbrush.handleGhostPixelMove.called, 'Should do ghost drawing if mouseDown toggle is not set to true');
    expect.false(mirrorbrush.mirroredDraw.calledWith(mirrorbrush._ctx), 'Should not do actual drawing if mouseDown toggle is not set to true');

    mirrorbrush.handleGhostPixelMove = sinon.spy();
    mirrorbrush.mirroredDraw = sinon.spy();
    mirrorbrush.mouseDown = true;
    mirrorbrush.onMouseMove(1, 1);

    expect.false(mirrorbrush.handleGhostPixelMove.called, 'Should not do ghost drawing if mouseDown toggle is set to true');
    expect.ok(mirrorbrush.mirroredDraw.calledWith(mirrorbrush._ctx), 'Should do actual drawing if mouseDown toggle is set to true');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    mirrorbrush.mirroredDraw = sinon.spy();
    mirrorbrush.onMouseUp(1, 1);

    expect.false(mirrorbrush.mirroredDraw.called, 'Should not execute drawing if mouseDown toggle is not set to true');

    mirrorbrush.mirroredDraw = sinon.spy();
    mirrorbrush.mouseDown = true;
    mirrorbrush.onMouseUp(1, 1);

    expect.ok(mirrorbrush.mirroredDraw.calledWith(mirrorbrush._ctx), 'Should do actual drawing if mouseDown toggle is set to true');
    expect.false(mirrorbrush.mouseDown, 'Should unset mouseDown toggle to false');
    expect.end();
  });

  expect.test('::draw', (expect) => {
    before();

    mirrorbrush.drawPixelCell = sinon.spy();

    mirrorbrush.draw();
    expect.ok(lineTo.called && mirrorbrush.drawPixelCell.called, 'Should call lineTo on draw method with drawPixelCell as callback');
    expect.end();
  });

  expect.end();
});
