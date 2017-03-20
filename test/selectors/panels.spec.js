import test from 'blue-tape';
import sinon from 'sinon';

import {
  getToolbarVisibility,
  getSidebarVisibility,
  getFramebarVisibility
} from '../../src/selectors/panels';

const state = {
  panels: {
    toolbar: true,
    sidebar: true,
    framebar: true
  }
};

test('panels =>', (expect) => {
  expect.test('::getToolbarVisibility', (expect) => {
    const next = getToolbarVisibility(state);

    expect.true(next, 'Should return status of toolbar visibility');
    expect.end();
  });

  expect.test('::getSidebarVisibility', (expect) => {
    const next = getSidebarVisibility(state);

    expect.true(next, 'Should return status of sidebar visibility');
    expect.end();
  });

  expect.test('::getFramebarVisibility', (expect) => {
    const next = getFramebarVisibility(state);

    expect.true(next, 'Should return status of framebar visibility');
    expect.end();
  });

  expect.end();
});
