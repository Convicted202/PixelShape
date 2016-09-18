import {connect} from 'react-redux';

import {getTool, getToolSettings} from 'selectors';

import Surface from 'components/surface/Surface.js';

const mapStateToProps = state => ({
  tool: getTool(state),
  toolSettings: getToolSettings(state)
});

const SurfaceContainer = connect(
  mapStateToProps,
  null
)(Surface);

export default SurfaceContainer;
