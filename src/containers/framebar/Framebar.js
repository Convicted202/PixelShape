import {connect} from 'react-redux';

import {
  addFrame,
  removeFrame,
  setCurrentFrame,
  updateFrameIndex,
  updateFrameName
} from 'actions/frames';

import {
  getCurrentFrameUUID,
  getAllFrames,
  getCurrentFrameName
} from 'selectors';

import Framebar from 'components/framebar/Framebar';

const mapStateToProps = state => ({
  currentFrameUUID: getCurrentFrameUUID(state),
  currentFrameName: getCurrentFrameName(state),
  framesCollection: getAllFrames(state)
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
  }
})

const FramebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Framebar);

export default FramebarContainer;
