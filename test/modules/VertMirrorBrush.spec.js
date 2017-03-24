import test from 'blue-tape';
import VertMirrorBrush from '../../src/modules/vertmirrorbrush/VertMirrorBrush';
import MirrorBrush from '../../src/modules/mirrorbrush/MirrorBrush';

test('VertMirrorBrush =>', (expect) => {
  expect.test('::constructor', (expect) => {
    const vertMirrorBrush = new VertMirrorBrush();

    expect.ok(vertMirrorBrush instanceof MirrorBrush, 'Should use MirrorBrush as a base class');
    expect.true(vertMirrorBrush.shift.x, 'Should add mirrored relatively to y axis ghost pixel on x axis');
    expect.false(vertMirrorBrush.shift.y, 'Should not affect y position of a ghost pixel');
    expect.end();
  });

  expect.end();
});
