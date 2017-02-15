import { connect } from 'react-redux';

import { getGifFramesData, getFramesOrder } from '../../selectors';
import { downloadStore } from '../../actions/application';

import DownloadProjectModal from '../../components/modals/Downloadproject';

const mapStateToProps = state => ({
  gifFramesData: getGifFramesData(state),
  framesOrder: getFramesOrder(state)
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
