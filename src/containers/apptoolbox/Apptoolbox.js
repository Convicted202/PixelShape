import {connect} from 'react-redux';

import {
  getGifFramesData,
  getToolbarVisibility,
  getSidebarVisibility,
  getFramebarVisibility,
  getImageSize,
  getFramesOrder
} from 'selectors';

import {setImageSize} from 'actions/application';
import {resetUserColors} from 'actions/palette';
import {resetFramesState} from 'actions/frames';
import {toggleToolbar, toggleSidebar, toggleFramebar} from 'actions/panels';

import Apptoolbox from 'components/apptoolbox/Apptoolbox';

const mapStateToProps = state => ({
  gifFramesData: getGifFramesData(state),
  framesOrder: getFramesOrder(state),
  toolbarVisible: getToolbarVisibility(state),
  sidebarVisible: getSidebarVisibility(state),
  framebarVisible: getFramebarVisibility(state),
  imageSize: getImageSize(state)
});

const mapDispatchToProps = dispatch => ({
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
  setImageSize (width, height) {
    return dispatch(setImageSize(width, height));
  }
});

const ApptoolboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apptoolbox);

export default ApptoolboxContainer;
