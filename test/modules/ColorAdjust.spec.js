import test from 'blue-tape';
import sinon from 'sinon';
import ColorAdjust from '../../src/modules/coloradjust/ColorAdjust';
import { getContextColor } from '../../src/utils/colorUtils';

getContextColor

let coloradjust;

const before = () => {
  const rndrCtx = new RenderingContext2d(),
        bfrCtx = new RenderingContext2d();

  coloradjust = new ColorAdjust();
  coloradjust._buffer = bfrCtx;
  coloradjust._ctx = rndrCtx;
};

test('ColorAdjust =>', (expect) => {
  expect.test('::onMouseDown', (expect) => {
    before();

    coloradjust.draw = sinon.spy();

    coloradjust.onMouseDown(100, 100);
    expect.ok(coloradjust.mouseDown, 'Should set mouseDown flag to true');
    expect.ok(coloradjust.draw.calledWith(coloradjust._ctx), 'Should do actual drawing on rendering context only');
    expect.end();
  });

  expect.test('::onMouseMove', (expect) => {
    before();

    coloradjust.handleGhostPixelMove = sinon.spy();
    coloradjust.draw = sinon.spy();

    coloradjust.mouseDown = false;
    coloradjust.onMouseMove(100, 100);
    expect.ok(coloradjust.handleGhostPixelMove.called, 'Should draw ghost on buffer whenever mouse moves');
    expect.notOk(coloradjust.draw.called, 'Should not start drawing on rendering context if mouseDown flag is not truthy');

    coloradjust.mouseDown = true;
    coloradjust.onMouseMove(100, 100);
    expect.ok(coloradjust.draw.calledWith(coloradjust._ctx), 'Should draw on rendering context if mouseDown flag is truthy');
    expect.end();
  });

  expect.test('::onMouseUp', (expect) => {
    before();

    coloradjust.mouseDown = true;
    coloradjust.onMouseUp(100, 100);
    expect.notOk(coloradjust.mouseDown, 'Should set mouseDown flag to false');
    expect.end();
  });

  expect.test('::getShadedColor', (expect) => {
    before();

    let retVal = coloradjust.getShadedColor(coloradjust._ctx, 100, 100);
    expect.false(retVal, 'Should not lighten or darken if color is transparent');
    coloradjust.applyState({ transparent: [0, 0, 0, 255] });
    retVal = coloradjust.getShadedColor(coloradjust._ctx, 100, 100, 0.1);
    expect.true(retVal, 'Should lighten or darken context color');
    expect.end();
  });

  expect.test('::saveState', (expect) => {
    before();

    coloradjust.saveState(coloradjust._ctx);
    expect.ok(coloradjust._ctx.save.called, 'Should save current state');
    expect.equal(coloradjust.state.size, 1, 'Should reset state size to minimum');
    expect.end();
  });

  expect.test('::restoreState', (expect) => {
    before();

    coloradjust.restoreState(coloradjust._ctx, 2, '#fff');
    expect.ok(coloradjust._ctx.restore.called, 'Should restore current state');
    expect.equal(coloradjust.state.size, 2, 'Should set state size to what was provided');
    expect.equal(coloradjust.state.color, '#fff', 'Should set state color to what was provided');
    expect.end();
  });

  expect.test('::adjustPixelGroup', (expect) => {
    before();

    coloradjust.saveState = sinon.spy();
    coloradjust.restoreState = sinon.spy();
    coloradjust.getShadedColor = sinon.spy();

    coloradjust.adjustPixelGroup(coloradjust._ctx, 10, 10, 2, '#efefef');
    expect.ok(coloradjust.saveState.calledWith(coloradjust._ctx), 'Should save state before adjusting');
    expect.ok(coloradjust.restoreState.calledWith(coloradjust._ctx), 'Should restore state after adjusting');
    expect.equal(coloradjust.getShadedColor.callCount, 4, 'Should shade color for all pixels in square of 2x2');

    coloradjust.getShadedColor = () => '#efefef';
    coloradjust.drawPixelCell = sinon.spy();
    coloradjust.adjustPixelGroup(coloradjust._ctx, 10, 10, 2, '#efefef');
    expect.ok(coloradjust.drawPixelCell.calledWith(coloradjust._ctx), 'Should draw pixel on canvas after calculating shading color')
    expect.end();
  });

  expect.test('::draw', (expect) => {
    before();

    coloradjust.adjustPixelGroup = sinon.spy();

    coloradjust.draw(coloradjust._ctx, 10, 10);
    expect.ok(coloradjust.adjustPixelGroup.called, 'Should adjust all pixel in group when draw is called');
    expect.end();
  });

  expect.end();
});
