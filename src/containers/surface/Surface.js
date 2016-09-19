import {connect} from 'react-redux';

import {getTool, getToolSettings} from 'selectors';
import {setTempColor} from 'actions/palette';

import Surface from 'components/surface/Surface.js';

const mapStateToProps = state => ({
  tool: getTool(state),
  toolSettings: getToolSettings(state)
});

const mapDispatchToProps = dispatch => ({
  setTempColor(color) {
    return dispatch(setTempColor(color));
  }
})

const SurfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Surface);

export default SurfaceContainer;
