import {connect} from 'react-redux';

import {getToolSettings} from '../../selectors';
import {setSize} from '../../actions/tools';

import Sizerangebar from '../../components/sizerangebar/Sizerangebar';

const mapStateToProps = state => ({
  currentSize: getToolSettings(state).size
});

const mapDispatchToProps = dispatch => ({
  setSize (size) {
    return dispatch(setSize(size));
  }
});

const SizerangebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sizerangebar);

export default SizerangebarContainer;
