import './sidebar.styl';

import React, { Component } from 'react';
import Colorbar from 'components/colorbar/Colorbar';

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <Colorbar />
      </aside>
    )
  }
}

export default Sidebar;
