import {connect} from 'react-redux';

import { setSurfaceConstraints } from 'actions/application';
import { getProjectGuid } from 'selectors';

import App from 'components/app/App';

const mapStateToProps = state => ({
  guid: getProjectGuid(state)
});

const mapDispatchToProps = dispatch => ({
  setSurfaceConstraints (width, height) {
    return dispatch(setSurfaceConstraints(width, height));
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
