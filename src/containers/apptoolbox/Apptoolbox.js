import {connect} from 'react-redux';

import {
  getGifFramesData,
  getToolbarVisibility,
  getSidebarVisibility,
  getFramebarVisibility,
  getImageSize,
  getFramesOrder,
  getGridState,
  getStretchState
} from 'selectors';

import {processSizeChange, toggleGrid, toggleStretch} from 'actions/application';
import {resetUserColors} from 'actions/palette';
import {resetFramesState} from 'actions/frames';
import {toggleToolbar, toggleSidebar, toggleFramebar} from 'actions/panels';

import Apptoolbox from 'components/apptoolbox/Apptoolbox';

const mapStateToProps = state => ({
  gridShown: getGridState(state),
  stretchOn: getStretchState(state),
  gifFramesData: getGifFramesData(state),
  framesOrder: getFramesOrder(state),
  toolbarVisible: getToolbarVisibility(state),
  sidebarVisible: getSidebarVisibility(state),
  framebarVisible: getFramebarVisibility(state),
  imageSize: getImageSize(state)
});

const mapDispatchToProps = dispatch => ({
  toggleGrid () {
    return dispatch(toggleGrid());
  },
  toggleStretch () {
    return dispatch(toggleStretch());
  },
  resetUserColors () {
    return dispatch(resetUserColors());
  },
  resetFramesState () {
    return dispatch(resetFramesState());
  },
  toggleFramebar () {
    return dispatch(toggleFramebar());
  },
  toggleSidebar () {
    return dispatch(toggleSidebar());
  },
  toggleToolbar () {
    return dispatch(toggleToolbar());
  },
  setImageSize (width, height, stretch) {
    return dispatch(processSizeChange(+width, +height, stretch));
  }
});

const ApptoolboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apptoolbox);

export default ApptoolboxContainer;
