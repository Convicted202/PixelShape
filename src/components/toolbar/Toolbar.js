import './toolbar.styl';

import React, { Component } from 'react';
import ToolButton from '../toolbutton/ToolButton';
import tools from '../../defaults/tools';

class Toolbar extends Component {
  constructor (props) {
    super(props);
  }

  getButtons () {
    return tools
      .map((toolObj, keyValue) => (
        <ToolButton
          key={keyValue}
          btnTooltip={toolObj.tool}
          icon={toolObj.icon}
          isActive={this.props.tool === toolObj.tool}
          setTool={this.props.setTool.bind(this, toolObj.tool)} />
      ));
  }

  render () {
    return (
      <aside className="toolbar" style={{display: this.props.visible ? 'block' : 'none'}}>
        <ul className="toolbar__buttonlist">
          {this.getButtons()}
        </ul>
      </aside>
    );
  }
}

export default Toolbar;
