import {connect} from 'react-redux';

import {setSurfaceConstraints} from 'actions/application';

import App from 'components/app/App';

const mapDispatchToProps = dispatch => ({
  setSurfaceConstraints (width, height) {
    return dispatch(setSurfaceConstraints(width, height));
  }
});

const AppContainer = connect(
  null,
  mapDispatchToProps
)(App);

export default AppContainer;
