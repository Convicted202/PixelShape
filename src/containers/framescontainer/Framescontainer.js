import {connect} from 'react-redux';

import {
  getAllFrames,
  getCurrentFrameUUID,
  getFramesOrder,
  getFPS,
  getUnscaledSurfaceWidth,
  getUnscaledSurfaceHeight,
  getModifiedFramesArray,
  getGifFramesData,
  getImageSize
} from 'selectors';

import {
  addFrame,
  setCurrentFrame,
  updateFrameGIFData
} from 'actions/frames';

import Framescontainer from 'components/framescontainer/Framescontainer';

const mapStateToProps = state => ({
  currentUUID: getCurrentFrameUUID(state),
  modifiedFrames: getModifiedFramesArray(state),
  gifFramesData: getGifFramesData(state),
  framesCollection: getAllFrames(state),
  framesOrder: getFramesOrder(state),
  fps: getFPS(state),
  imageSize: getImageSize(state),
  surfaceHeight: getUnscaledSurfaceHeight(state),
  surfaceWidth: getUnscaledSurfaceWidth(state)
});

const mapDispatchToProps = dispatch => ({
  addFrame (frame) {
    return dispatch(addFrame(frame));
  },
  setCurrentFrame (frame) {
    return dispatch(setCurrentFrame(frame));
  },
  updateFrameGIFData (frameUUID, framesData) {
    return dispatch(updateFrameGIFData(frameUUID, framesData));
  }
});

const FramescontainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Framescontainer);

export default FramescontainerConnected;
