import test from 'blue-tape';
import sinon from 'sinon';
import Boundshape from '../../src/modules/boundshape/Boundshape';

let boundshape;

const before = () => {
  boundshape = new Boundshape();
  boundshape._ctx = new RenderingContext2d();
  boundshape._buffer = new RenderingContext2d();
};

test('Boundshape =>', (expect) => {
  expect.test('::clearCoords', (expect) => {
    before();

    boundshape.clearCoords();
    expect.deepEqual(
      boundshape.coords,
      {x0: null, y0: null, x1: null, y1: null},
      'Should reset coordinates');
    expect.end();
  });

  expect.test('::onMouseDown', (expect) => {
    before();

    boundshape.onMouseDown(100, 100);
    expect.ok(boundshape.mouseDown, 'Should toggle drawing mode on');
    expect.ok(boundshape.coords.x0 === 100 && boundshape.coords.y0 === 100,
      'Should set inital [left, top] values');
    expect.end();
  });

  expect.test('::onMouseMove', (expect) => {
    before();

    boundshape.update = sinon.spy();

    boundshape.onMouseMove(100, 100);
    expect.notOk(boundshape.update.called, 'Should toggle drawing mode for rendering context');

    boundshape.mouseDown = true;
    boundshape.onMouseMove(100, 100);
    expect.ok(boundshape._buffer.clearRect.called, 'Should clear buffer context on each mouse move');
    expect.ok(boundshape.update.calledWith(boundshape._buffer), 'Should redraw shape on buffer on each mouse move');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    boundshape.update = sinon.spy();
    boundshape.mouseDown = true;
    boundshape.onMouseUp(100, 100);
    expect.notOk(boundshape.drawing, 'Should toggle drawing mode off');
    expect.ok(boundshape.update.calledWith(boundshape._ctx) && boundshape._buffer.clearRect.called, 'Should do final draw on rendering context and reset buffer context');
    expect.end();
  });

  expect.test('::update', (expect) => {
    before();
    const ctx = new RenderingContext2d();

    boundshape.draw = sinon.spy();

    boundshape.update(ctx, 100, 100);
    expect.ok(boundshape.draw.calledWith(ctx), 'Should call draw method of tool on provided context');
    expect.end();
  });

  expect.end();
});
