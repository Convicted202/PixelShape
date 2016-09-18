import './sidebar.styl';

import React, { Component } from 'react';
import Colorbar from 'containers/colorbar/Colorbar';
import Sizerangebar from 'containers/sizerangebar/Sizerangebar';

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <Colorbar />
        <Sizerangebar />
      </aside>
    )
  }
}

export default Sidebar;
