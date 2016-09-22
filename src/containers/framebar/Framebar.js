import {connect} from 'react-redux';

import {
  removeFrame,
  setCurrentFrame,
  updateFrameIndex
} from 'actions/frames';

import {
  getCurrentFrameUUID,
  getAllFrames
} from 'selectors';

import Framebar from 'components/framebar/Framebar';

const mapStateToProps = state => ({
  currentFrameUUID: getCurrentFrameUUID(state),
  framesCollection: getAllFrames(state)
});

const mapDispatchToProps = dispatch => ({
  removeFrame(frameUUID) {
    return dispatch(removeFrame(frameUUID));
  },
  setCurrentFrame(frameUUID) {
    return dispatch(setCurrentFrame(frameUUID));
  },
  updateFrameIndex(frameUUID, index) {
    return dispatch(updateFrameIndex(frameUUID, index))
  }
})

const FramebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Framebar);

export default FramebarContainer;
