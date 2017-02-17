import test from 'blue-tape';
import sinon from 'sinon';
import Boundshape from '../../src/modules/boundshape/Boundshape';
import Rectangle from '../../src/modules/rectangle/Rectangle';
import RenderingContext2d from '../mocks/RenderingContext2d.mock';

let rectangle;

const before = () => {
  rectangle = new Rectangle();
  rectangle._ctx = new RenderingContext2d();
};

test('Rectangle =>', (expect) => {
  expect.test('::constructor', (expect) => {
    before();

    expect.ok(rectangle instanceof Boundshape, 'Should extend Boundshape class functionality');
    expect.end();
  });

  expect.test('::shiftByHalfSize', (expect) => {
    before();
    let coords;

    rectangle.state.size = 20;
    coords = rectangle.shiftByHalfSize(100, 100);
    expect.deepEqual(coords, { x: 110, y: 110 }, 'Should shift coords by half size set on tool state');
    expect.end();
  });

  expect.test('::draw', (expect) => {
    before();

    Boundshape.prototype.draw = sinon.spy();

    rectangle.draw(rectangle._ctx, 0, 0, 10, 10);
    expect.ok(Boundshape.prototype.draw.called, 'Should call super draw method');
    // expect.ok(rectangle._ctx.strokeRect.called, 'Should draw rect on rendering context');
    expect.end();
  });

  expect.end();
});
