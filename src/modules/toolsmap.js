import Brush from './brush/Brush';
import Bucket from './bucket/Bucket';
import Ellipse from './ellipse/Ellipse';

const toolsMap = new Map();

toolsMap.set('brush', new Brush());
toolsMap.set('colorfill', new Bucket());
toolsMap.set('circle', new Ellipse());

export default toolsMap;
