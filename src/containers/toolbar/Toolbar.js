import {connect} from 'react-redux';

import {setTool} from '../../actions/tools';
import {getTool} from 'selectors';

import Toolbar from 'components/toolbar/Toolbar';

const mapStateToProps = state => ({
  tool: getTool(state)
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
