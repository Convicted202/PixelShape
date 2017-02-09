import test from 'blue-tape';
import RenderingContext2d from '../mocks/RenderingContext2d.mock';
import {
  RGBA,
  stringToHex,
  rgbToHex,
  hexToRGBA,
  getPixelFromImageData,
  putColor,
  getColor,
  equallyColored,
  colorsEqual,
  darkenLightenColor
} from 'utils/colorUtils';

test('Color Utils =>', (expect) => {
  expect.test('::stringToHex', (expect) => {
    const colorInt = stringToHex('#ffffff');

    expect.equal(colorInt, 16777215, 'Should convert hex color string to color int')
    expect.end();
  });

  expect.test('::rgbToHex', (expect) => {
    const hexColor = rgbToHex(255, 255, 255);

    expect.equal(hexColor, '#ffffff', 'Should convert rgb color to hex color')
    expect.end();
  });

  expect.test('::hexToRGBA', (expect) => {
    const hexColor = hexToRGBA(0xffffff);

    expect.deepEqual(hexColor, [255, 255, 255, 255], 'Should convert hex color to rgba color')
    expect.end();
  });

  expect.test('::darkenLightenColor', (expect) => {
    const hex1 = darkenLightenColor([128, 128, 128], 0.5),
          hex2 = darkenLightenColor([128, 128, 128], -0.5);

    expect.equal(hex1, '#c0c0c0', 'Should lighten color by half');
    expect.equal(hex2, '#404040', 'Should darken color by half');
    expect.end();
  });

  expect.test('::getPixelFromImageData', (expect) => {
    const context1 = new RenderingContext2d(),
          pixelIndex = getPixelFromImageData(context1.getImageData(0, 0, 100, 100), 20, 20);

    expect.equal(pixelIndex, 8080, 'Should convert hex color to rgba color')
    expect.end();
  });

  expect.test('::equallyColored', (expect) => {
    const context2 = new RenderingContext2d(),
          imageData = context2.getImageData(0, 0, 100, 100);

    let areEquallyColored = equallyColored(imageData, -1, [0, 0, 0, 0]);
    expect.notOk(areEquallyColored, 'Should return if pixelIndex is out of image data bounds');
    areEquallyColored = equallyColored(imageData, 16, [0, 0, 0, 0]);
    expect.ok(areEquallyColored, 'Should tell if pixel with index provided is of color as provided');
    expect.end();
  });

  expect.test('::colorsEqual', (expect) => {
    const areEqual = colorsEqual([125, 125, 125, 255], [125, 125, 125, 255]);

    expect.ok(areEqual, 'Should tell if two colors are equal');
    expect.end();
  });

  expect.end();
});
