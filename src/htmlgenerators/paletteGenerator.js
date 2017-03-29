import h from 'hyperscript';

import { getBlackWhiteContrastColor, stringToRGBA } from '../utils/colorUtils';

export default list => {
  const ulStyle = {
    'list-style': 'none',
    'padding': '0',
    'width': '400px',
    'margin': '0 auto'
  };

  const liStyle = {
    'height': '25px',
    'font-size': '22px',
    'font-family': 'monospace',
    'text-align': 'center',
    'padding': '20px'
  };

  return h('html',
    h('head'),
    h('body',
      h('ul',
        { style: ulStyle },
        list.map(color =>
          h('li', color, {
            style: Object.assign(
              liStyle,
              {
                'background-color': color,
                'color': getBlackWhiteContrastColor(stringToRGBA(color))
              }
            )
          })
        )
      )
    )
  );
};
