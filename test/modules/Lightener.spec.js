import test from 'blue-tape';
import Lightener from '../../src/modules/lightener/Lightener';
import ColorAdjust from '../../src/modules/coloradjust/ColorAdjust';

test('Lightener =>', (expect) => {
  expect.test('::constructor', (expect) => {
    const lightener = new Lightener();

    expect.ok(lightener instanceof ColorAdjust, 'Should use ColorAdjust as a base class');
    expect.equal(lightener.shadingPercentage, 0.01, 'Should shade up 1% of original color');
    expect.end();
  });

  expect.end();
});
