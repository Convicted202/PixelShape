import {connect} from 'react-redux';

import {getSidebarVisibility} from '../../selectors';

import Sidebar from '../../components/sidebar/Sidebar';

const mapStateToProps = state => ({
  visible: getSidebarVisibility(state)
});

const SidebarContainer = connect(
  mapStateToProps,
  null
)(Sidebar);

export default SidebarContainer;
