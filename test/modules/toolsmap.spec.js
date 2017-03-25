import test from 'blue-tape';
import toolsMap from '../../src/modules/toolsmap';

import Brush from '../../src/modules/brush/Brush';
import Bucket from '../../src/modules/bucket/Bucket';
import ColorReplace from '../../src/modules/colorreplace/ColorReplace';
import Eraser from '../../src/modules/eraser/Eraser';
import Dropper from '../../src/modules/dropper/Dropper';
import Rectangle from '../../src/modules/rectangle/Rectangle';
import Ellipse from '../../src/modules/ellipse/Ellipse';
import Lightener from '../../src/modules/lightener/Lightener';
import Darkener from '../../src/modules/darkener/Darkener';
import HorzMirrorBrush from '../../src/modules/horzmirrorbrush/HorzMirrorBrush';
import VertMirrorBrush from '../../src/modules/vertmirrorbrush/VertMirrorBrush';

test('toolsMap =>', (expect) => {
  expect.test('::entries', (expect) => {
    expect.ok(toolsMap.get('Brush') instanceof Brush, 'Should have Brush tool present');
    expect.ok(toolsMap.get('Bucket') instanceof Bucket, 'Should have Bucket tool present');
    expect.ok(toolsMap.get('ColorReplace') instanceof ColorReplace, 'Should have ColorReplace tool present');
    expect.ok(toolsMap.get('Eraser') instanceof Eraser, 'Should have Eraser tool present');
    expect.ok(toolsMap.get('Dropper') instanceof Dropper, 'Should have Dropper tool present');
    expect.ok(toolsMap.get('Rectangle') instanceof Rectangle, 'Should have Rectangle tool present');
    expect.ok(toolsMap.get('Ellipse') instanceof Ellipse, 'Should have Ellipse tool present');
    expect.ok(toolsMap.get('Lightener') instanceof Lightener, 'Should have Lightener tool present');
    expect.ok(toolsMap.get('Darkener') instanceof Darkener, 'Should have Darkener tool present');
    expect.ok(toolsMap.get('HorzMirrorBrush') instanceof HorzMirrorBrush, 'Should have HorzMirrorBrush tool present');
    expect.ok(toolsMap.get('VertMirrorBrush') instanceof VertMirrorBrush, 'Should have VertMirrorBrush tool present');
    expect.end();
  });

  expect.end();
});
