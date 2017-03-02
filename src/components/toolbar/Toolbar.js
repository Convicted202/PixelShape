import './toolbar.styl';

import React, { Component } from 'react';
import DropToolButton from '../droptoolbutton/Droptoolbutton';
import tools from '../../defaults/tools';

class Toolbar extends Component {
  constructor (props) {
    super(props);
  }

  getButtons () {
    return tools
      .map((toolObj, keyValue) => (
        <DropToolButton
          key={keyValue}
          name={toolObj.name}
          tool={toolObj.tool}
          icon={toolObj.icon}
          activeTool={this.props.tool}
          setTool={this.props.setTool.bind(this)}
          dropdownTools={toolObj.list} />
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
