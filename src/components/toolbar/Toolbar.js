import './toolbar.styl';

import React, { Component } from 'react';
import ToolButton from 'components/toolbutton/ToolButton';

// TODO: move these to defaults file
const icons = [
  'brush', 'colorfill', 'eraser', 'dropper',
  'rect', 'circle', 'lightener', 'selectcrop'
  // , 'sizing'
];

class Toolbar extends Component {
  constructor (props) {
    super(props);
    // this.state = {selected: 0};
  }

  componentDidMount () {
    this.props.setTool('brush');
    // console.log(this.props.tool);
  }

  getButtons () {
    return icons
      .map((icon, keyValue) => (
        <ToolButton
          key={keyValue}
          btnTooltip={icon}
          icon={icon}
          isActive={this.props.tool === icon}
          setTool={this.props.setTool.bind(this, icon)} />
      ));
  }

  render () {
    return (
      <aside className="toolbar">
        <ul className="toolbar__buttonlist">
          {this.getButtons()}
        </ul>
      </aside>
    );
  }
}

export default Toolbar;
