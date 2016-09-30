import './app.styl';

import React, { Component } from 'react';
import Toolbar from 'containers/toolbar/Toolbar';
import Surface from 'containers/surface/Surface';
import Sidebar from 'components/sidebar/Sidebar';
import Framebar from 'containers/framebar/Framebar';
import Apptoolbox from 'containers/apptoolbox/Apptoolbox';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <div className="app__content">
          <Apptoolbox />
          <Surface />
          <Framebar />
        </div>
        <Sidebar />
      </div>
    )
  }
}

export default App;
