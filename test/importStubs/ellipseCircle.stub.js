import sinon from 'sinon';
import * as ellipseOriginal from 'utils/ellipseCircle';

const ellipse = sinon.stub(ellipseOriginal, 'ellipse', cb => cb());

export default ellipse;
