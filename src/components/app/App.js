import './app.styl';

import React, { Component } from 'react';
import Toolbar from 'containers/toolbar/Toolbar';
import Surface from 'containers/surface/Surface';
import Sidebar from 'containers/sidebar/Sidebar';
import Framebar from 'containers/framebar/Framebar';
import Apptoolbox from 'containers/apptoolbox/Apptoolbox';

import debounce from 'utils/debounce';

class App extends Component {
  constructor (...args) {
    super(...args);
    this.applyConstraintsDebounced = debounce(this.applyConstraints.bind(this), 50);
  }

  applyConstraints () {
    this.props.setSurfaceConstraints(window.document.body.clientWidth, window.document.body.clientHeight);
  }

  componentDidMount () {
    this.applyConstraints();
    window.addEventListener('resize', () => {
      this.applyConstraintsDebounced();
    });
  }

  componentWillUnmount () {
    window.removeEventListener('resize');
  }

  render () {
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
    );
  }
}

export default App;
