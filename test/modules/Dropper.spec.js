import test from 'blue-tape';
import sinon from 'sinon';
import Dropper from 'modules/dropper/Dropper';
import RenderingContext2d from '../mocks/RenderingContext2d.mock';

let dropper;

const before = () => {
  dropper = new Dropper();
  dropper.storeCallback = sinon.spy();
  dropper._ctx = new RenderingContext2d();
  dropper._buffer = new RenderingContext2d();
};

test('Dropper =>', (expect) => {
  expect.test('::handleBufferBrushMove', (expect) => {
    before();

    dropper.useGhostStateOn = sinon.spy();
    dropper.clearPixelCell = sinon.spy();
    dropper.drawPixelCell = sinon.spy();

    dropper.handleBufferBrushMove(100, 100);
    expect.ok(
      dropper.useGhostStateOn.calledWith(dropper._buffer)
      && dropper.clearPixelCell.calledWith(dropper._buffer)
      && dropper.drawPixelCell.calledWith(dropper._buffer),
      'Should operate with buffer context only');
    expect.ok(
      dropper._buffer.save.called && dropper._buffer.restore.called, 'Should save and restore buffers state before and after drawing respectively');
    expect.end();
  });

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

    dropper.handleBufferBrushMove = sinon.spy();

    dropper.onMouseMove(100, 100);
    expect.ok(dropper.handleBufferBrushMove.called && !dropper.storeCallback.called, 'Should only handle ghost movement when mouseDown flag is set to false');

    dropper.mouseDown = true;
    dropper.onMouseMove(100, 100);
    expect.ok(dropper.storeCallback.called, 'Should process color with callback modifying store');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    dropper.handleBufferBrushMove = sinon.spy();

    dropper.onMouseUp(100, 100);
    expect.notOk(dropper.mouseDown, 'Should stop processing color on mouseUp');
    expect.ok(dropper.storeCallback.called, 'Should process color with callback modifying store');
    expect.end();
  });

  expect.end();
});
