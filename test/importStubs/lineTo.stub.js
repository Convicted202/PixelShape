import sinon from 'sinon';
import * as lineToOriginal from 'utils/lineTo';

const lineTo = sinon.stub(lineToOriginal, 'default', cb => cb());

export default lineTo;
