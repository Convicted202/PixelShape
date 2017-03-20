import test from 'blue-tape';
import sinon from 'sinon';

import {
  getCustomColors,
  getTempColor
} from '../../src/selectors/palette';

const state = {
  userPalette: {
    tempColor: '#fff',
    colors: ['#000000', '#efefef']
  }
};

test('palette =>', (expect) => {
  expect.test('::getCustomColors', (expect) => {
    const next = getCustomColors(state);

    expect.deepEqual(next, ['#000000', '#efefef'], 'Should return user defined colors');
    expect.end();
  });

  expect.test('::getTempColor', (expect) => {
    const next = getTempColor(state);

    expect.equal(next, '#fff', 'Should return current temprorary selected color');
    expect.end();
  });

  expect.end();
});
