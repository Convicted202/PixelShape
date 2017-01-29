import { connect } from 'react-redux';

import { getGifFramesData, getFramesOrder } from 'selectors';

import DownloadProjectModal from 'components/modals/Downloadproject';

const mapStateToProps = state => ({
  gifFramesData: getGifFramesData(state),
  framesOrder: getFramesOrder(state)
});

const DownloadProjectModalContainer = connect(
  mapStateToProps,
  null
)(DownloadProjectModal);

export default DownloadProjectModalContainer;
