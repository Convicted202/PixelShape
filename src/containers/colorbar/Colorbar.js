import {connect} from 'react-redux';

import {getCustomColors} from 'selectors';
import {getUserColors, addColor} from 'actions/palette';

import Colorbar from 'components/colorbar/Colorbar.js';

const mapStateToProps = state => ({
  userColors: getCustomColors(state)
});

const mapDispatchToProps = dispatch => ({
  addColor(color) {
    return dispatch(addColor(color));
  }
})

const ColorbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Colorbar);

export default ColorbarContainer;
