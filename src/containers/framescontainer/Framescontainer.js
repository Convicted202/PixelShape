import {connect} from 'react-redux';

import {
  getCurrentFrame,
  getAllFrames,
  getCurrentFrameUUID
} from 'selectors';
import {
  addFrame,
  setCurrentFrame,
  updateFrame
} from 'actions/frames';

import Framescontainer from 'components/framescontainer/Framescontainer';

const mapStateToProps = state => ({
  currentUUID: getCurrentFrameUUID(state),
  currentFrame: getCurrentFrame(state),
  framesCollection: getAllFrames(state)
});

const mapDispatchToProps = dispatch => ({
  addFrame(frame) {
    return dispatch(addFrame(frame));
  },
  setCurrentFrame(frame) {
    return dispatch(setCurrentFrame(frame));
  }
})

const FramescontainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Framescontainer);

export default FramescontainerConnected;
