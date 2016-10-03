import {connect} from 'react-redux';

import {
  removeFrame,
  moveFrameRight,
  moveFrameLeft,
  duplicateFrame,
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
  removeFrame(frameUUID) {
    return dispatch(removeFrame(frameUUID));
  },
  moveFrameRight(uuid) {
    return dispatch(moveFrameRight(uuid));
  },
  moveFrameLeft(uuid) {
    return dispatch(moveFrameLeft(uuid));
  },
  duplicateFrame(uuid) {
    return dispatch(duplicateFrame(uuid));
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
