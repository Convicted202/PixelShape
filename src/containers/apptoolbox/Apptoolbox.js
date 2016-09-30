import {connect} from 'react-redux';

import {getGifFramesArray} from 'selectors';

import Apptoolbox from 'components/apptoolbox/Apptoolbox';

const mapStateToProps = state => ({
  gifFramesArray: getGifFramesArray(state)
});

const ApptoolboxContainer = connect(
  mapStateToProps,
  null
)(Apptoolbox);

export default ApptoolboxContainer;
