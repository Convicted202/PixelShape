import Brush from './brush/Brush.js';
import Bucket from './bucket/Bucket.js';

const toolsMap = new Map();

toolsMap.set('brush', new Brush());
toolsMap.set('colorfill', new Bucket());

export default toolsMap;
