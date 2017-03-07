import {connect} from 'react-redux';
import { ActionCreators } from 'redux-undo';

import Apptoolbox from '../../components/apptoolbox/Apptoolbox';
import { canRedo, canUndo } from '../../selectors/timetravel';

const mapStateToProps = state => ({
  canRedo: canRedo(state),
  canUndo: canUndo(state)
});

const mapDispatchToProps = dispatch => ({
  undo () {
    return dispatch(ActionCreators.undo());
  },
  redo () {
    return dispatch(ActionCreators.redo());
  }
});

const ApptoolboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apptoolbox);

export default ApptoolboxContainer;
