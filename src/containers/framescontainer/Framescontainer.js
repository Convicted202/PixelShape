import {connect} from 'react-redux';

import {
  getCurrentFrame,
  getAllFrames,
  getCurrentFrameUUID,
  getFramesOrder,
  getFPS
} from 'selectors';

import {
  addFrame,
  setCurrentFrame,
  updateGifFramesArray
} from 'actions/frames';

import Framescontainer from 'components/framescontainer/Framescontainer';

const mapStateToProps = state => ({
  currentUUID: getCurrentFrameUUID(state),
  currentFrame: getCurrentFrame(state),
  framesCollection: getAllFrames(state),
  framesOrder: getFramesOrder(state),
  fps: getFPS(state)
});

const mapDispatchToProps = dispatch => ({
  addFrame (frame) {
    return dispatch(addFrame(frame));
  },
  setCurrentFrame (frame) {
    return dispatch(setCurrentFrame(frame));
  },
  updateGifFramesArray (framesDataArray) {
    return dispatch(updateGifFramesArray(framesDataArray));
  }
});

const FramescontainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Framescontainer);

export default FramescontainerConnected;
