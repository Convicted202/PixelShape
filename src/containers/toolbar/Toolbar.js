import {connect} from 'react-redux';

import {setTool} from '../../actions/tools';
import {getTool, getToolbarVisibility} from 'selectors';

import Toolbar from 'components/toolbar/Toolbar';

const mapStateToProps = state => ({
  tool: getTool(state),
  visible: getToolbarVisibility(state)
});

const mapDispatchToProps = dispatch => ({
  setTool (tool) {
    return dispatch(setTool(tool));
  }
});

const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;
