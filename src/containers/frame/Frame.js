import {connect} from 'react-redux';

import {updateFrameImageData} from 'actions/frames';

import Frame from 'components/frame/Frame';

const mapDispatchToProps = dispatch => ({
  updateFrameImageData (frameUUID, imageData) {
    return dispatch(updateFrameImageData(frameUUID, imageData));
  }
});

const FrameContainer = connect(
  null,
  mapDispatchToProps
)(Frame);

export default FrameContainer;
