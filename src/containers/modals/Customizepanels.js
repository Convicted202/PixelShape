import { connect } from 'react-redux';

import {
  getToolbarVisibility,
  getSidebarVisibility,
  getFramebarVisibility
} from 'selectors';

import { toggleToolbar, toggleSidebar, toggleFramebar } from 'actions/panels';

import CustomizePanelsModal from 'components/modals/Customizepanels';

const mapStateToProps = state => ({
  toolbarVisible: getToolbarVisibility(state),
  sidebarVisible: getSidebarVisibility(state),
  framebarVisible: getFramebarVisibility(state)
});

const mapDispatchToProps = dispatch => ({
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

const CustomizePanelsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizePanelsModal);

export default CustomizePanelsModalContainer;
