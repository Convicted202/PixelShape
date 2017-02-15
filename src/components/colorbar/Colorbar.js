import './colorbar.styl';

import React, { Component } from 'react';
import Coloritem from '../coloritem/Coloritem';
import Colorpicker from '../colorpicker/Colorpicker';

import colors from '../../defaults/palette';

class Colorbar extends Component {
  getPalette (colors) {
    return colors
      .map(colorObj => (
        <Coloritem
          key={colorObj.color}
          color={colorObj.color}
          isActive={colorObj.color === this.props.currentColor}
          setColor={this.props.setColor.bind(this, colorObj.color)}>
          {colorObj.color}
        </Coloritem>
      ));
  }

  getDefaultColorPalette () {
    return this.getPalette(colors);
  }

  getUserColorPalette () {
    return (
      <div className="colorbar__user-palette-wrapper">
        {this.getPalette(this.props.userColors)}
      </div>
    );
  }

  render () {
    return (
      <div className="colorbar">
        <div className="colorbar__default-palette">
          <div className="colorbar__label">Palette</div>
          {this.getDefaultColorPalette()}
        </div>
        <Colorpicker
          addColor={this.props.addColor.bind(this)}
          userColors={this.props.userColors}
          tempColor={this.props.tempColor} />
        <div className="colorbar__user-palette">
          <div className="colorbar__label">Custom</div>
          {this.getUserColorPalette()}
        </div>
      </div>
    );
  }
}

export default Colorbar;
