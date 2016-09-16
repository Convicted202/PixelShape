import './toolbar.styl';

import React, { Component } from 'react';
import ToolButton from 'components/toolbutton/ToolButton';

const icons = [
  'brush', 'colorfill', 'eraser', 'dropper',
  'rect', 'circle', 'gridon', 'selectcrop', 'sizing'
]

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: 0};
  }

  componentDidMount() {
    this.props.setTool('brush');
  }

  getButtons() {
    return icons
      .map((icon, keyValue) => (
        <ToolButton
          key={keyValue}
          icon={icon}
          isActive={this.state.selected === keyValue}
          setTool={this.props.setTool.bind(this, icon)}
          onClick={this.clickButton.bind(this, keyValue)} />
      ));
  }

  clickButton(id) {
    this.setState({selected: id});
  }

  render() {
    return (
      <aside className="toolbar">
        <ul className="toolbar__buttonlist">
          {this.getButtons()}
        </ul>
      </aside>
    )
  }
}

export default Toolbar;
