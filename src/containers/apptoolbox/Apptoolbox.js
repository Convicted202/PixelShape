import {connect} from 'react-redux';
import { ActionCreators } from 'redux-undo';

import Apptoolbox from '../../components/apptoolbox/Apptoolbox';

// const mapStateToProps = state => ({
//   guid: getProjectGuid(state)
// });

const mapDispatchToProps = dispatch => ({
  undo () {
    return dispatch(ActionCreators.undo());
  },
  redo () {
    return dispatch(ActionCreators.redo());
  }
});

const ApptoolboxContainer = connect(
  null,
  mapDispatchToProps
)(Apptoolbox);

export default ApptoolboxContainer;
