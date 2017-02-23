import './canvasanchors.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

import { ANCHORS } from '../../defaults/defaults';

const vert = ['N', 'o', 'S'],
      horz = ['W', 'o', 'E'],
      defaultPosition = [
        ['NW', 'No', 'NE'],
        ['oW', 'oo', 'oE'],
        ['SW', 'So', 'SE']
      ];

class CanvasAnchors extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      anchorState: this.setCurrentAnchorState(...this.getShiftsFromAnchor(this.props.anchor))
    };
  }

  normalizeAnchorShifts (vertical, horizontal) {
    return [vertical - 1, horizontal - 1];
  }

  getAnchorFromShifts (verticalShift, horizontalShift) {
    return vert[verticalShift + 1] + horz[horizontalShift + 1];
  }

  getShiftsFromAnchor (anchor) {
    return this.normalizeAnchorShifts(...ANCHORS[anchor]);
  }

  // verticalShift, horizontalShift = [-1..1, -1..1]
  setCurrentAnchorState (verticalShift, horizontalShift) {
    const row = [...Array(3)].map(() => ''),
          view = [...Array(3)].map(() => row.slice(0));

    let i, j, indRow, indCol;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        indRow = i + verticalShift;
        indCol = j + horizontalShift;

        if (indRow < 0 || indRow >= 3 || indCol < 0 || indCol >= 3) continue;

        view[indRow][indCol] = defaultPosition[i][j];
      }
    }

    return view;
  }

  updateAnchorState (verticalShift, horizontalShift) {
    const normalized = this.normalizeAnchorShifts(verticalShift, horizontalShift),
          view = this.setCurrentAnchorState(...normalized);
    this.setState({ anchorState: view });
    this.props.setExpandAnchor(this.getAnchorFromShifts(...normalized));
  }

  getArrowGroupRow (row, ident) {
    const idents = this.state.anchorState[row].slice(0);

    return (
      <ul className={`canvas-anchors-group canvas-anchors-group-${ident}`}>
        {
          idents.map((id, i) => (
            <li className="canvas-anchor" key={i} onClick={() => this.updateAnchorState(row, i)}>
              <svg className="canvas-anchor__icon" viewBox="0 0 32 32" width={24} height={24}>
                <use xlinkHref={`#arrow-${id}`}></use>
              </svg>
            </li>
          ))
        }
      </ul>
    );
  }

  render () {
    const classes = classNames(
      'canvas-anchors',
      this.props.className,
      {
        'disabled': this.props.disabled
      }
    );

    return (
      <div className={classes}>
        { this.getArrowGroupRow(0, 'top') }
        { this.getArrowGroupRow(1, 'center') }
        { this.getArrowGroupRow(2, 'bottom') }
      </div>
    );
  }
}

export default CanvasAnchors;
