import sinon from 'sinon';
import * as ellipseOriginal from '../../src/utils/ellipseCircle';

const ellipse = sinon.stub(ellipseOriginal, 'ellipse', cb => cb());

export default ellipse;
