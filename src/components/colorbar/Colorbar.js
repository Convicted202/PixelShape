import './colorbar.styl';

import React, { Component } from 'react';
import Coloritem from 'components/coloritem/Coloritem';
import Colorpicker from 'components/colorpicker/Colorpicker';

const colors = [
  '#641E16',
  '#943126',
  '#4A235A',
  '#154360',
  '#21618C',
  '#0E6251',
  '#145A32',
  '#7D6608',
  '#935116',
  '#7B7D7D',
  '#4D5656',
  '#1B2631'
]

class Colorbar extends Component {
  getDefaultColorPalette() {
    return colors
      .map((color, key) => (
        <Coloritem
          key={color}
          color={color}>
          {color}
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
        <Colorpicker />
      </div>
    )
  }
}

export default Colorbar;
