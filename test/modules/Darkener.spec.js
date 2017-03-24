import test from 'blue-tape';
import Darkener from '../../src/modules/darkener/Darkener';
import ColorAdjust from '../../src/modules/coloradjust/ColorAdjust';

test('Darkener =>', (expect) => {
  expect.test('::constructor', (expect) => {
    const darkener = new Darkener();

    expect.ok(darkener instanceof ColorAdjust, 'Should use ColorAdjust as a base class');
    expect.equal(darkener.shadingPercentage, -0.01, 'Should shade down 1% of original color');
    expect.end();
  });

  expect.end();
});
