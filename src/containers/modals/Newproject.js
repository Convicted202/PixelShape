import { connect } from 'react-redux';

import { getResetPaletteState, getImageSize } from '../../selectors';

import { toggleResetPalette, uploadStore } from '../../actions/application';
import { resetUserColors } from '../../actions/palette';
import { resetFramesState } from '../../actions/frames';

import NewProjectModal from '../../components/modals/Newproject/Newproject';

const mapStateToProps = state => ({
  resetPaletteOn: getResetPaletteState(state),
  imageSize: getImageSize(state)
});

const mapDispatchToProps = dispatch => ({
  toggleResetPalette () {
    return dispatch(toggleResetPalette());
  },
  resetUserColors () {
    return dispatch(resetUserColors());
  },
  resetFramesState (width, height) {
    return dispatch(resetFramesState(width, height));
  },
  uploadProject (data) {
    return dispatch(uploadStore(data));
  }
});

const NewProjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProjectModal);

export default NewProjectModalContainer;
