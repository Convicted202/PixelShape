import './sidebar.styl';

import React, { Component } from 'react';
import Colorbar from 'containers/colorbar/Colorbar';
import Sizerangebar from 'containers/sizerangebar/Sizerangebar';

class Sidebar extends Component {
  render () {
    return (
      <aside className="sidebar" style={{display: this.props.visible ? 'block' : 'none'}}>
        <Colorbar />
        <Sizerangebar />

        <div className="sidebar__about">
          <div>
            <strong>
              <a href="https://github.com/Convicted202/PixelShape">PixelShape</a>
            </strong> v0.0.1
          </div>
          <div>Created by <strong>Alexander Yanovych</strong></div>
          <div><strong>alexander.yanovych@gmail.com</strong></div>
        </div>

      </aside>
    );
  }
}

export default Sidebar;
