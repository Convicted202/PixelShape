import test from 'blue-tape';
import sinon from 'sinon';
import Dropper from '../../src/modules/dropper/Dropper';

let dropper;

const before = () => {
  dropper = new Dropper();
  dropper.storeCallback = sinon.spy();
  dropper._ctx = new RenderingContext2d();
  dropper._buffer = new RenderingContext2d();
};

test('Dropper =>', (expect) => {
  expect.skip('::getUnderlyingColor', (expect) => {
    before();

    const color = getUnderlyingColor(0, 0);
    expect.equal(color, '#000000', 'Should get color in hex format from context with coords [x, y]');
    expect.end();
  });

  expect.test('::onMouseDown', (expect) => {
    before();

    dropper.getUnderlyingColor = sinon.spy();

    dropper.onMouseDown(100, 100);
    expect.ok(dropper.mouseDown, 'Should set mouseDown flag to true');
    expect.ok(dropper.storeCallback.called, 'Should process color with callback modifying store');
    expect.end();
  });

  expect.test('::onMouseMove', (expect) => {
    before();

    dropper.mouseDown = true;
    dropper.onMouseMove(100, 100);
    expect.ok(dropper.storeCallback.called, 'Should process color with callback modifying store');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    dropper.handleBufferBrushMove = sinon.spy();
    dropper.mouseDown = true;
    dropper.onMouseUp(100, 100);
    expect.notOk(dropper.mouseDown, 'Should stop processing color on mouseUp');
    expect.ok(dropper.storeCallback.called, 'Should process color with callback modifying store');
    expect.end();
  });

  expect.end();
});
