import './colorbar.styl';

import React, { Component } from 'react';
import Coloritem from 'components/coloritem/Coloritem';
import Colorpicker from 'components/colorpicker/Colorpicker';

import colors from 'defaults/palette';

class Colorbar extends Component {
  getDefaultColorPalette() {
    return colors
      .map(colorObj => (
        <Coloritem
          key={colorObj.color}
          color={colorObj.color}
          isActive={colorObj.color === this.props.currentColor}
          setColor={this.props.setColor.bind(this)}>
          {colorObj.color}
        </Coloritem>
      ));
  }

  getUserColorPalette() {
    return this.props.userColors
      .map(colorObj => (
        <Coloritem
          key={colorObj.color}
          color={colorObj.color}
          isActive={colorObj.color === this.props.currentColor}
          setColor={this.props.setColor.bind(this)}>
          {colorObj.color}
        </Coloritem>
      ));
  }

  render() {
    return (
      <div className="colorbar">
        <div className="colorbar__default-palette">
          <div className="colorbar__label">Palette</div>
          {this.getDefaultColorPalette()}
        </div>
        <Colorpicker
          addColor={this.props.addColor.bind(this)}
          userColors={this.props.userColors} />
        <div className="colorbar__user-palette">
          <div className="colorbar__label">Custom</div>
          {this.getUserColorPalette()}
        </div>
      </div>
    )
  }
}

export default Colorbar;
