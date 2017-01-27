import {connect} from 'react-redux';

import {setExpandAnchor} from 'actions/application';
import {getCurrentAnchor} from 'selectors';

import CanvasAnchors from 'components/canvasanchors/Canvasanchors';

const mapStateToProps = state => ({
  anchor: getCurrentAnchor(state)
});

const mapDispatchToProps = dispatch => ({
  setExpandAnchor (anchor) {
    return dispatch(setExpandAnchor(anchor));
  }
});

const CanvasAnchorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasAnchors);

export default CanvasAnchorsContainer;
