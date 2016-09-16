import {connect} from 'react-redux';

import {getTool} from 'selectors';

import Surface from 'components/surface/Surface.js';

const mapStateToProps = state => ({
  tool: getTool(state)
});

const SurfaceContainer = connect(
  mapStateToProps,
  null
)(Surface);

export default SurfaceContainer;
