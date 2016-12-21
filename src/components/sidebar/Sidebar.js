import './sidebar.styl';

import React from 'react';
import Colorbar from 'containers/colorbar/Colorbar';
import Sizerangebar from 'containers/sizerangebar/Sizerangebar';
import About from 'components/about/About';

const Sidebar = props => (
  <aside className="sidebar" style={{display: props.visible ? 'block' : 'none'}}>
    <Colorbar />
    <Sizerangebar />
    <About />
  </aside>
);

export default Sidebar;
