import {connect} from 'react-redux';

import {getCustomColors, getCurrentColor} from 'selectors';
import {getUserColors, addColor} from 'actions/palette';
import {setColor} from 'actions/tools';

import Colorbar from 'components/colorbar/Colorbar.js';

const mapStateToProps = state => ({
  userColors: getCustomColors(state),
  currentColor: getCurrentColor(state)
});

const mapDispatchToProps = dispatch => ({
  addColor(color) {
    return dispatch(addColor(color));
  },
  setColor(color) {
    return dispatch(setColor(color));
  }
})

const ColorbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Colorbar);

export default ColorbarContainer;
