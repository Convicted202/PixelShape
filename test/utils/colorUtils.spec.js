import test from 'blue-tape';

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
  darkenLightenColor,
  getContextColor,
  fillRectImageData,
  isLightColor,
  getBlackWhiteContrastColor,
  getImageDataActiveColors,
  getAllActiveColors
} from '../../src/utils/colorUtils';

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

  expect.test('::putColor', (expect) => {
    const iData = new ImageData(1, 1),
          color = [255, 255, 255, 255];

    putColor(iData, 0, color);
    expect.ok(iData.data.every(el => el === 255), 'Should color one pixel in the image data');
    expect.end();
  });

  expect.test('::getContextColor', (expect) => {
    const context = new RenderingContext2d(),
          color = getContextColor(context, 10, 10);

    expect.deepEqual(color, [0, 0, 0, 0], 'Should retrieve color from context');
    expect.end();
  });

  expect.test('::fillRectImageData', (expect) => {
    const iData = new ImageData(5, 5),
          color = [128, 128, 128, 128],
          index1 = getPixelFromImageData(iData, 1, 1),
          index2 = getPixelFromImageData(iData, 2, 1);

    fillRectImageData(iData, 1, 1, 2, 1, color);
    expect.deepEqual(getColor(iData, index1), color, 'Should call putColor on image data');
    expect.deepEqual(getColor(iData, index2), color, 'Should fill specified rect on image data');
    fillRectImageData(iData, 1, 1, 1, 1);
    expect.deepEqual(getColor(iData, index1), [0, 0, 0, 0], 'Should remove color on index if no color provided');
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

  expect.test('::isLightColor', (expect) => {
    const light = isLightColor([250, 150, 220, 255]),
          dark = isLightColor([10, 3, 14, 255]);

    expect.true(light, 'Should tell if color is light');
    expect.false(dark, 'Should tell if color is dark');
    expect.end();
  });

  expect.test('::getBlackWhiteContrastColor', (expect) => {
    const black = getBlackWhiteContrastColor([250, 150, 220, 255]),
          white = getBlackWhiteContrastColor([10, 3, 14, 255]);

    expect.equal(white, '#ffffff', 'Should return white for dark color provided');
    expect.equal(black, '#000000', 'Should return black for light color provided');
    expect.end();
  });

  expect.test('::getImageDataActiveColors', (expect) => {
    const iData = new ImageData(3, 3);
    let list;

    putColor(iData, 0, [255, 255, 255, 255]);
    putColor(iData, 4, [0, 0, 0, 255])

    list = getImageDataActiveColors(iData);

    expect.ok(list.includes('#000000') && list.includes('#ffffff'), 'Should create list of used colors present on the image data provided');
    expect.end();
  });

  expect.test('::getAllActiveColors', (expect) => {
    const iData1 = new ImageData(1, 1),
          iData2 = new ImageData(1, 1);
    let list;

    putColor(iData1, 0, [255, 255, 255, 255]);
    putColor(iData2, 0, [0, 0, 0, 255])

    list = [...getAllActiveColors([iData1, iData2])];

    expect.deepEqual(list, ['#000000', '#ffffff'], 'Should create list of used colors from all image data present in the project');
    expect.end();
  });

  expect.end();
});
