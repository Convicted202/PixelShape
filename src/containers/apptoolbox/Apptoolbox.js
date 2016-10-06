import {connect} from 'react-redux';

import {getGifFramesArray} from 'selectors';

import {resetFramesState, addFrame} from 'actions/frames';

import Apptoolbox from 'components/apptoolbox/Apptoolbox';

const mapStateToProps = state => ({
  gifFramesArray: getGifFramesArray(state)
});

const mapDispatchToProps = dispatch => ({
  resetFramesState () {
    return dispatch(resetFramesState());
  },
  addFrame () {
    return dispatch(addFrame());
  }
});

const ApptoolboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apptoolbox);

export default ApptoolboxContainer;
