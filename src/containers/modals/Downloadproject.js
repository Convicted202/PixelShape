import { connect } from 'react-redux';

import {
  getGifFramesData,
  getFramesOrder,
  getAllFrames,
  getSpritesheetDownloadOption,
  getGifDownloadOption,
  getProjectDownloadOption,
  getPaletteDownloadOption
} from '../../selectors';

import {
  getStore,
  toggleIncludeGif,
  toggleIncludeSpritesheet,
  toggleIncludeProject,
  toggleIncludePalette
} from '../../actions/application';

import DownloadProjectModal from '../../components/modals/Downloadproject/Downloadproject';

const mapStateToProps = state => ({
  gifFramesData: getGifFramesData(state),
  framesOrder: getFramesOrder(state),
  framesCollection: getAllFrames(state),
  includeSpritesheet: getSpritesheetDownloadOption(state),
  includeGif: getGifDownloadOption(state),
  includeProject: getProjectDownloadOption(state),
  includePalette: getPaletteDownloadOption(state)
});

const mapDispatchToProps = dispatch => ({
  getProjectState () {
    return dispatch(getStore());
  },
  toggleIncludeGif () {
    return dispatch(toggleIncludeGif());
  },
  toggleIncludeSpritesheet () {
    return dispatch(toggleIncludeSpritesheet());
  },
  toggleIncludeProject () {
    return dispatch(toggleIncludeProject());
  },
  toggleIncludePalette () {
    return dispatch(toggleIncludePalette());
  }
});

const DownloadProjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadProjectModal);

export default DownloadProjectModalContainer;
