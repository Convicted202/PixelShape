import test from 'blue-tape';
import sinon from 'sinon';
import ColorReplace from '../../src/modules/colorreplace/ColorReplace';

let colorreplace;

const before = () => {
  const rndrCtx = new RenderingContext2d(5, 5),
        bfrCtx = new RenderingContext2d(5, 5);

  colorreplace = new ColorReplace();
  colorreplace._buffer = bfrCtx;
  colorreplace._ctx = rndrCtx;
};

test('ColorReplace =>', (expect) => {
  expect.test('::onMouseDown', (expect) => {
    before();

    colorreplace.draw = sinon.spy();
    colorreplace.onMouseDown(1, 1);

    expect.ok(colorreplace.mouseDown, 'Should set mouseDown toggle to true');
    expect.ok(colorreplace.draw.called, 'Should do the drawing on mouseDown');
    expect.end();
  });

  expect.test('::onMouseMove', (expect) => {
    before();

    colorreplace.handleGhostPixelMove = sinon.spy();
    colorreplace.onMouseMove(1, 1);

    expect.equal(colorreplace.state.size, 1, 'Should set pixel size to minimum of 1');
    expect.ok(colorreplace.handleGhostPixelMove.called, 'Should do the drawing of ghost pixel on mouseMove');
    expect.false(colorreplace.mouseDown, 'Should unset mouseDown toggle to false');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    colorreplace.mouseDown = true;
    colorreplace.onMouseUp(1, 1);
    expect.false(colorreplace.mouseDown, 'Should unset mouseDown toggle to false');

    colorreplace.mouseDown = false;
    colorreplace.onMouseUp(1, 1);
    expect.false(colorreplace.mouseDown, 'Should not modify mouseDown toggle if previously set to false');
    expect.end();
  });

  expect.end();
});
