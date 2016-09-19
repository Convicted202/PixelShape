import './framebar.styl';

import React, { Component } from 'react';

class Framebar extends Component {
  render() {
    return (
      <aside className="framebar">
        <div className="framebar__frames-controls">
          <div className="framebar__frames-controls-button">
            <svg className="framebar__frames-controls-button__icon" viewBox="0 0 24 24" width="24" height="24">
              <use xlinkHref="#duplicate"></use>
            </svg>
          </div>
          <div className="framebar__frames-controls-button">
            <svg className="framebar__frames-controls-button__icon" viewBox="0 0 24 24" width="24" height="24">
              <use xlinkHref="#remove"></use>
            </svg>
          </div>
          <div className="framebar__frames-controls-button">
            <svg className="framebar__frames-controls-button__icon" viewBox="0 0 24 24" width="24" height="24">
              <use xlinkHref="#move-left"></use>
            </svg>
          </div>
          <div className="framebar__frames-controls-button">
            <svg className="framebar__frames-controls-button__icon" viewBox="0 0 24 24" width="24" height="24">
              <use xlinkHref="#move-right"></use>
            </svg>
          </div>
        </div>
        <div className="framebar__container">
          <div className="framebar__gif-container">
            <div className="framebar__gif"></div>
          </div>
          <div className="framebar__frames-container">
            <div className="framebar__frame"></div>
            <div className="framebar__frame"></div>
            <div className="framebar__frame"></div>
          </div>
        </div>
      </aside>
    )
  }
}

export default Framebar;
