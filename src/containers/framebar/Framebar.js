import {connect} from 'react-redux';

import {
  addFrame,
  removeFrame,
  setCurrentFrame,
  updateFrameIndex,
  updateFrameName,
  setFPS
} from 'actions/frames';

import {
  getCurrentFrameUUID,
  getAllFrames,
  getCurrentFrameName,
  getFPS
} from 'selectors';

import Framebar from 'components/framebar/Framebar';

const mapStateToProps = state => ({
  currentFrameUUID: getCurrentFrameUUID(state),
  currentFrameName: getCurrentFrameName(state),
  framesCollection: getAllFrames(state),
  fps: getFPS(state)
});

const mapDispatchToProps = dispatch => ({
  addFrame(frame) {
    return dispatch(addFrame(frame));
  },
  removeFrame(frameUUID) {
    return dispatch(removeFrame(frameUUID));
  },
  setCurrentFrame(frameUUID) {
    return dispatch(setCurrentFrame(frameUUID));
  },
  updateFrameIndex(frameUUID, index) {
    return dispatch(updateFrameIndex(frameUUID, index))
  },
  updateFrameName(frameUUID, name) {
    return dispatch(updateFrameName(frameUUID, name));
  },
  setFPS(fps) {
    return dispatch(setFPS(fps));
  }
})

const FramebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Framebar);

export default FramebarContainer;
