import { connect } from 'react-redux';

import {
  getImageSize,
  getGridState,
  getStretchState
} from '../../selectors';

import { processSizeChange, toggleGrid, toggleStretch } from '../../actions/application';

import SettingsModal from '../../components/modals/Settings/Settings';

const mapStateToProps = state => ({
  gridShown: getGridState(state),
  stretchOn: getStretchState(state),
  imageSize: getImageSize(state)
});

const mapDispatchToProps = dispatch => ({
  toggleGrid () {
    return dispatch(toggleGrid());
  },
  toggleStretch () {
    return dispatch(toggleStretch());
  },
  setImageSize (width, height, stretch) {
    return dispatch(processSizeChange(+width, +height, stretch));
  }
});

const SettingsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal);

export default SettingsModalContainer;
