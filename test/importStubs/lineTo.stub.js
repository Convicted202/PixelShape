import sinon from 'sinon';
import * as lineToOriginal from '../../src/utils/lineTo';

const lineTo = sinon.stub(lineToOriginal, 'default', cb => cb());

export default lineTo;
