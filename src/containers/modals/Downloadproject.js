import { connect } from 'react-redux';

import { getGifFramesData, getFramesOrder, getAllFrames } from '../../selectors';
import { downloadStore } from '../../actions/application';

import DownloadProjectModal from '../../components/modals/Downloadproject';

const mapStateToProps = state => ({
  gifFramesData: getGifFramesData(state),
  framesOrder: getFramesOrder(state),
  framesCollection: getAllFrames(state)
});

const mapDispatchToProps = dispatch => ({
  downloadProject (fileName) {
    return dispatch(downloadStore(fileName));
  }
});

const DownloadProjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadProjectModal);

export default DownloadProjectModalContainer;
