import {connect} from 'react-redux';

import {setTool} from '../../actions/tools';

import Toolbar from 'components/toolbar/Toolbar.js';

const mapDispatchToProps = dispatch => ({
  setTool(tool) {
    return dispatch(setTool(tool));
  }
});

const ToolbarContainer = connect(
  null,
  mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;
