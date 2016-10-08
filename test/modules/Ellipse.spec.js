import test from 'blue-tape';
import sinon from 'sinon';
import Boundshape from 'modules/boundshape/Boundshape';
import Ellipse from 'modules/ellipse/Ellipse';
import ellipse from '../importStubs/ellipseCircle.stub';
import RenderingContext2d from '../mocks/RenderingContext2d.mock';

let circle;

const before = () => {
  circle = new Ellipse();
  circle._ctx = new RenderingContext2d();
};

test('Ellipse =>', (expect) => {
  expect.test('::constructor', (expect) => {
    before();

    expect.ok(circle instanceof Boundshape, 'Should extend Boundshape class functionality');
    expect.end();
  });

  expect.test('::draw', (expect) => {
    before();

    Boundshape.prototype.draw = sinon.spy();
    circle.drawPixelCell = sinon.spy();

    circle.draw(circle._ctx, 0, 0, 10, 10);
    expect.ok(Boundshape.prototype.draw.called, 'Should call super draw method');
    expect.ok(ellipse.called && circle.drawPixelCell.called, 'Should call ellipse on draw method with drawPixelCell as callback');
    expect.end();
  });

  expect.end();
});
