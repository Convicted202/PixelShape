import {connect} from 'react-redux';

import {
  getGifFramesArray,
  getToolbarVisibility,
  getSidebarVisibility,
  getFramebarVisibility
} from 'selectors';

import {resetFramesState, addFrame} from 'actions/frames';
import {toggleToolbar, toggleSidebar, toggleFramebar} from 'actions/panels';

import Apptoolbox from 'components/apptoolbox/Apptoolbox';

const mapStateToProps = state => ({
  gifFramesArray: getGifFramesArray(state),
  toolbarVisible: getToolbarVisibility(state),
  sidebarVisible: getSidebarVisibility(state),
  framebarVisible: getFramebarVisibility(state)
});

const mapDispatchToProps = dispatch => ({
  resetFramesState () {
    return dispatch(resetFramesState());
  },
  addFrame () {
    return dispatch(addFrame());
  },
  toggleFramebar () {
    return dispatch(toggleFramebar());
  },
  toggleSidebar () {
    return dispatch(toggleSidebar());
  },
  toggleToolbar () {
    return dispatch(toggleToolbar());
  }
});

const ApptoolboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apptoolbox);

export default ApptoolboxContainer;
