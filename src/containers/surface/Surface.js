import {connect} from 'react-redux';

import {
  getTool,
  getToolSettings,
  getCurrentFrameUUID,
  getCurrentFrame
} from 'selectors';
import {setTempColor} from 'actions/palette';
import {updateFrameImageData} from 'actions/frames';

import Surface from 'components/surface/Surface';

const mapStateToProps = state => ({
  tool: getTool(state),
  toolSettings: getToolSettings(state),
  currentFrameUUID: getCurrentFrameUUID(state),
  currentFrame: getCurrentFrame(state)
});

const mapDispatchToProps = dispatch => ({
  setTempColor(color) {
    return dispatch(setTempColor(color));
  },
  updateFrameImageData(frameUUID, imageData) {
    return dispatch(updateFrameImageData(frameUUID, imageData));
  }
})

const SurfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Surface);

export default SurfaceContainer;
