import test from 'blue-tape';
import HorzMirrorBrush from '../../src/modules/horzmirrorbrush/HorzMirrorBrush';
import MirrorBrush from '../../src/modules/mirrorbrush/MirrorBrush';

test('HorzMirrorBrush =>', (expect) => {
  expect.test('::constructor', (expect) => {
    const horzMirrorBrush = new HorzMirrorBrush();

    expect.ok(horzMirrorBrush instanceof MirrorBrush, 'Should use MirrorBrush as a base class');
    expect.true(horzMirrorBrush.shift.y, 'Should add mirrored relatively to x axis ghost pixel on y axis');
    expect.false(horzMirrorBrush.shift.x, 'Should not affect x position of a ghost pixel');
    expect.end();
  });

  expect.end();
});
